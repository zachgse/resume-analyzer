import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import z from "zod";
import { modelAnswer } from "./schema";
import { Conversation } from "./types";

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY

export const gemini = async({
    history,
    message
}: {
    history: Conversation[],
    message: string
}) => {
    try {
        const ai = new GoogleGenAI({
            apiKey: GEMINI_API_KEY,
        });

        const chat = ai.chats.create({
            model:"gemini-2.5-flash",
            history,
            config: {
                systemInstruction: "You are a professional HR manager in all fields utilizing ATS format in reviewing resumes." + 
                                    "Analyze user inputs and instructions carefully for brief and clear interaction with the user. " + 
                                    "If the role is in professional level, kindly use and utilize all job postings resources in the internet " + 
                                    "(e.g., https://linkedin.com/, https://uk.indeed.com/).",
                responseMimeType: "application/json",
                responseJsonSchema: z.toJSONSchema(modelAnswer),
                thinkingConfig: {
                    includeThoughts: true,
                }
            } 
        });

        const response = await chat.sendMessage({message});
        console.log("response is ", response);
        return NextResponse.json({data:response},{status:200});
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Google gemini is not available",
                details: error instanceof Error ? error.message : "Google gemini is out of service"
            },
            {
                status: 500
            }
        )
    }
}