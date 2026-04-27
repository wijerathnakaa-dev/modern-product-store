<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useDarkMode } from './composables/useDarkMode'
import { useAuthStore } from './stores/authStore'

const route = useRoute()
const router = useRouter()
const { isDark, toggleDarkMode } = useDarkMode()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div
    class="min-h-screen text-gray-900 dark:text-gray-100 transition-colors bg-[url('/bg.png')] bg-cover bg-center bg-fixed"
  >
    <div class="min-h-screen bg-gray-100/80 dark:bg-gray-900/80 backdrop-blur-[2px] transition-colors">
      <nav class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors">
        <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <RouterLink
            to="/"
            class="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-indigo-700 transition-all drop-shadow-sm"
          >
            🛍️ ClickMart
          </RouterLink>
          <div class="flex items-center gap-4">
            <button
              @click="toggleDarkMode"
              class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors shadow-inner"
              :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              {{ isDark ? '☀️' : '🌙' }}
            </button>
            
            <template v-if="authStore.isLoggedIn">
              <RouterLink
                to="/bookmarks"
                :class="[
                  'px-4 py-2 rounded-xl font-semibold transition-all duration-300',
                  route.name === 'bookmarks'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-white/10 dark:text-blue-400 dark:hover:bg-white/20',
                ]"
              >
                ⭐ Bookmarks
              </RouterLink>
              
              <div class="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                <div class="hidden sm:block text-right">
                  <p class="text-sm font-semibold leading-tight">{{ authStore.user?.firstName }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">@{{ authStore.user?.username }}</p>
                </div>
                <img :src="authStore.user?.image" alt="Profile" class="w-9 h-9 rounded-full border-2 border-blue-100 dark:border-gray-600 shadow-sm" v-if="authStore.user?.image" />
                <button 
                  @click="handleLogout"
                  class="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition"
                >
                  Logout
                </button>
              </div>
            </template>
            <template v-else>
              <RouterLink
                to="/login"
                class="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/30"
              >
                Sign In
              </RouterLink>
            </template>
          </div>
        </div>
      </nav>

      <main class="max-w-7xl mx-auto p-6 animate-fade-in">
        <router-view />
      </main>
    </div>
  </div>
</template>
