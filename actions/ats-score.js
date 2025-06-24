// /pages/api/ats-score.js
"use server";
import { IncomingForm } from "formidable";
import fs from "fs";
import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const config = {
    api: {
        bodyParser: false,
    },
};

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: "Upload error" });

        const jd = fields.jd;
        const file = files.resume;

        if (!jd || !file) {
            return res.status(400).json({ error: "Missing JD or resume" });
        }
        const filePath = file.filepath || file.path;
        const dataBuffer = fs.readFileSync(filePath);
        const parsed = await pdfParse(dataBuffer);
        const resumeText = parsed.text;
        console.log("text",resumeText);
        const prompt = `
You are an advanced ATS system. Compare the following resume with the job description.

Provide:
1. A score out of 100 representing how well the resume matches.
2. A summary of the match.
3. Suggestions for improvement (missing keywords, experiences, etc.).

## Job Description:
${jd}

## Resume:
${resumeText}
`;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        const scoreMatch = responseText.match(/(\d{1,3})%/);
        const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

        const suggestions = responseText
            .split("\n")
            .filter((line) => line.startsWith("-") || line.startsWith("•"))
            .map((line) => line.replace(/^[-•]\s*/, ""));

        res.status(200).json({
            score,
            summary: responseText.split("\n")[0],
            suggestions,
            fullResponse: responseText,
        });
    });
}
