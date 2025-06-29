"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";



const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    model: "gemini-1.5-flash"
})

export const generateQuiz = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not found");

    try {
        const prompt = `
    Generate 10 technical interview questions for a ${user.subIndustry
            } professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
            }.
    
    Each question should be multiple choice with 4 options.
    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;
        const result = await model.generateContent(prompt);
        const response = result?.response;
        const text = response.text();
        const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
        const quiz = JSON.parse(cleanedText);
        return quiz.questions;
    } catch (error) {
        console.log("error in generating quiz", error.message);
        throw new Error("Failed to generate Quiz Questions");
    }
}


export const saveQuizResult = async (questions, answers, score) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    })
    if (!user) throw new Error("User not found");
    const questionResult = questions.map((q, index) => (
        {
            question: q.question,
            answer: q.correctAnswer,
            userAnswer: answers[index],
            isCorrect: q.correctAnswer === answers[index],
            explanation: q.explanation
        }
    ));
    let improvementTip = null;
    const wrongAnswers = questionResult.filter((q) => !q.isCorrect);
    if (wrongAnswers.length > 0) {
        const wrongQuestionsText = wrongAnswers.map((q) => `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`).join("\n\n");
        const improvementPrompt = `
          The user got the following ${user.subIndustry} technical interview questions wrong:
    
          ${wrongQuestionsText}
    
          Based on these mistakes, provide a concise, specific improvement tip.
          Focus on the knowledge gaps revealed by these wrong answers.
          Keep the response under 2 sentences and make it encouraging.
          Don't explicitly mention the mistakes, instead focus on what to learn/practice.
        `;
        try {
            const tipResult = await model.generateContent(improvementPrompt);

            improvementTip = tipResult.response.text().trim();
            console.log(improvementTip);
        } catch (error) {
            console.error("Error generating improvement tip:", error);
        }
    }
    try {
        const assessment = await db.Assessment.create({
            data: {
                userId: user.id,
                quizScore: score,
                questions: questionResult,
                category: "Technical",
                improvementTip,
            },
        });

        return assessment;
    } catch (error) {
        console.error("Error saving quiz result:", error);
        throw new Error("Failed to save quiz result");
    }
}


export const getAssesments = async () => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.User.findUnique({
        where: {
            clerkUserId: userId
        }
    });
    if (!user) throw new Error("User not found");
    try {
        const assessments = await db.assessment.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: "asc",
            },
        });
        return assessments;
    } catch (error) {
        console.error("Failed to find any assessments:", error);
        throw new Error("Failed to find any Assessments.");
    }
}