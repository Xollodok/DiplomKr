"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Свяжитесь с нами</h1>
        <p className="text-lg text-gray-600">Получите консультацию наших экспертов по краскам</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Форма обратной связи */}
        <Card>
          <CardHeader>
            <CardTitle>Отправить сообщение</CardTitle>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Сообщение отправлено!</h3>
                <p className="text-gray-600">Мы свяжемся с вами в течение 24 часов.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label htmlFor="phone">Телефон (необязательно)</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div>
                  <Label htmlFor="subject">Тема</Label>
                  <Input id="subject" required />
                </div>
                <div>
                  <Label htmlFor="message">Сообщение</Label>
                  <Textarea id="message" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  Отправить сообщение
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Контактная информация */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Как с нами связаться</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Адрес</h3>
                  <p className="text-gray-600">
                    ул. Красочная, 123
                    <br />
                    г. Москва, 101000
                    <br />
                    Россия
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Телефон</h3>
                  <p className="text-gray-600">+7 (495) 123-КРАС</p>
                  <p className="text-gray-600">+7 (495) 123-5727</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">info@krasmaster.ru</p>
                  <p className="text-gray-600">support@krasmaster.ru</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Часы работы</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Понедельник - Пятница: 8:00 - 18:00</p>
                    <p>Суббота: 9:00 - 16:00</p>
                    <p>Воскресенье: Выходной</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Экспертная консультация</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Нужна помощь в выборе правильной краски для вашего проекта? Наши эксперты готовы помочь!
              </p>
              <div className="space-y-2">
                <Button className="w-full">Записаться на консультацию</Button>
                <Button variant="outline" className="w-full">
                  Скачать цветовой справочник
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Раздел FAQ */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Часто задаваемые вопросы</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Какие поверхности можно красить?</h3>
              <p className="text-gray-600 text-sm">
                Наши продукты подходят для дерева, металла, пластика, бетона и многого другого. Проверьте описания
                товаров для совместимости с конкретными поверхностями.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Предлагаете ли вы подбор цвета?</h3>
              <p className="text-gray-600 text-sm">
                Да! Принесите нам образец, и мы подберем его к нашей обширной цветовой палитре или создадим
                индивидуальную смесь.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Какова ваша политика возврата?</h3>
              <p className="text-gray-600 text-sm">
                Мы предлагаем 30-дневный возврат неоткрытых товаров. Краски, смешанные по индивидуальному заказу,
                возврату не подлежат.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Предлагаете ли вы скидки на оптовые заказы?</h3>
              <p className="text-gray-600 text-sm">
                Да! Свяжитесь с нами для получения цен на заказы свыше 30 000₽. Мы предлагаем специальные тарифы для
                подрядчиков и предприятий.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
