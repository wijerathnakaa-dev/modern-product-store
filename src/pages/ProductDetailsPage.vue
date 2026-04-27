<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBookmarkStore } from '../stores/bookmarkStore'
import type { Product } from '../types/product'

const route = useRoute()
const router = useRouter()
const bookmarkStore = useBookmarkStore()
const product = ref<Product | null>(null)
const loading = ref<boolean>(false)
const error = ref<string>('')

onMounted(async () => {
  try {
    loading.value = true
    const response = await fetch(`https://dummyjson.com/products/${route.params.id}`)

    if (!response.ok) {
      throw new Error(`Product details fetch failed: ${response.status}`)
    }

    product.value = await response.json()
  } catch (err) {
    error.value = 'Failed to load product details'
    console.error(err)
  } finally {
    loading.value = false
  }
})

const toggleBookmark = (): void => {
  if (product.value) {
    if (bookmarkStore.isBookmarked(product.value.id)) {
      bookmarkStore.removeBookmark(product.value.id)
    } else {
      bookmarkStore.addBookmark(product.value)
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6 animate-fade-in">
    <div class="max-w-5xl mx-auto">
      <button
        @click="router.push('/')"
        class="mb-6 inline-flex items-center gap-2 rounded-xl bg-white dark:bg-gray-800 px-5 py-2.5 font-semibold shadow-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
      >
        <span>←</span> Back to store
      </button>

      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
      <p v-else-if="error" class="text-center text-red-500 bg-red-50 p-6 rounded-2xl">{{ error }}</p>

      <div
        v-else-if="product"
        class="rounded-3xl bg-white dark:bg-gray-800 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-slide-up"
      >
        <div class="grid md:grid-cols-2 gap-0">
          <div class="bg-gray-100 dark:bg-gray-700 p-8 flex items-center justify-center relative group">
            <div class="absolute inset-0 bg-gradient-to-tr from-blue-100/50 to-transparent dark:from-blue-900/20 mix-blend-overlay"></div>
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full max-w-md object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500 ease-out z-10"
            />
          </div>

          <div class="p-8 lg:p-10 flex flex-col justify-center">
            <div class="mb-6 flex items-start justify-between gap-4">
              <div>
                <h1 class="text-4xl font-black text-gray-900 dark:text-white leading-tight mb-2">{{ product.title }}</h1>
                <p class="text-xl text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider text-sm">
                  {{ product.category }}
                </p>
                <p class="mt-2 text-gray-500 dark:text-gray-400 font-medium">
                  Brand: <span class="text-gray-900 dark:text-gray-200 font-bold">{{ product.brand }}</span>
                </p>
              </div>
              <button
                @click="toggleBookmark"
                :class="[
                  'rounded-2xl p-4 font-bold transition-all duration-300 shadow-sm flex items-center justify-center shrink-0',
                  bookmarkStore.isBookmarked(product.id)
                    ? 'bg-red-50 text-red-600 border-2 border-red-200 dark:bg-red-900/30 dark:border-red-800/50'
                    : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500',
                ]"
                title="Bookmark this item"
              >
                <span class="text-2xl" :class="{ 'scale-110': bookmarkStore.isBookmarked(product.id) }">{{ bookmarkStore.isBookmarked(product.id) ? '❤️' : '🤍' }}</span>
              </button>
            </div>

            <div class="mb-8">
              <p class="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">{{ product.description }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4 mb-8">
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-700/50 p-5 border border-gray-100 dark:border-gray-700">
                <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">Price</h3>
                <p class="text-3xl font-black text-gray-900 dark:text-white">${{ product.price }}</p>
              </div>
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-700/50 p-5 border border-gray-100 dark:border-gray-700">
                <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">Availability</h3>
                <p
                  class="text-2xl font-black text-green-600 dark:text-green-400"
                  v-if="product.stock > 0"
                >
                  {{ product.stock }} left
                </p>
                <p class="text-2xl font-black text-red-600 dark:text-red-400" v-else>Sold out</p>
              </div>
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-700/50 p-5 border border-gray-100 dark:border-gray-700">
                <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">Rating</h3>
                <div class="flex items-center gap-1">
                  <span class="text-yellow-500 text-xl">⭐</span>
                  <p class="text-2xl font-black text-gray-900 dark:text-white">{{ product.rating }}</p>
                </div>
              </div>
              <div class="rounded-2xl bg-gray-50 dark:bg-gray-700/50 p-5 border border-gray-100 dark:border-gray-700">
                <h3 class="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1">Discount</h3>
                <p class="text-2xl font-black text-orange-600 dark:text-orange-400">
                  {{ product.discountPercentage }}% OFF
                </p>
              </div>
            </div>

            <button class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all active:scale-[0.98]">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
