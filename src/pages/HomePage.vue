<script setup lang="ts">
import ProductGrid from '../components/ProductGrid.vue'
import SearchBar from '../components/SearchBar.vue'
import CategoryFilter from '../components/CategoryFilter.vue'
import { useProducts } from '../composables/useProducts'

const { products, filteredProducts, loading, error, searchTerm, selectedCategory, categories } =
  useProducts()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <div class="mb-8">
      <h1 class="mb-2 text-3xl font-bold">ClickMart</h1>
      <p class="text-gray-600">Browse and bookmark your favorite products</p>
    </div>

    <div class="mb-6 gap-4 grid md:grid-cols-2">
      <div>
        <label class="mb-2 block text-sm font-medium">Search Products</label>
        <SearchBar v-model="searchTerm" />
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium">Filter by Category</label>
        <CategoryFilter v-model="selectedCategory" :categories="categories" />
      </div>
    </div>

    <div v-if="loading" class="rounded-xl bg-white dark:bg-gray-800 p-8 text-center">
      <p class="text-lg text-gray-600 dark:text-gray-400">Loading products from dummyjson.com...</p>
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
  </div>
</template>
