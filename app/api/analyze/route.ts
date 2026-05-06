import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { modelAnswer } from "@/app/utils/schema";
import { z } from "zod";
import { extractText } from "unpdf";
import { extractTextFromResume, formatNewMessage } from "@/app/utils/helper";

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY

export async function POST(request:NextRequest){
    try {
        const type = request.headers.get("x-type");

        if (!type) {
            return NextResponse.json({error:"Invalid x-type"}, {status:400})
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Internal server error",
                details: error instanceof Error ? error.message : "Server Error"
            },
            {
                status: 500
            }
        )
    }
    return NextResponse.json({
        message:"Hello"
    }, {
        status:200
    });
    const type = request.headers.get("x-type");
    let data,userMessage,history,resume;

    if (type == "initial") {
        data = await request.formData();
        userMessage = formatNewMessage({role:"user",text:data.get('message')?.toString()});
        console.log("user message is ",userMessage);
        history = [userMessage];
        resume = await data.get("resume");
        if (resume instanceof File) {
            resume = await extractTextFromResume(resume);
        }
    } 

    if (type == "continuous") {
        data = await request.json();
        history = await data.data.history;
    }

    const message = type == "initial"
                    ? `${data.get("message")}
**My current resume is:**
                        ${resume?.slice(0, 8000)}`
                    : data.data.message;

    console.log("history is ", history);
    // console.log("resume text converted is ", message);

    // const schema = {
    //     type: Type.OBJECT,
    //     properties: {
    //         thought: {
    //             type: Type.STRING,
    //             description: "Internal step-by-step logic used to identify missing keywords, formatting issues, or impact-verb improvements in the resume."
    //         },
    //         ui_message: {
    //             type: Type.STRING, 
    //             description: "A polite, conversational message to the user explaining what was changed (e.g., 'I updated your experience section to be more results-oriented.')." 
    //         },
    //         subject: {
    //             type: Type.STRING,
    //             description: "The primary job title or industry the resume is being optimized for."
    //         },
    //         topic: {
    //             type: Type.STRING,
    //             description: "The specific section of the resume being addressed (e.g., Summary, Skills, Work History)."
    //         },
    //         revised_resume: {
    //             type: Type.STRING,
    //             description: "The full, revised text of the resume. This will be processed by the backend into a Word document and will not be shown directly in the chat window."
    //         },
    //     },
    //     required: ["thought", "ui_message", "subject", "topic", "revised_resume"]
    // }
    
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

    const response = await chat.sendMessage({
        message
    });

    console.log("response is: ", response);


    return NextResponse.json({
        data: "hello"
    },{
        status:200
    })
}