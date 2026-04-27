import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { AuthUser } from '../types/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<AuthUser | null>(
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
  )
  const loading = ref<boolean>(false)
  const error = ref<string>('')

  const isLoggedIn = computed(() => !!token.value)

  const login = async (username: string, password: string): Promise<boolean> => {
    loading.value = true
    error.value = ''
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: 60,
        })
      })

      if (!response.ok) {
        throw new Error('Invalid username or password')
      }

      const data: AuthUser = await response.json()
      
      token.value = data.token
      user.value = data

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))

      return true
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message
      } else {
        error.value = 'An unexpected error occurred'
      }
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = (): void => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  return { token, user, loading, error, isLoggedIn, login, logout }
})
