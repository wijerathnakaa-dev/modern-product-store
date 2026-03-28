<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'

const router = useRouter()
const route = useRoute()
const { isDark, toggleDarkMode } = useDarkMode()
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <nav class="bg-white dark:bg-gray-800 shadow-md">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <RouterLink
          to="/"
          class="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          🛍️ ClickMart
        </RouterLink>
        <div class="flex items-center gap-4">
          <button
            @click="toggleDarkMode"
            class="px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          >
            {{ isDark ? '☀️' : '🌙' }}
          </button>
          <RouterLink
            to="/bookmarks"
            :class="[
              'px-4 py-2 rounded-lg font-semibold transition',
              route.name === 'bookmarks'
                ? 'bg-blue-600 text-white'
                : 'border border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700',
            ]"
          >
            ⭐ Bookmarks
          </RouterLink>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>
