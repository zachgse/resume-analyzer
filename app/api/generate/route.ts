import { generateResume } from "@/app/utils/helper";
import Chromium from "@sparticuz/chromium";
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";

export const runtime = "nodejs";

const isLocal = process.env.NODE_ENV === 'development';

export async function POST (request:NextRequest) {
    let browser = null
    try {
        const options = isLocal 
                        ? {
                            args: [],
                            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                            headless: true
                        } : {
                            args: Chromium.args,
                            executablePath: await Chromium.executablePath(),
                            headless: true
                        }
        browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        const componentHTML = generateResume();
        
        const html = `
            <html>
            <head>
                <script src="https://cdn.tailwindcss.com"></script>

                <style>
                body {
                    margin: 0;
                }

                @page {
                    size: A4;
                    margin: 0;
                    padding: 64px;
                }
                </style>
            </head>

            <body>
                ${componentHTML}
            </body>
            </html>
        `;

        await page.setContent(html, {
            waitUntil: "networkidle0",
        });

        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
        });

        await browser.close();

        const buffer = Buffer.from(pdf);

        console.log("buffer is ",buffer);

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": "inline; filename=resume.pdf"
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            {
                error: "Server Error",
                details: error instanceof Error ? error.message : "Something has failed to execute."
            },
            {
                status: 500
            }
        )
    }
}