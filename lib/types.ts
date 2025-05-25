export type Product = {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
  created_at: string
  stock: number
  brand?: string
  size?: string
  image?: string
  categories?: Category
}

export type Category = {
  id: string
  name: string
  description: string
  created_at: string
}

export type User = {
  id: string
  email: string
  full_name: string
  name?: string
  created_at: string
  role: 'user' | 'admin'
  isAdmin?: boolean
}

export type Order = {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  total_amount: number
  created_at: string
  shipping_address: string
  payment_status: 'pending' | 'paid' | 'failed'
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}
