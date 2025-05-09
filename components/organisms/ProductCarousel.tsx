"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react"

export default function ProductCarousel({ products }: { products: any[] }) {
  const [currentPage, setCurrentPage] = useState(0)
  const productsPerPage = 2 // Mostrar 2 productos por página

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / productsPerPage)

  // Verificar si hay productos para mostrar
  if (!products || products.length === 0) {
    return (
      <div className="flex items-end gap-2">
        <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm">
          <p className="text-sm text-gray-700">
            Lo siento, no hay productos disponibles en este momento. Por favor, inténtalo más tarde.
          </p>
        </div>
      </div>
    )
  }

  // Función para navegar a la página anterior
  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
  }

  // Función para navegar a la página siguiente
  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
  }

  // Obtener los productos para la página actual
  const getCurrentPageProducts = () => {
    const startIndex = currentPage * productsPerPage
    return products.slice(startIndex, startIndex + productsPerPage)
  }

  // Productos actuales a mostrar
  const currentProducts = getCurrentPageProducts()

  return (
    <div className="flex items-end gap-2">
      <div className="h-8 w-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
        <ShoppingBag size={16} />
      </div>

      <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[90%]">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Productos recomendados para ti:</h4>

        {/* Indicador de página actual */}
        <div className="flex justify-center mb-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 w-1.5 rounded-full mx-1 ${idx === currentPage ? "bg-purple-600" : "bg-gray-300"}`}
              onClick={() => setCurrentPage(idx)}
              role="button"
              tabIndex={0}
              aria-label={`Ir a página ${idx + 1}`}
            />
          ))}
        </div>

        {/* Carrusel con navegación */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-3">
            {currentProducts.map((product, idx) => (
              <div key={idx} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm">
                <div className="h-32 overflow-hidden relative">
                  <img
                    src={product.image || "/placeholder.svg?height=128&width=160"}
                    alt={product.name || "Producto"}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=128&width=160"
                    }}
                  />
                </div>
                <div className="p-3">
                  <h4 className="font-medium text-sm line-clamp-1">{product.name || "Producto sin nombre"}</h4>
                  <p className="text-purple-600 font-bold text-xs mt-1">{product.price || "0.00"}</p>
                  <a
                    href={product.link || "#"}
                    target="_blank"
                    className="mt-2 text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-1 px-2 rounded-md hover:opacity-90 transition-opacity inline-block w-full text-center"
                    rel="noreferrer"
                  >
                    Ver detalles
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Botones de navegación */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-purple-600 p-1 rounded-full shadow-md transition-colors z-10"
                aria-label="Página anterior"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={nextPage}
                className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 text-purple-600 p-1 rounded-full shadow-md transition-colors z-10"
                aria-label="Página siguiente"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Contador de páginas */}
          <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {currentPage + 1} / {totalPages}
          </div>
        </div>
      </div>
    </div>
  )
}
