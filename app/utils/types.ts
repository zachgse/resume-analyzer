export type InitialMessage = {
    type: "initial"
    title: string
    location: string
    jobDescription: string
    resume: File
}

export type ContinuousMessage = {
    type: "continuous"
    content: string 
}

export type Payload = 
  | InitialMessage
  | ContinuousMessage

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