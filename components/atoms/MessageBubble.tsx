import { User, Bot } from "lucide-react"

interface Props {
  message: string
  sender: "bot" | "user"
}

export default function MessageBubble({ message, sender }: Props) {
  return (
    <div className={`flex items-end gap-2 ${sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`
        h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0
        ${sender === "user" ? "bg-indigo-100 text-indigo-600" : "bg-purple-100 text-purple-600"}
      `}
      >
        {sender === "user" ? <User size={16} /> : <Bot size={16} />}
      </div>

      <div
        className={`
        px-4 py-3 rounded-2xl max-w-[80%] shadow-sm
        ${
          sender === "user"
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none"
            : "bg-white rounded-tl-none"
        }
      `}
      >
        {message}
      </div>
    </div>
  )
}
