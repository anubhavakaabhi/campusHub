import Groq from "groq-sdk";
import dotenv from "dotenv";
import pdfToText from "./pdfToText.js";
dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main(id) {
    const text = await pdfToText(id);
    const chatCompletion = await getGroqChatCompletion(text);
    return chatCompletion.choices[0]?.message?.content || "";
}

async function getGroqChatCompletion(text) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `Summarise the content of the pdf in a note format with clear headings and bullet points, ignoring any pages with mostly images or graphs. The pdf text is: ${text}`,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
}
