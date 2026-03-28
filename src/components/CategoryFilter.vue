<script setup lang="ts">
defineProps<{
  categories: string[]
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <select
    :value="modelValue"
    @change="emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    class="w-full rounded-xl border border-gray-300 dark:border-gray-600 p-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
  >
    <option v-for="category in categories" :key="category" :value="category">
      {{ category === 'all' ? 'All Categories' : category }}
    </option>
  </select>
</template>
