import { supabase } from './supabase'
import { Product, Category, Order, OrderItem, User } from './types'

// Функции для работы с продуктами
export async function getProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
  
  if (error) throw error
  return data
}

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, categories(*)')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select()
    .single()
  
  if (error) throw error
  return data
}

// Функции для работы с категориями
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
  
  if (error) throw error
  return data
}

// Функции для работы с заказами
export async function createOrder(order: Omit<Order, 'id' | 'created_at'>, items: Omit<OrderItem, 'id' | 'created_at'>[]) {
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert([order])
    .select()
    .single()
  
  if (orderError) throw orderError

  const orderItems = items.map(item => ({
    ...item,
    order_id: orderData.id
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)
  
  if (itemsError) throw itemsError

  return orderData
}

export async function getUserOrders(userId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        products (*)
      )
    `)
    .eq('user_id', userId)
  
  if (error) throw error
  return data
}

// Функции для работы с пользователями
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data
} 