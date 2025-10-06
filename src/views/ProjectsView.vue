<template>
    <div class="projects-view">
      <div class="container">
        <header class="page-header">
          <h1>我的项目</h1>
          <p>这里展示了我完成的主要项目和作品</p>
        </header>
  
        <!-- 这里可以放项目列表 -->
        <div class="projects-placeholder">
          <h2>项目页面开发中...</h2>
          <p>正在准备更多项目详情</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  .projects-view {
    padding-top: 100px;
    min-height: 100vh;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .page-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .page-header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .page-header p {
    font-size: 1.2rem;
    color: #7f8c8d;
  }
  
  .projects-placeholder {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  }
  
  .dark .projects-placeholder {
    background: #2d2d2d;
  }
  
  .projects-placeholder h2 {
    margin-bottom: 1rem;
    color: #3498db;
  }
  </style>