import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  // 先声明 updateThemeClass 函数
  const updateThemeClass = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // 从 localStorage 读取主题设置
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    isDark.value = savedTheme === 'dark'
    // 立即应用主题类
    updateThemeClass(isDark.value)
  }

  // 监听主题变化并保存
  watch(isDark, (newVal) => {
    localStorage.setItem('theme', newVal ? 'dark' : 'light')
    updateThemeClass(newVal)
  }, { immediate: true })

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
})