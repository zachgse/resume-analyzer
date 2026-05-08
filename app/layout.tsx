import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "Resume Analyzer",
  description: "AI-powered resume analyzer and ATS resume builder using Google's Gemini free-tier models. Design and developed by Zach Estrella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased`}
    >
      <body className="min-h-full overflow-y-auto">
        {children}
        <Footer/>
      </body>
    </html>
  );
}
