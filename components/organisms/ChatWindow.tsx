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
    { text: "¡Hola! ¿En qué puedo ayudarte hoy?", sender: "bot", type: "text" },
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
    // Añadir mensaje del usuario al chat
    const newMsg: Message = { text, sender: "user", type: "text" }
    setMessages((prev) => [...prev, newMsg])

    // Mostrar indicador de escritura
    setTyping(true)

    // Esperar 3 segundos según los requisitos
    setTimeout(async () => {
      let botMsg: Message

      // Verificar si el usuario quiere recomendaciones de productos
      if (
        text.toLowerCase().includes("product") ||
        text.toLowerCase().includes("productos") ||
        text.toLowerCase().includes("recomendaciones")
      ) {
        try {
          console.log("Solicitando productos a la API...")
          // Obtener productos de la API de Wizybot
          const products = await fetchProducts()
          console.log("Productos obtenidos:", products)

          if (products && products.length > 0) {
            botMsg = {
              text: "",
              sender: "bot",
              type: "carousel",
              products,
            }
          } else {
            botMsg = {
              text: "Lo siento, no pude obtener recomendaciones de productos en este momento. Por favor, inténtalo más tarde.",
              sender: "bot",
              type: "text",
            }
          }
        } catch (error) {
          console.error("Error al obtener productos:", error)
          botMsg = {
            text: "Lo siento, no pude obtener recomendaciones de productos en este momento. Por favor, inténtalo más tarde.",
            sender: "bot",
            type: "text",
          }
        }
      } else {
        // Generar una respuesta aleatoria según los requisitos
        const responses = [
          "Entiendo que necesitas ayuda. ¿Cómo puedo asistirte hoy?",
          "Gracias por tu mensaje. ¿Hay algo específico que estés buscando?",
          "¡Estoy aquí para ayudar! ¿Podrías proporcionar más detalles sobre lo que necesitas?",
          "Gracias por contactarnos. ¿Te gustaría ver nuestras recomendaciones de productos?",
          "Estaré encantado de ayudarte con eso. ¿Tienes alguna pregunta?",
          "Estoy procesando tu solicitud. ¿Hay algo más que te gustaría saber?",
          "Puedo ayudarte a encontrar lo que buscas. ¿Podrías ser más específico?",
          "Gracias por contactarnos. ¿En qué más puedo ayudarte hoy?",
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        botMsg = {
          text: randomResponse,
          sender: "bot",
          type: "text",
        }
      }

      // Ocultar indicador de escritura y añadir respuesta del bot
      setTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, 3000) // 3 segundos de retraso según lo especificado en los requisitos
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
          <p className="text-xs text-white/70">Asistente Virtual</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) =>
          msg.type === "carousel" ? (
            <ProductCarousel key={idx} products={msg.products || []} />
          ) : (
            <MessageBubble key={idx} message={msg.text} sender={msg.sender} />
          ),
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
