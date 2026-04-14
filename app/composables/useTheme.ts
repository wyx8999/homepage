/**
 * 主题管理 Composable
 * 处理明暗主题切换
 */
export const useTheme = () => {
  const isDark = useState<boolean>('theme-dark', () => false)

  /**
   * 同步主题状态
   */
  const syncTheme = (): void => {
    if (import.meta.client) {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      isDark.value = savedTheme === 'dark' || (!savedTheme && prefersDark)
    }
  }

  /**
   * 应用主题到 DOM
   */
  const applyTheme = (): void => {
    if (import.meta.client) {
      document.documentElement.setAttribute('data-theme', isDark.value ? 'dark' : 'light')
    }
  }

  /**
   * 切换主题
   */
  const toggleTheme = (): void => {
    isDark.value = !isDark.value

    if (import.meta.client) {
      localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
      applyTheme()
    }
  }

  return {
    isDark: computed(() => isDark.value),
    syncTheme,
    toggleTheme
  }
}
