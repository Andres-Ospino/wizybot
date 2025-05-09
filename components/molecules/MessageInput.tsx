"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function MessageInput({ onSend }: { onSend: (msg: string) => void }) {
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input)
    setInput("")
  }

  return (
    <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-1 border border-gray-200">
      <input
        type="text"
        className="flex-1 bg-transparent border-none outline-none py-2 px-1 text-gray-700 placeholder-gray-400"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        className={`rounded-full p-2 transition-colors ${
          input.trim()
            ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
        onClick={handleSend}
        disabled={!input.trim()}
      >
        <Send size={18} />
      </button>
    </div>
  )
}
