"use server"

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { revalidatePath } from "next/cache";


const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
    model: "gemini-1.5-flash"
});



export async function saveResume(content) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
        include: {
            subIndustryInsight: true, // Prisma relation field
        },
    });
    if (!user) throw new Error("User not found");
    try {
        const resume = await db.Resume.upsert({
            where: {
                userId: user.id
            },
            update: {
                content
            },
            create: {
                userId: user.id,
                content
            }
        });
        revalidatePath("/resume");
        return resume;
    } catch (error) {
        console.log("Error saving Resume: ", error.message);
        throw new Error("Failed to save Resume");
    }
}




export async function getResume() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
        include: {
            subIndustryInsight: true, // Prisma relation field
        },
    });
    if (!user) throw new Error("User not found");
    return await db.Resume.findUnique({
        where: {
            userId: user.id
        }
    })
}

export async function improveWithAi({ current, type }) {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId,
        },
        include: {
            subIndustryInsight: true, // Prisma relation field
        },
    });
    if (!user) throw new Error("User not found");
    const prompt = `
    As an expert resume writer, improve the following ${type} description for a ${user.subIndustry} professional.
    Make it more impactful, quantifiable, and aligned with industry standards.
    Current content: "${current}"

    Requirements:
    1. Use action verbs
    2. Include metrics and results where possible
    3. Highlight relevant technical skills
    4. Keep it concise but detailed
    5. Focus on achievements over responsibilities
    6. Use industry-specific keywords
    
    Format the response as a single paragraph without any additional text or explanations.
  `;
    try {

        const result = await model.generateContent(prompt);
        const response = result?.response;
        const text = response.text().trim();
        return text;

    } catch (error) {
        console.log("Error in Improving Content: ", error.message);
        throw new Error("Failed to imporve Content");
    }
}