"use client"

import { useState, useRef, useEffect } from "react"
import MessageBubble from "../atoms/MessageBubble"
import MessageInput from "../molecules/MessageInput"
import TypingDots from "../molecules/TypingDots"
import ProductCarousel from "./ProductCarousel"
import { fetchProducts } from "../../utils/fetchProducts"

interface Message {
  text: string
  sender: "bot" | "user"
  type?: "text" | "carousel"
  products?: any[]
}

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi there! How can I assist you today?", sender: "bot", type: "text" },
  ])
  const [typing, setTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, typing])

  const sendMessage = async (text: string) => {
    const newMsg: Message = { text, sender: "user", type: "text" }
    setMessages((prev) => [...prev, newMsg])
    setTyping(true)

    setTimeout(async () => {
      let botMsg: Message

      if (
        text.toLowerCase().includes("product") ||
        text.toLowerCase().includes("recommen")
      ) {
        try {
          console.log("Requesting products from the API...")
          const products = await fetchProducts()
          console.log("Products fetched:", products)

          if (products && products.length > 0) {
            botMsg = {
              text: "",
              sender: "bot",
              type: "carousel",
              products,
            }
          } else {
            botMsg = {
              text: "Sorry, I couldn't fetch product recommendations right now. Please try again later.",
              sender: "bot",
              type: "text",
            }
          }
        } catch (error) {
          console.error("Error fetching products:", error)
          botMsg = {
            text: "Sorry, I couldn't fetch product recommendations right now. Please try again later.",
            sender: "bot",
            type: "text",
          }
        }
      } else {
        const responses = [
          "I understand you need help. How can I assist you today?",
          "Thanks for your message. Are you looking for something specific?",
          "I'm here to help! Could you provide more details about what you need?",
          "Thanks for reaching out. Would you like to see our product recommendations?",
          "I'd be happy to help with that. Do you have any questions?",
          "Processing your request. Is there anything else you'd like to know?",
          "I can help you find what you're looking for. Could you be more specific?",
          "Thanks for contacting us. How else can I help you today?",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        botMsg = {
          text: randomResponse,
          sender: "bot",
          type: "text",
        }
      }

      setTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, 3000)
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-[600px] border border-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 flex items-center">
        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-bold text-xl">WizyBot</h1>
          <p className="text-xs text-white/70">Virtual Assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) =>
          msg.type === "carousel" ? (
            <ProductCarousel key={idx} products={msg.products || []} />
          ) : (
            <MessageBubble key={idx} message={msg.text} sender={msg.sender} />
          )
        )}
        {typing && <TypingDots />}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <MessageInput onSend={sendMessage} />
      </div>
    </div>
  )
}
