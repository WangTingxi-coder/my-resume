<template>
  <div id="app" :class="{ 'dark': themeStore.isDark }">
    <Navigation />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from './stores/theme'
import Navigation from './components/layout/Navigation.vue'
import Footer from './components/layout/Footer.vue'

const themeStore = useThemeStore()
</script>

<style>
#app {
  min-height: 100vh;
  background: #f8f9fa;
  color: #333;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

#app.dark {
  background: #1a1a1a;
  color: #fff;
}

.main-content {
  min-height: calc(100vh - 120px);
}
</style>