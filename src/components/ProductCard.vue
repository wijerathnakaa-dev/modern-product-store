<script setup lang="ts">
import type { Product } from '../types/product'
import { useBookmarkStore } from '../stores/bookmarkStore'

const props = defineProps<{
  product: Product
}>()

const bookmarkStore = useBookmarkStore()

const toggleBookmark = (): void => {
  if (bookmarkStore.isBookmarked(props.product.id)) {
    bookmarkStore.removeBookmark(props.product.id)
  } else {
    bookmarkStore.addBookmark(props.product)
  }
}
</script>

<template>
  <div
    class="group rounded-2xl bg-white dark:bg-gray-800 p-5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-gray-700 animate-slide-up flex flex-col"
  >
    <div class="mb-4 h-56 w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-700/50 relative">
      <div class="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-colors duration-300 z-10"></div>
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-contain mix-blend-multiply dark:mix-blend-normal group-hover:scale-110 transition-transform duration-500 ease-out"
        loading="lazy"
      />
    </div>

    <div class="flex-grow">
      <h2 class="text-lg font-bold line-clamp-2 text-gray-900 dark:text-gray-100">{{ product.title }}</h2>
      <p class="text-sm font-medium text-blue-600 dark:text-blue-400 capitalize mt-1">{{ product.category }}</p>
      
      <div class="mt-3 flex items-center justify-between">
        <p class="text-2xl font-black text-gray-900 dark:text-white">${{ product.price }}</p>
        <div class="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/30 px-2 py-1 rounded-lg">
          <span class="text-yellow-500 text-sm">⭐</span>
          <span class="text-sm font-bold text-yellow-700 dark:text-yellow-400">{{ product.rating }}</span>
        </div>
      </div>
    </div>

    <div class="mt-5 flex gap-3">
      <RouterLink
        :to="`/product/${product.id}`"
        class="flex-1 rounded-xl bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 font-bold px-4 py-2.5 text-center transition-all duration-300 shadow-md"
      >
        View Details
      </RouterLink>
      <button
        @click="toggleBookmark"
        :class="[
          'rounded-xl px-4 py-2.5 font-bold transition-all duration-300 shadow-sm flex items-center justify-center',
          bookmarkStore.isBookmarked(product.id)
            ? 'bg-red-50 text-red-600 border-2 border-red-200 dark:bg-red-900/30 dark:border-red-800/50'
            : 'bg-white text-gray-400 border-2 border-gray-100 hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-500',
        ]"
      >
        <span class="text-xl" :class="{ 'scale-110': bookmarkStore.isBookmarked(product.id) }">{{ bookmarkStore.isBookmarked(product.id) ? '❤️' : '🤍' }}</span>
      </button>
    </div>
  </div>
</template>
