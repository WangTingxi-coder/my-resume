<template>
    <nav class="navbar">
      <div class="nav-container">
        <router-link to="/" class="nav-brand">
          <span class="brand-text">王廷希</span>
          <span class="brand-subtitle">个人作品集</span>
        </router-link>
        
        <div class="nav-links">
          <router-link 
            v-for="item in navItems" 
            :key="item.path"
            :to="item.path"
            class="nav-link"
            :class="{ 'active': $route.path === item.path }"
          >
            <span class="nav-icon">{{ item.icon }}</span>
            {{ item.name }}
          </router-link>
        </div>
        
        <div class="nav-actions">
          <button class="theme-toggle" @click="toggleTheme" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'">
            {{ isDark ? '☀️' : '🌙' }}
          </button>
          <button class="btn primary small" @click="downloadResume">
            📄 下载简历
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup lang="ts">
  import { useThemeStore } from '@/stores/theme'
  import { useRouter } from 'vue-router'
  
  const themeStore = useThemeStore()
  const router = useRouter()
  
  const { isDark, toggleTheme } = themeStore
  
  const navItems = [
    { path: '/', name: '首页', icon: '🏠' },
    { path: '/projects', name: '项目', icon: '💼' },
    { path: '/contact', name: '联系', icon: '📞' }
  ]
  
  const downloadResume = () => {
    alert('简历PDF下载功能即将开启')
  }
  </script>
  
  <style scoped>
  .navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  .dark .navbar {
    background: rgba(26, 26, 26, 0.95);
    border-bottom-color: rgba(255, 255, 255, 0.1);
  }
  
  .nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .nav-brand {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
  }
  
  .brand-text {
    font-size: 1.5rem;
    font-weight: bold;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .brand-subtitle {
    font-size: 0.8rem;
    opacity: 0.7;
  }
  
  .nav-links {
    display: flex;
    gap: 2rem;
  }
  
  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
    color: inherit;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    font-weight: 500;
  }
  
  .nav-link:hover,
  .nav-link.active {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
  
  .nav-actions {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .theme-toggle {
    background: none;
    border: 2px solid rgba(52, 152, 219, 0.3);
    border-radius: 20px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    color: inherit;
  }
  
  .theme-toggle:hover {
    border-color: #3498db;
    background: rgba(52, 152, 219, 0.1);
  }
  
  .btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s;
  }
  
  .btn.primary {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: white;
  }
  
  .btn.small {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
    
    .brand-subtitle {
      display: none;
    }
  }
  </style>