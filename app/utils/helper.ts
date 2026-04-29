type NewMessage = {
  role: "user" | "model"
  text: string
}

export const formatNewMessage = ({role,text}:NewMessage) => {
    return {
        role,
        parts:[{
            text
        }]
    }
}