import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Product } from '../types/product'

export const useBookmarkStore = defineStore('bookmarks', () => {
  const bookmarks = ref<Product[]>(
    JSON.parse(localStorage.getItem('bookmarks') || '[]') as Product[],
  )

  const addBookmark = (product: Product): void => {
    const exists = bookmarks.value.some((item) => item.id === product.id)
    if (!exists) {
      bookmarks.value.push(product)
    }
  }

  const removeBookmark = (productId: number): void => {
    bookmarks.value = bookmarks.value.filter((item) => item.id !== productId)
  }

  const isBookmarked = (productId: number): boolean => {
    return bookmarks.value.some((item) => item.id === productId)
  }

  watch(
    bookmarks,
    (newBookmarks) => {
      localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
    },
    { deep: true },
  )

  return { bookmarks, addBookmark, removeBookmark, isBookmarked }
})
