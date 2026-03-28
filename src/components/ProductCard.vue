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
    class="rounded-2xl bg-white dark:bg-gray-800 p-4 shadow hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
  >
    <div class="mb-3 h-48 w-full overflow-hidden rounded-xl bg-gray-200">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="h-full w-full object-cover"
        loading="lazy"
      />
    </div>

    <h2 class="text-lg font-semibold line-clamp-2">{{ product.title }}</h2>
    <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">{{ product.category }}</p>
    <p class="mt-2 text-xl font-bold">${{ product.price }}</p>
    <p class="text-sm text-gray-600 dark:text-gray-400">Rating: {{ product.rating }}/5</p>

    <div class="mt-4 flex gap-2">
      <RouterLink
        :to="`/product/${product.id}`"
        class="flex-1 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2 text-center text-white"
      >
        View Details
      </RouterLink>
      <button
        @click="toggleBookmark"
        :class="[
          'rounded-xl px-4 py-2 text-white font-semibold',
          bookmarkStore.isBookmarked(product.id)
            ? 'bg-red-600 hover:bg-red-700'
            : 'bg-gray-400 hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-500',
        ]"
      >
        {{ bookmarkStore.isBookmarked(product.id) ? '★' : '☆' }}
      </button>
    </div>
  </div>
</template>
