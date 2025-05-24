export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const validateImageFile = (file: File): boolean => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"]
  const maxSize = 5 * 1024 * 1024 // 5MB

  if (!allowedTypes.includes(file.type)) {
    alert("Поддерживаются только файлы JPG, PNG и WebP")
    return false
  }

  if (file.size > maxSize) {
    alert("Размер файла не должен превышать 5MB")
    return false
  }

  return true
}

export const resizeImage = (file: File, maxWidth = 800, maxHeight = 800, quality = 0.8): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      // Вычисляем новые размеры с сохранением пропорций
      let { width, height } = img

      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Рисуем изображение на canvas
      ctx?.drawImage(img, 0, 0, width, height)

      // Конвертируем в base64
      const resizedBase64 = canvas.toDataURL("image/jpeg", quality)
      resolve(resizedBase64)
    }

    img.src = URL.createObjectURL(file)
  })
}
