<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useBookmarkStore } from '../stores/bookmarkStore'
import ProductGrid from '../components/ProductGrid.vue'

const router = useRouter()
const bookmarkStore = useBookmarkStore()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <main class="max-w-7xl mx-auto p-6">
      <button
        @click="router.push('/')"
        class="mb-6 rounded-xl bg-gray-400 px-4 py-2 text-white hover:bg-gray-500"
      >
        ← Back to Home
      </button>

      <h1 class="mb-6 text-3xl font-bold">Bookmarked Products</h1>

      <div
        v-if="bookmarkStore.bookmarks.length === 0"
        class="rounded-xl bg-white dark:bg-gray-800 p-8 text-center border border-gray-200 dark:border-gray-700"
      >
        <p class="text-lg text-gray-500 dark:text-gray-400">No bookmarks yet</p>
        <RouterLink
          to="/"
          class="mt-4 inline-block rounded-xl bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Browse Products
        </RouterLink>
      </div>

      <ProductGrid v-else :products="bookmarkStore.bookmarks" />
    </main>
  </div>
</template>
