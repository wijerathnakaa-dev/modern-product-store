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
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
    <button
      @click="router.push('/')"
      class="mb-4 rounded-xl bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
    >
      ← Back
    </button>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <div
      v-else-if="product"
      class="mx-auto max-w-4xl rounded-2xl bg-white dark:bg-gray-800 p-6 shadow border border-gray-200 dark:border-gray-700"
    >
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="mb-6 h-72 w-full rounded-xl object-cover"
      />

      <div class="mb-6 flex items-start justify-between">
        <div>
          <h1 class="text-3xl font-bold">{{ product.title }}</h1>
          <p class="mt-2 text-xl text-blue-600 dark:text-blue-400 font-semibold">
            {{ product.category }}
          </p>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Brand: <span class="font-semibold">{{ product.brand }}</span>
          </p>
        </div>
        <button
          @click="toggleBookmark"
          :class="[
            'rounded-xl px-6 py-3 text-white font-bold text-xl whitespace-nowrap',
            bookmarkStore.isBookmarked(product.id)
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-blue-600 hover:bg-blue-700',
          ]"
        >
          {{ bookmarkStore.isBookmarked(product.id) ? '★ Bookmarked' : '☆ Bookmark' }}
        </button>
      </div>

      <div class="mb-6 border-b pb-6">
        <p class="mb-4 text-lg text-gray-700 dark:text-gray-300">{{ product.description }}</p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <h3 class="text-lg font-semibold mb-2">Price</h3>
          <p class="text-3xl font-bold text-blue-600 dark:text-blue-400">${{ product.price }}</p>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <h3 class="text-lg font-semibold mb-2">Availability</h3>
          <p
            class="text-2xl font-semibold text-green-600 dark:text-green-400"
            v-if="product.stock > 0"
          >
            {{ product.stock }} in stock
          </p>
          <p class="text-2xl font-semibold text-red-600 dark:text-red-400" v-else>Out of stock</p>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <h3 class="text-lg font-semibold mb-2">Rating</h3>
          <p class="text-2xl font-semibold text-yellow-500">⭐ {{ product.rating }}/5</p>
        </div>
        <div class="rounded-lg bg-gray-50 dark:bg-gray-700 p-4">
          <h3 class="text-lg font-semibold mb-2">Discount</h3>
          <p class="text-2xl font-semibold text-orange-600 dark:text-orange-400">
            {{ product.discountPercentage }}% off
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
