export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: "spray-paint" | "varnish" | "primer"
  image: string
  stock: number
  brand: string
  size: string
}

export interface User {
  id: string
  email: string
  password: string
  name: string
  isAdmin: boolean
  address?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: Date
}
