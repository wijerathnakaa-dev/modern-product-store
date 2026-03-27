<script setup lang="ts">
import { useProducts } from '../composables/useProducts'

const { filteredProducts, loading, error } = useProducts()
</script>

<template>
  <div class="p-6">
    <h1 class="mb-4 text-3xl font-bold">Modern Product Store</h1>

    <p v-if="loading">Loading...</p>
    <p v-else-if="error">{{ error }}</p>

    <ul v-else class="space-y-2">
      <li v-for="product in filteredProducts" :key="product.id">
        {{ product.title }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>
