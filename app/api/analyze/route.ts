import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY

export async function POST(request:NextRequest){
    // const body = await request.json();
    // const message = await body.message;
    // const history = await body.history;

    // const schema = {
    //     type: Type.OBJECT,
    //     properties: {
    //         thought: {
    //             type: Type.STRING,
    //             description: "Detailed internal reasoning and step-by-step logic." //specify about resume
    //         },
    //         answer: {
    //             type: Type.STRING, 
    //             description: "The AI's actual conversational response to the user." //remove this
    //         },
    //         subject: {
    //             type: Type.STRING,
    //             description: "Sending test api connectivity to gemini" //specify about resume
    //         },
    //         topic: {
    //             type: Type.STRING,
    //             description: "Test api" //specify about resume
    //         },
    //         content: {
    //             type: Type.STRING,
    //             description: message
    //         },
    //     },
    //     required: ["thought","answer","subject","topic","content"]
    // }
    
    // const ai = new GoogleGenAI({
    //     apiKey: GEMINI_API_KEY,
    // });

    // const chat = ai.chats.create({
    //     model:"gemini-3-flash-preview",
    //     history,
    //     config: {
    //         responseMimeType: "application/json",
    //         responseJsonSchema: schema,
    //         thinkingConfig: {
    //             includeThoughts: true,
    //         }
    //     } 
    // });

    // const response = await chat.sendMessage({
    //     message
    // });


    return NextResponse.json({
        data:"hello"
    },{
        status:200
    })
}