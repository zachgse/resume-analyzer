import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import { renderToString } from "react-dom/server.browser";
import {ResumeTemplate}  from "@/lib/ResumeTemplate";

export const runtime = "nodejs";

const isLocal = process.env.NODE_ENV === 'development';
const remoteExecutablePath = "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"

export async function POST (request:NextRequest) {
    const Chromium = (await import("@sparticuz/chromium")).default;
    let browser = null  
    try {
        const options = isLocal 
                        ? {
                            args: [],
                            executablePath:"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
                            headless: true
                        } : {
                            args: Chromium.args,
                            executablePath: await Chromium.executablePath(remoteExecutablePath),
                            headless: true
                        }
        browser = await puppeteer.launch(options);
        const page = await browser.newPage();
        const data = await request.json();
        const componentHTML = renderToString(<ResumeTemplate props={data}/>) //add props
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