import { ref, watch, onMounted } from 'vue'

export function useDarkMode() {
  const isDark = ref<boolean>(true)

  const applyTheme = (value: boolean): void => {
    document.documentElement.classList.toggle('dark', value)
    localStorage.setItem('darkMode', JSON.stringify(value))
  }

  const toggleDarkMode = (): void => {
    isDark.value = !isDark.value
  }

  onMounted(() => {
    const saved = localStorage.getItem('darkMode')

    if (saved !== null) {
      isDark.value = JSON.parse(saved) as boolean
    } else {
      isDark.value = true
    }

    applyTheme(isDark.value)
  })

  watch(isDark, (newValue) => {
    applyTheme(newValue)
  })

  return {
    isDark,
    toggleDarkMode,
  }
}
