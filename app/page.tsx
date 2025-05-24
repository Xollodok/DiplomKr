import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getProducts } from "@/lib/data"
import { ArrowRight, Palette, Shield, Sparkles } from "lucide-react"

export default function HomePage() {
  const products = getProducts()
  const featuredProducts = products.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Героический раздел */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Премиальные лакокрасочные решения</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Профессиональные краски-спреи, лаки и грунтовки для всех ваших проектов
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Купить сейчас
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                >
                  Получить консультацию
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Раздел преимуществ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему выбирают КрасМастер?</h2>
            <p className="text-lg text-gray-600">Профессиональное качество для профессиональных результатов</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Премиальное качество</h3>
              <p className="text-gray-600">Профессиональные краски и покрытия от проверенных брендов</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Долговечная защита</h3>
              <p className="text-gray-600">Прочные покрытия, которые защищают и украшают ваши проекты</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Экспертная поддержка</h3>
              <p className="text-gray-600">Профессиональные советы и руководство для ваших малярных проектов</p>
            </div>
          </div>
        </div>
      </section>

      {/* Рекомендуемые товары */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Рекомендуемые товары</h2>
            <p className="text-lg text-gray-600">Откройте для себя наши самые популярные лакокрасочные решения</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 capitalize">
                    {product.category === "spray-paint"
                      ? "Краска-спрей"
                      : product.category === "varnish"
                        ? "Лак"
                        : "Грунтовка"}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">{product.price}₽</span>
                    <Link href={`/products/${product.id}`}>
                      <Button>Подробнее</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                Посмотреть все товары
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Раздел категорий */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Покупки по категориям</h2>
            <p className="text-lg text-gray-600">Найдите идеальный продукт для вашего проекта</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/products?category=spray-paint" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative bg-gradient-to-br from-red-400 to-red-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Краски-спреи</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">Высококачественные краски-спреи для быстрого и равномерного покрытия</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=varnish" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative bg-gradient-to-br from-amber-400 to-amber-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Лаки</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">Защитные лаки для долговечного покрытия и защиты</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/products?category=primer" className="group">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative bg-gradient-to-br from-gray-400 to-gray-600">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-2xl font-bold text-white">Грунтовки</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-gray-600">Необходимые грунтовки для правильной адгезии и покрытия краски</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
