"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { validateImageFile, resizeImage } from "@/lib/image-utils"
import { Upload, X, ImageIcon } from "lucide-react"

interface ImageUploadProps {
  currentImage?: string
  onImageChange: (imageBase64: string | null) => void
  label?: string
}

export default function ImageUpload({ currentImage, onImageChange, label = "Изображение товара" }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!validateImageFile(file)) {
      return
    }

    setIsUploading(true)

    try {
      // Изменяем размер изображения для оптимизации
      const resizedImage = await resizeImage(file, 800, 800, 0.8)
      setPreview(resizedImage)
      onImageChange(resizedImage)
    } catch (error) {
      console.error("Ошибка при обработке изображения:", error)
      alert("Ошибка при загрузке изображения")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {preview ? (
        <div className="relative">
          <div className="w-full h-64 relative bg-gray-100 rounded-lg overflow-hidden">
            <Image src={preview || "/placeholder.svg"} alt="Предварительный просмотр" fill className="object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
          onClick={handleUploadClick}
        >
          <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 text-center mb-2">Нажмите для загрузки изображения</p>
          <p className="text-sm text-gray-500 text-center">JPG, PNG или WebP до 5MB</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex space-x-2">
        <Button type="button" variant="outline" onClick={handleUploadClick} disabled={isUploading}>
          <Upload className="h-4 w-4 mr-2" />
          {isUploading ? "Загрузка..." : "Выбрать файл"}
        </Button>

        {preview && (
          <Button type="button" variant="outline" onClick={handleRemoveImage}>
            <X className="h-4 w-4 mr-2" />
            Удалить
          </Button>
        )}
      </div>
    </div>
  )
}
