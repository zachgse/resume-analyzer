# Resume Analyzer

A simple AI-powered resume analyzer built with free Google Gemini models.

Users can upload their current resume, provide a target job title and job description, then receive:
- AI-generated resume feedback
- ATS-friendly resume improvements
- A generated PDF resume based on AI revisions
- Continued conversational resume assistance

---

# Features

- Upload existing resume PDF
- Extract PDF text on the backend
- Analyze resumes using Google Gemini
- Generate ATS-friendly resume suggestions
- Create dynamic PDF resumes from React components
- Interactive AI chat for further resume revisions
- Simple conversational UI

---

# How It Works

## 1. User Input

The user provides:
- Job title
- Job description
- Current resume/CV (PDF)

---

## 2. Resume Processing

The backend:
- Extracts text from the uploaded PDF
- Combines the extracted content with a custom AI prompt
- Sends structured instructions to Google Gemini

---

## 3. AI Response + PDF Generation

The app:
- Receives structured AI-generated resume content
- Generates a revised ATS-friendly resume
- Builds a downloadable PDF from dynamic React components
- Displays the AI response in the chat UI

---

## 4. Continued Conversation

After initial generation:
- Users can continue chatting with the AI
- Ask for revisions or resume advice
- Discuss improvements interactively

PDF generation only happens during the initial analysis request.

---

# Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Google Gemini API
- Puppeteer
- React Hook Form
- Zod

---

# Packages Used

## Main Dependencies

- `@google/genai`
- `@hookform/resolvers`
- `@sparticuz/chromium`
- `clsx`
- `lucide-react`
- `next`
- `puppeteer-core`
- `react`
- `react-dom`
- `react-hook-form`
- `react-loader-spinner`
- `react-markdown`
- `unpdf`
- `zod`

## Development Dependencies

- `@tailwindcss/postcss`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `eslint`
- `eslint-config-next`
- `puppeteer`
- `tailwindcss`
- `typescript`

---

# Installation

```bash
git clone <your-repository>
cd resume-analyzer
npm install