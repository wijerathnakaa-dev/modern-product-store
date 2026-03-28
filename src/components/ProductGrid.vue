<script setup lang="ts">
import ProductCard from './ProductCard.vue'
import type { Product } from '../types/product'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <ProductCard v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>
