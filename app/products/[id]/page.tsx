"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProducts, getProductById } from "@/lib/data"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)
  const [quantity, setQuantity] = useState(1)
  const { dispatch } = useCart()

  if (!product) {
    notFound()
  }

  const addToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_ITEM", product })
    }
  }

  const products = getProducts()
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

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
      {/* Хлебные крошки */}
      <div className="mb-8">
        <Link href="/products" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Назад к товарам
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Изображение товара */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            <Badge className="absolute top-4 left-4 capitalize">{getCategoryName(product.category)}</Badge>
            {product.stock < 10 && (
              <Badge variant="destructive" className="absolute top-4 right-4">
                Мало на складе
              </Badge>
            )}
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">
              {product.brand} • {product.size}
            </p>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">(4.8/5 - 124 отзыва)</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-blue-600">{product.price}₽</div>

          <div>
            <h3 className="font-semibold mb-2">Описание</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="quantity" className="font-medium">
                Количество:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-3 py-2"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">{product.stock} доступно</span>
            </div>

            <Button onClick={addToCart} disabled={product.stock === 0} className="w-full lg:w-auto" size="lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Добавить в корзину
            </Button>
          </div>

          <Separator />

          {/* Особенности */}
          <div className="space-y-4">
            <h3 className="font-semibold">Особенности и преимущества</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Бесплатная доставка от 3000₽</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Гарантия качества</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <span className="text-sm">Возврат в течение 30 дней</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Характеристики товара */}
          <div>
            <h3 className="font-semibold mb-4">Характеристики</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Бренд:</span>
                <span className="ml-2 text-gray-600">{product.brand}</span>
              </div>
              <div>
                <span className="font-medium">Размер:</span>
                <span className="ml-2 text-gray-600">{product.size}</span>
              </div>
              <div>
                <span className="font-medium">Категория:</span>
                <span className="ml-2 text-gray-600">{getCategoryName(product.category)}</span>
              </div>
              <div>
                <span className="font-medium">В наличии:</span>
                <span className="ml-2 text-gray-600">{product.stock} единиц</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Похожие товары */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Похожие товары</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-1">{relatedProduct.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">{relatedProduct.price}₽</span>
                    <Link href={`/products/${relatedProduct.id}`}>
                      <Button size="sm">Посмотреть</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
