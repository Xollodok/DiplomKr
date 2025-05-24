"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { state, dispatch } = useCart()

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity })
  }

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId })
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары, чтобы начать покупки</p>
          <Link href="/products">
            <Button size="lg">Продолжить покупки</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина покупок</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Товары в корзине */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.map((item) => (
            <Card key={item.product.id}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={item.product.image || "/placeholder.svg"}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-gray-600">
                      {item.product.brand} • {item.product.size}
                    </p>
                    <p className="text-blue-600 font-semibold">{item.product.price}₽</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-lg">{(item.product.price * item.quantity).toFixed(0)}₽</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Итоги заказа */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Итоги заказа</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Подытог ({state.items.reduce((sum, item) => sum + item.quantity, 0)} товаров)</span>
                  <span>{state.total.toFixed(0)}₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span>{state.total >= 3000 ? "Бесплатно" : "299₽"}</span>
                </div>
                <div className="flex justify-between">
                  <span>НДС</span>
                  <span>{(state.total * 0.2).toFixed(0)}₽</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Итого</span>
                <span>{(state.total + (state.total >= 3000 ? 0 : 299) + state.total * 0.2).toFixed(0)}₽</span>
              </div>

              <div className="space-y-3">
                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    Перейти к оформлению
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Продолжить покупки
                  </Button>
                </Link>
              </div>

              {state.total < 3000 && (
                <p className="text-sm text-gray-600 mt-4 text-center">
                  Добавьте товаров на {(3000 - state.total).toFixed(0)}₽ для бесплатной доставки!
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
