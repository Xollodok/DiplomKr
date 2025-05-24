"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProducts, addProduct, updateProduct, deleteProduct } from "@/lib/data"
import { useAuth } from "@/lib/auth-context"
import ImageUpload from "@/components/image-upload"
import type { Product } from "@/lib/types"
import { Plus, Edit, Trash2, Package, Users, DollarSign, TrendingUp } from "lucide-react"

export default function AdminPage() {
  const { user, isAuthenticated } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newProductImage, setNewProductImage] = useState<string | null>(null)
  const [editProductImage, setEditProductImage] = useState<string | null>(null)

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  // Проверка доступа администратора
  if (!isAuthenticated || !user?.isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Доступ запрещен</h1>
          <p className="text-gray-600 mb-8">У вас нет прав доступа к панели администратора</p>
          <Button onClick={() => (window.location.href = "/account")}>Войти в аккаунт</Button>
        </div>
      </div>
    )
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)

    const newProductData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      category: formData.get("category") as "spray-paint" | "varnish" | "primer",
      image: newProductImage || "/placeholder.svg?height=300&width=300",
      stock: Number.parseInt(formData.get("stock") as string),
      brand: formData.get("brand") as string,
      size: formData.get("size") as string,
    }

    const newProduct = addProduct(newProductData)
    setProducts(getProducts())
    setShowAddForm(false)
    setNewProductImage(null)

    // Очистка формы
    const form = e.target as HTMLFormElement
    form.reset()
  }

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setEditProductImage(product.image)
    setIsEditing(true)
  }

  const handleUpdateProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingProduct) return

    const formData = new FormData(e.target as HTMLFormElement)

    const updates = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number.parseFloat(formData.get("price") as string),
      category: formData.get("category") as "spray-paint" | "varnish" | "primer",
      stock: Number.parseInt(formData.get("stock") as string),
      brand: formData.get("brand") as string,
      size: formData.get("size") as string,
      image: editProductImage || editingProduct.image,
    }

    updateProduct(editingProduct.id, updates)
    setProducts(getProducts())
    setIsEditing(false)
    setEditingProduct(null)
    setEditProductImage(null)
  }

  const handleDeleteProduct = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить этот товар?")) {
      deleteProduct(id)
      setProducts(getProducts())
    }
  }

  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0)
  const lowStockProducts = products.filter((p) => p.stock < 10).length

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
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Панель администратора</h1>
          <p className="text-gray-600">Управление инвентарем и заказами магазина красок</p>
        </div>
        <div className="text-sm text-gray-600">Добро пожаловать, {user?.name}</div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="products">Товары</TabsTrigger>
          <TabsTrigger value="orders">Заказы</TabsTrigger>
          <TabsTrigger value="customers">Клиенты</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Всего товаров</p>
                    <p className="text-2xl font-bold">{totalProducts}</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Стоимость инвентаря</p>
                    <p className="text-2xl font-bold">{totalValue.toFixed(0)}₽</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Мало на складе</p>
                    <p className="text-2xl font-bold">{lowStockProducts}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Всего клиентов</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Последние заказы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Заказ #12345</p>
                      <p className="text-sm text-gray-600">Иван Иванов - 3299₽</p>
                    </div>
                    <Badge>Доставлен</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Заказ #12344</p>
                      <p className="text-sm text-gray-600">Мария Петрова - 1249₽</p>
                    </div>
                    <Badge variant="secondary">В обработке</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Заказ #12343</p>
                      <p className="text-sm text-gray-600">Петр Сидоров - 6597₽</p>
                    </div>
                    <Badge variant="outline">Ожидает</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Уведомление о низких запасах</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .filter((p) => p.stock < 10)
                    .map((product) => (
                      <div key={product.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">Осталось {product.stock} единиц</p>
                        </div>
                        <Badge variant="destructive">Мало на складе</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Управление товарами</h2>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Добавить товар
              </Button>
            </div>

            {/* Форма добавления товара */}
            {showAddForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Добавить новый товар</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddProduct} className="space-y-6">
                    <ImageUpload onImageChange={setNewProductImage} label="Изображение товара" />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Название товара</Label>
                        <Input id="name" name="name" required />
                      </div>
                      <div>
                        <Label htmlFor="brand">Бренд</Label>
                        <Input id="brand" name="brand" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea id="description" name="description" required />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">Цена (₽)</Label>
                        <Input id="price" name="price" type="number" step="1" required />
                      </div>
                      <div>
                        <Label htmlFor="stock">Количество</Label>
                        <Input id="stock" name="stock" type="number" required />
                      </div>
                      <div>
                        <Label htmlFor="size">Размер</Label>
                        <Input id="size" name="size" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spray-paint">Краска-спрей</SelectItem>
                          <SelectItem value="varnish">Лак</SelectItem>
                          <SelectItem value="primer">Грунтовка</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Button type="submit">Добавить товар</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setShowAddForm(false)
                          setNewProductImage(null)
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Форма редактирования товара */}
            {isEditing && editingProduct && (
              <Card>
                <CardHeader>
                  <CardTitle>Редактировать товар</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProduct} className="space-y-6">
                    <ImageUpload
                      currentImage={editingProduct.image}
                      onImageChange={setEditProductImage}
                      label="Изображение товара"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-name">Название товара</Label>
                        <Input id="edit-name" name="name" defaultValue={editingProduct.name} required />
                      </div>
                      <div>
                        <Label htmlFor="edit-brand">Бренд</Label>
                        <Input id="edit-brand" name="brand" defaultValue={editingProduct.brand} required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="edit-description">Описание</Label>
                      <Textarea
                        id="edit-description"
                        name="description"
                        defaultValue={editingProduct.description}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-price">Цена (₽)</Label>
                        <Input
                          id="edit-price"
                          name="price"
                          type="number"
                          step="1"
                          defaultValue={editingProduct.price}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-stock">Количество</Label>
                        <Input
                          id="edit-stock"
                          name="stock"
                          type="number"
                          defaultValue={editingProduct.stock}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-size">Размер</Label>
                        <Input id="edit-size" name="size" defaultValue={editingProduct.size} required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="edit-category">Категория</Label>
                      <Select name="category" defaultValue={editingProduct.category} required>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="spray-paint">Краска-спрей</SelectItem>
                          <SelectItem value="varnish">Лак</SelectItem>
                          <SelectItem value="primer">Грунтовка</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-2">
                      <Button type="submit">Обновить товар</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false)
                          setEditingProduct(null)
                          setEditProductImage(null)
                        }}
                      >
                        Отмена
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Список товаров */}
            <div className="grid gap-4">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 relative bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-gray-600">
                          {product.brand} • {product.size}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge className="capitalize">{getCategoryName(product.category)}</Badge>
                          <span className="text-sm text-gray-600">{product.price}₽</span>
                          <span className="text-sm text-gray-600">{product.stock} на складе</span>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Управление заказами</h2>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Заказ #12345</h3>
                      <p className="text-sm text-gray-600">Иван Иванов • ivan.ivanov@example.com</p>
                      <p className="text-sm text-gray-600">Размещен 15 марта 2024</p>
                    </div>
                    <div className="text-right">
                      <Badge>Доставлен</Badge>
                      <p className="text-lg font-semibold mt-2">3299₽</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Премиум акриловая краска-спрей - Красная × 2</span>
                      <span>1798₽</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Прозрачный защитный лак × 1</span>
                      <span>1399₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Заказ #12344</h3>
                      <p className="text-sm text-gray-600">Мария Петрова • maria.petrova@example.com</p>
                      <p className="text-sm text-gray-600">Размещен 10 марта 2024</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">В обработке</Badge>
                      <p className="text-lg font-semibold mt-2">1249₽</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Грунтовка по металлу - Антикоррозийная × 1</span>
                      <span>1249₽</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Управление клиентами</h2>

            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Иван Иванов</h3>
                      <p className="text-sm text-gray-600">ivan.ivanov@example.com</p>
                      <p className="text-sm text-gray-600">Клиент с марта 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">2 заказа</p>
                      <p className="text-sm text-gray-600">4548₽ всего</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">Мария Петрова</h3>
                      <p className="text-sm text-gray-600">maria.petrova@example.com</p>
                      <p className="text-sm text-gray-600">Клиент с февраля 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">1 заказ</p>
                      <p className="text-sm text-gray-600">1249₽ всего</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
