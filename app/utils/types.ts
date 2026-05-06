export type InitialMessage = {
    message?: string
    title: string
    jobDescription: string
    resume: File
}

export type ContinuousMessage = {
  content: string 
  // history: Conversation[]
}

export type NewMessage = {
  role: "user" | "model"
  text: string | undefined
}

export type Conversation = {
  role: "user" | "model"
  parts: {
    text: string | undefined
  }[]
}