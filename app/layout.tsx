import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "КрасМастер - Премиальные лакокрасочные решения",
  description: "Профессиональные краски-спреи, лаки и грунтовки для всех ваших проектов",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Navigation />
            <main>{children}</main>
            <footer className="bg-gray-900 text-white py-12 mt-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">КрасМастер</h3>
                    <p className="text-gray-400">
                      Ваш надежный партнер в области премиальных лакокрасочных решений и экспертных консультаций.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Товары</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>Краски-спреи</li>
                      <li>Лаки</li>
                      <li>Грунтовки</li>
                      <li>Аксессуары</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Поддержка</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>Связаться с нами</li>
                      <li>Цветовой справочник</li>
                      <li>Советы по применению</li>
                      <li>Возврат товара</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-4">Компания</h4>
                    <ul className="space-y-2 text-gray-400">
                      <li>О нас</li>
                      <li>Карьера</li>
                      <li>Политика конфиденциальности</li>
                      <li>Условия обслуживания</li>
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                  <p>&copy; 2024 КрасМастер. Все права защищены.</p>
                </div>
              </div>
            </footer>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
