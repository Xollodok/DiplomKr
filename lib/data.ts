import type { Product, User } from "./types"

export const products: Product[] = [
  {
    id: "1",
    name: "Премиум акриловая краска-спрей - Красная",
    description:
      "Высококачественная акриловая краска-спрей с отличным покрытием и долговечностью. Идеально подходит для автомобильных, мебельных и ремесленных проектов.",
    price: 899,
    category: "spray-paint",
    image: "/placeholder.svg?height=300&width=300",
    stock: 50,
    brand: "КрасМакс",
    size: "400мл",
  },
  {
    id: "2",
    name: "Матовая черная краска-спрей",
    description: "Профессиональная матовая черная краска-спрей для гладкого, неотражающего покрытия.",
    price: 1099,
    category: "spray-paint",
    image: "/placeholder.svg?height=300&width=300",
    stock: 35,
    brand: "ПроКоат",
    size: "500мл",
  },
  {
    id: "3",
    name: "Прозрачный защитный лак",
    description:
      "Кристально прозрачный защитный лак, обеспечивающий долговременную защиту от погодных условий и УФ-лучей.",
    price: 1399,
    category: "varnish",
    image: "/placeholder.svg?height=300&width=300",
    stock: 25,
    brand: "ЩитКоат",
    size: "750мл",
  },
  {
    id: "4",
    name: "Лак-морилка для дерева - Дуб",
    description: "Красивая морилка цвета дуба с лаком для натуральной отделки дерева.",
    price: 1699,
    category: "varnish",
    image: "/placeholder.svg?height=300&width=300",
    stock: 20,
    brand: "ВудКрафт",
    size: "1л",
  },
  {
    id: "5",
    name: "Грунтовка по металлу - Антикоррозийная",
    description:
      "Высокоэффективная грунтовка по металлу, предотвращающая ржавчину и обеспечивающая отличную адгезию для финишных покрытий.",
    price: 1249,
    category: "primer",
    image: "/placeholder.svg?height=300&width=300",
    stock: 40,
    brand: "МеталГард",
    size: "500мл",
  },
  {
    id: "6",
    name: "Универсальная грунтовка - Белая",
    description:
      "Многоповерхностная грунтовка, подходящая для дерева, металла и пластика. Отличная основа для любого финишного покрытия.",
    price: 999,
    category: "primer",
    image: "/placeholder.svg?height=300&width=300",
    stock: 60,
    brand: "БейзКоат",
    size: "400мл",
  },
]

export const users: User[] = [
  {
    id: "admin",
    email: "admin@paintstore.com",
    password: "1234",
    name: "Администратор",
    isAdmin: true,
  },
]

// Функции для работы с продуктами
export function addProduct(product: Omit<Product, "id">): Product {
  const newProduct = {
    ...product,
    id: Date.now().toString(),
  }
  products.push(newProduct)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...updates }
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return false

  products.splice(index, 1)
  return true
}

export function getProducts(): Product[] {
  return [...products]
}

export function getProductById(id: string): Product | null {
  return products.find((p) => p.id === id) || null
}
