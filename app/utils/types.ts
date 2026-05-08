export type InitialMessage = {
    message?: string
    title: string
    jobDescription: string
    resume: File
}

export type ContinuousMessage = {
  content: string 
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

export type Resume = {
  name: string
  info: string[]
  summary: string
  work_experience?: {
      position: string
      company: string
      date_start: string
      date_end: string
      highlights: string[]
      others: string[]
  }[]
  skills: {
      categorized_skills?: {
          category: string
          info: string[]
      }[]
      flat_skills?: string[]
  }
  education: {
      university: string
      course: string
      date: string
  }[]
  licenses?: {
      title: string
      date_issued: string
  }[]
  trainings?: {
      title: string
      date: string
      location: string
  }[]
  projects?: {
      title: string
      tools: string
      description: string
  }[]
}