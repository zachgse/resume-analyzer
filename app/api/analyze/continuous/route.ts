import { gemini } from "@/app/utils/googleGemini";
import { succeedingBackend } from "@/app/utils/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request:NextRequest) {
    try {
        const data = await request.json();
        console.log("data is ",data);
        const parsedData = succeedingBackend.safeParse({
            content: data.message,
            history: data.history
        });

        if (!parsedData.success) return NextResponse.json({error: parsedData.error.issues},{status:400})

        const { content,history } = parsedData.data;
        // return NextResponse.json({data:"hello"},{status:200});
        const response = gemini({history,message:content});
        console.log("response in continuous route: ", response);
        return NextResponse.json({
            data:"Hello"
        }, {
            status: 200
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Something went wrong",
                details: error instanceof Error ? error.message : "Server Error"
            },
            {
                status: 500
            }
        )
    }
}