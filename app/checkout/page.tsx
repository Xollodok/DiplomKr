"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/lib/cart-context"
import { CreditCard, Lock } from "lucide-react"

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = state.total
  const shipping = subtotal >= 3000 ? 0 : 299
  const tax = subtotal * 0.2
  const total = subtotal + shipping + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Имитация обработки платежа
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    setOrderComplete(true)
    dispatch({ type: "CLEAR_CART" })
  }

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Заказ подтвержден!</h1>
          <p className="text-gray-600 mb-8">
            Спасибо за покупку. Вы получите подтверждение по электронной почте в ближайшее время.
          </p>
          <Button onClick={() => (window.location.href = "/")}>Продолжить покупки</Button>
        </div>
      </div>
    )
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Ваша корзина пуста</h1>
          <p className="text-gray-600 mb-8">Добавьте товары перед оформлением заказа</p>
          <Button onClick={() => (window.location.href = "/products")}>Купить сейчас</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Оформление заказа</h1>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Форма оформления */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о доставке</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" required />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" required />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <Input id="city" required />
                </div>
                <div>
                  <Label htmlFor="state">Область</Label>
                  <Input id="state" required />
                </div>
                <div>
                  <Label htmlFor="zipCode">Почтовый индекс</Label>
                  <Input id="zipCode" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Информация об оплате
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Номер карты</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="expiry">Срок действия</Label>
                  <Input id="expiry" placeholder="ММ/ГГ" required />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" required />
                </div>
              </div>
              <div>
                <Label htmlFor="cardName">Имя на карте</Label>
                <Input id="cardName" required />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Итоги заказа */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Итоги заказа</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Товары заказа */}
              <div className="space-y-3">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 relative bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.product.name}</p>
                      <p className="text-gray-600 text-xs">Кол-во: {item.quantity}</p>
                    </div>
                    <p className="font-medium">{(item.product.price * item.quantity).toFixed(0)}₽</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Разбивка цен */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Подытог</span>
                  <span>{subtotal.toFixed(0)}₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span>{shipping === 0 ? "Бесплатно" : `${shipping}₽`}</span>
                </div>
                <div className="flex justify-between">
                  <span>НДС</span>
                  <span>{tax.toFixed(0)}₽</span>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-semibold">
                <span>Итого</span>
                <span>{total.toFixed(0)}₽</span>
              </div>

              <Button onClick={handleSubmit} disabled={isProcessing} className="w-full" size="lg">
                <Lock className="h-4 w-4 mr-2" />
                {isProcessing ? "Обработка..." : `Оплатить ${total.toFixed(0)}₽`}
              </Button>

              <p className="text-xs text-gray-600 text-center">Ваша платежная информация защищена и зашифрована</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
