import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY=process.env.GOOGLE_GEMINI_API_KEY

export async function POST(request:NextRequest){
    const body = await request.json();
    const message = await body.message;
    console.log("message is ", message);
    const history = await body.history;
    console.log("history is ", history);
    // return NextResponse.json({
    //     message: data ? "There is data" : "there is no"
    // }, {status:200});
    // return NextResponse.json({
    //     data
    // },{status:200}); 
    // GET CHAT HISTORY FROM FRONTEND (APPEND HAPPENS IN THE FRONTEND USESTATE)
    const ai = new GoogleGenAI({
        apiKey: GEMINI_API_KEY,
    });
    const chat = ai.chats.create({
        model:"gemini-3-flash-preview",
        history
    })
    const response1 = await chat.sendMessage({
        message
    });
    console.log("reply is: ", response1.text);
    // console.log("chat history is: ", chat.getHistory())
    return NextResponse.json({
        data:response1.text
    },{
        status:200
    })



    // const model = genAI.
    // const response = await genAI.chats
    // const response = await genAI.models.generateContent({
    //     model:"gemini-3-flash",
    //     contents:
    // });
    // const body = await request.json();
    // const input = body.test;

    // return NextResponse.json({
    //     message: `Your input is ${input}`
    // },{
    //     status:200
    // });
}