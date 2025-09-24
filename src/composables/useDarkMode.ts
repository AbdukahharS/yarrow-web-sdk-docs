import { ref, onMounted } from 'vue'

export type Theme = 'light' | 'dark'

const isDarkMode = ref(false)
const theme = ref<Theme>('light')

export function useDarkMode() {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    theme.value = isDarkMode.value ? 'dark' : 'light'
    updateTheme()
  }

  const setDarkMode = (value: boolean) => {
    isDarkMode.value = value
    theme.value = value ? 'dark' : 'light'
    updateTheme()
  }

  const updateTheme = () => {
    const html = document.documentElement
    // Apply class changes immediately
    if (isDarkMode.value) {
      html.classList.add('dark')
      html.classList.remove('light')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
    localStorage.setItem('theme', theme.value)
  }

  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
    } else {
      setDarkMode(prefersDark)
    }
  }

  onMounted(() => {
    initTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches)
      }
    }

    mediaQuery.addEventListener('change', handleChange)

    // Cleanup listener when component unmounts
    return () => mediaQuery.removeEventListener('change', handleChange)
  })

  return {
    isDarkMode,
    theme,
    toggleDarkMode,
    setDarkMode
  }
}