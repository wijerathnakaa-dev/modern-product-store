import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref<boolean>(false)

  const toggleDarkMode = (): void => {
    isDark.value = !isDark.value
  }

  const setDarkMode = (value: boolean): void => {
    isDark.value = value
  }

  onMounted(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) {
      isDark.value = JSON.parse(saved)
    } else {
      // Check system preference
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  })

  watch(
    isDark,
    (newValue) => {
      localStorage.setItem('darkMode', JSON.stringify(newValue))
      if (newValue) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    { immediate: true },
  )

  return {
    isDark,
    toggleDarkMode,
    setDarkMode,
  }
}
