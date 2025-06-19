import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "CareerBuddy", name: "CareerBuddy",credentials:{
    gemini:{
        apiKey:process.env.GEMINI_API_KEY
    }
} });
