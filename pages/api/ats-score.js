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
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export default async function handler(req, res) {
    try {
        const form = new IncomingForm();

        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(500).json({ error: "Upload error" });

            const jd = fields.jd;
            const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;

            if (!resumeFile || !resumeFile.filepath) {
                return res.status(400).json({ error: "No file path received" });
            }

            const filePath = resumeFile.filepath;
            const dataBuffer = fs.readFileSync(filePath);
            const parsed = await pdfParse(dataBuffer);
            const resumeText = parsed.text;

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

            const result = await model.generateContent(prompt);
            const responseText = result.response.text().trim();
            const scoreMatch = responseText.match(/Match Score: (\d{1,3})/i);
            const score = scoreMatch ? parseInt(scoreMatch[1]) : null;
            const summaryMatch = responseText.match(/\*\*2\. Summary of Match:\*\*\n+([\s\S]*?)\n\n\*\*/);
            const summary = summaryMatch ? summaryMatch[1].trim() : "";

            const suggestionsStart = responseText.indexOf("**3. Suggestions");
            const suggestionsText = responseText.slice(suggestionsStart);
            const suggestions = suggestionsText
                .split("\n")
                .filter((line) => line.trim().startsWith("*") || line.trim().startsWith("-"))
                .map((line) => line.replace(/^[-*]\s*/, "").trim());

            // ✅ Return JSON to frontend
            console.log("sss",summary,score,responseText);
            res.status(200).json({
                score,
                summary,
                suggestions,
            });
        });
    } catch (error) {
        console.log("error in generating ATS Score", error.message);
        throw new Error("Failed to generate ATS Score");
    }

}
