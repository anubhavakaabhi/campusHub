import Groq from "groq-sdk";
import dotenv from "dotenv";
import pdfToText from "./pdfToText.js";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const text = await pdfToText();

export async function main() {
    const chatCompletion = await getGroqChatCompletion();
    console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Explain the pdf with text ${text}`,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}
