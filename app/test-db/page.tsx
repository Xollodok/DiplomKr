'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestDB() {
  const [categories, setCategories] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
        
        if (error) {
          throw error
        }
        
        setCategories(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Произошла ошибка при подключении к базе данных')
        console.error('Error:', err)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Тест подключения к базе данных</h1>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Ошибка: {error}</p>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">Категории:</h2>
          {categories.length > 0 ? (
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.id} className="bg-gray-100 p-3 rounded">
                  {category.name} - {category.description}
                </li>
              ))}
            </ul>
          ) : (
            <p>Категории не найдены</p>
          )}
        </div>
      )}
    </div>
  )
} 