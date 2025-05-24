import type { User } from "./types"
import { users } from "./data"

export function authenticateUser(email: string, password: string): User | null {
  const user = users.find((u) => u.email === email && u.password === password)
  return user || null
}

export function registerUser(email: string, password: string, name: string): User {
  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    name,
    isAdmin: false,
  }
  users.push(newUser)
  return newUser
}

export function getUserById(id: string): User | null {
  return users.find((u) => u.id === id) || null
}
