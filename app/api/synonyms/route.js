import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini model
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({
  model: "gemini-1.5-flash"
});

export async function POST(req) {
  try {
    const { word, context } = await req.json();
    console.log("ccc",word);
    if (!word) {
      return NextResponse.json({ error: "No word provided" }, { status: 400 });
    }

    const prompt = `Suggest 3 high-quality synonyms for the word "${word}" in the context of this sentence:\n"${context}". Provide only the synonyms separated by commas.`;

    const result = await model.generateContent(prompt);
    const text = result?.response?.text() ?? "";

    const synonyms = text
      .split(/[,|\n]/)
      .map((s) => s.trim())
      .filter((s) => s && s.length <= 30);

    return NextResponse.json({ synonyms });
  } catch (err) {
    console.error("Synonym API error:", err);
    return NextResponse.json({ error: "Failed to get synonyms" }, { status: 500 });
  }
}
