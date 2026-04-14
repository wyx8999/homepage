/**
 * 主题初始化插件
 * 在客户端初始化时检测并应用保存的主题设置
 */
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')

    return {
      provide: {
        theme: {
          isDark
        }
      }
    }
  }
})
