<script setup lang="ts">
import ProductGrid from '../components/ProductGrid.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { useProducts } from '../composables/useProducts'

const { filteredProducts, loading, error, searchTerm, selectedCategory, categories } = useProducts()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <main class="max-w-7xl mx-auto p-6 animate-fade-in">
      <div class="mb-10 text-center animate-slide-up">
        <h1 class="mb-4 text-5xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-sm">Explore ClickMart</h1>
        <p class="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto font-medium">Discover premium products, exclusive deals, and build your personalized collection.</p>
      </div>

      <div class="mb-10 gap-6 grid md:grid-cols-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div>
          <label class="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Search Products</label>
          <SearchBar v-model="searchTerm" />
        </div>
        <div>
          <label class="mb-2 block text-sm font-bold text-gray-700 dark:text-gray-300">Filter by Category</label>
          <CategoryFilter v-model="selectedCategory" :categories="categories" />
        </div>
      </div>

      <div v-if="loading" class="rounded-xl bg-white dark:bg-gray-800 p-8 text-center">
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Loading products from dummyjson.com...
        </p>
      </div>
      <div
        v-else-if="error"
        class="rounded-xl bg-red-50 dark:bg-red-900 p-6 text-red-700 dark:text-red-300"
      >
        <p class="text-lg">{{ error }}</p>
      </div>
      <div
        v-else-if="filteredProducts.length === 0"
        class="rounded-xl bg-white dark:bg-gray-800 p-8 text-center"
      >
        <p class="text-lg text-gray-600 dark:text-gray-400">
          No products found. Try adjusting your search or filter.
        </p>
      </div>
      <ProductGrid v-else :products="filteredProducts" />
    </main>
  </div>
</template>
