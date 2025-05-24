"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { getProducts } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Search } from "lucide-react"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryFilter = searchParams.get("category")
  const { dispatch } = useCart()

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "all")

  const products = getProducts()

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Фильтр по категории
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category === selectedCategory)
    }

    // Фильтр по поисковому запросу
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Сортировка товаров
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return filtered
  }, [selectedCategory, searchTerm, sortBy, products])

  const addToCart = (product: any) => {
    dispatch({ type: "ADD_ITEM", product })
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "spray-paint":
        return "Краска-спрей"
      case "varnish":
        return "Лак"
      case "primer":
        return "Грунтовка"
      default:
        return category
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Наши товары</h1>
        <p className="text-lg text-gray-600">Профессиональные лакокрасочные решения для каждого проекта</p>
      </div>

      {/* Фильтры и поиск */}
      <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск товаров..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Категория" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все категории</SelectItem>
            <SelectItem value="spray-paint">Краски-спреи</SelectItem>
            <SelectItem value="varnish">Лаки</SelectItem>
            <SelectItem value="primer">Грунтовки</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Сортировать по" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">По названию</SelectItem>
            <SelectItem value="price-low">Цена: по возрастанию</SelectItem>
            <SelectItem value="price-high">Цена: по убыванию</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Сетка товаров */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-square relative">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              <Badge className="absolute top-4 left-4 capitalize">{getCategoryName(product.category)}</Badge>
              {product.stock < 10 && (
                <Badge variant="destructive" className="absolute top-4 right-4">
                  Мало на складе
                </Badge>
              )}
            </div>
            <CardContent className="p-4">
              <div className="mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {product.brand} • {product.size}
                </p>
              </div>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-blue-600">{product.price}₽</span>
                <span className="text-sm text-gray-500">{product.stock} в наличии</span>
              </div>
              <div className="flex space-x-2">
                <Link href={`/products/${product.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </Link>
                <Button onClick={() => addToCart(product)} disabled={product.stock === 0} className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />В корзину
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">Товары, соответствующие вашим критериям, не найдены.</p>
        </div>
      )}
    </div>
  )
}
