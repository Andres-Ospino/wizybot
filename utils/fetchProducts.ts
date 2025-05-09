/**
 * Función que obtiene productos de la API de Wizybot
 * Realiza una petición real a la API
 */
export async function fetchProducts() {
  console.log("Realizando petición a la API de Wizybot...")

  try {
    const response = await fetch("https://api.wizybot.com/products/demo-product-list")

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status} ${response.statusText}`)
    }

    const products = await response.json()
    console.log("Respuesta de la API:", products)

    if (!Array.isArray(products) || products.length === 0) {
      throw new Error("No se encontraron productos en la respuesta de la API")
    }

    const formattedProducts = products.map((product: any) => ({
      name: product.displayTitle || "Producto sin nombre",
      image: product.imageUrl || "/placeholder.svg?height=192&width=320",
      price: product.discount ? "¡En oferta!" : "Precio regular",
      link: product.url || "#",
      category: product.productType || "Sin categoría",
    }))

    console.log("Productos formateados:", formattedProducts)
    return formattedProducts
  } catch (error) {
    console.error("Error al obtener productos de la API:", error)
    return []
  }
}
