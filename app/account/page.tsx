"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { User, Package, Settings, LogOut } from "lucide-react"

export default function AccountPage() {
  const { isAuthenticated, login, logout, user } = useAuth()
  const [isLogin, setIsLogin] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (login(email, password)) {
      // Успешный вход
    } else {
      alert("Неверные учетные данные")
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь можно добавить логику регистрации
    alert("Регистрация пока не реализована")
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">{isLogin ? "Вход в систему" : "Создать аккаунт"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label htmlFor="name">Полное имя</Label>
                  <Input id="name" required />
                </div>
              )}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div>
                <Label htmlFor="password">Пароль</Label>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                {isLogin ? "Войти" : "Создать аккаунт"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:text-blue-800 text-sm">
                {isLogin ? "Нет аккаунта? Зарегистрироваться" : "Уже есть аккаунт? Войти"}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">Демо вход администратора:</p>
                <p className="text-xs text-blue-600">Email: admin@paintstore.com</p>
                <p className="text-xs text-blue-600">Пароль: 1234</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Мой аккаунт</h1>
        <Button onClick={logout} variant="outline">
          <LogOut className="h-4 w-4 mr-2" />
          Выйти
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            Профиль
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" />
            Заказы
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Настройки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Информация профиля</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя</Label>
                  <Input id="firstName" defaultValue="Иван" />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input id="lastName" defaultValue="Иванов" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={user?.email || ""} />
              </div>
              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" defaultValue="+7 (999) 123-45-67" />
              </div>
              <div>
                <Label htmlFor="address">Адрес</Label>
                <Input id="address" defaultValue="ул. Ленина, 123" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Город</Label>
                  <Input id="city" defaultValue="Москва" />
                </div>
                <div>
                  <Label htmlFor="state">Область</Label>
                  <Input id="state" defaultValue="Московская" />
                </div>
                <div>
                  <Label htmlFor="zipCode">Почтовый индекс</Label>
                  <Input id="zipCode" defaultValue="101000" />
                </div>
              </div>
              <Button>Сохранить изменения</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Заказ #12345</h3>
                    <p className="text-sm text-gray-600">Размещен 15 марта 2024</p>
                  </div>
                  <Badge>Доставлен</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Премиум акриловая краска-спрей - Красная × 2</span>
                    <span>1798₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Прозрачный защитный лак × 1</span>
                    <span>1399₽</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
                  <span>Итого</span>
                  <span>3197₽</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold">Заказ #12344</h3>
                    <p className="text-sm text-gray-600">Размещен 10 марта 2024</p>
                  </div>
                  <Badge variant="secondary">В обработке</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Грунтовка по металлу - Антикоррозийная × 1</span>
                    <span>1249₽</span>
                  </div>
                </div>
                <div className="flex justify-between font-semibold mt-4 pt-4 border-t">
                  <span>Итого</span>
                  <span>1249₽</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Пароль</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword">Текущий пароль</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="newPassword">Новый пароль</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Подтвердить новый пароль</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button>Обновить пароль</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email уведомления</h4>
                    <p className="text-sm text-gray-600">Получать обновления о ваших заказах</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Включить
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Маркетинговые письма</h4>
                    <p className="text-sm text-gray-600">Получать рекламные предложения и новости</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Отключить
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
