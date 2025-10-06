<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-info">
          <h3>王廷希</h3>
          <p>计算机网络技术专业 · 2025届毕业生</p>
          <p>专注前端开发与网络自动化运维</p>
        </div>
        
        <div class="footer-links">
          <router-link to="/" class="footer-link">首页</router-link>
          <router-link to="/projects" class="footer-link">项目</router-link>
          <router-link to="/contact" class="footer-link">联系</router-link>
        </div>
        
        <div class="footer-contact">
          <div class="contact-item">
            <span>📧 2707588003@qq.com</span>
          </div>
          <div class="contact-item">
            <span>📱 13298559440</span>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2024 王廷希 - 个人简历 | 最后更新: {{ currentDate }}</p>
        <p>期待与您合作！</p>
      </div>
    </footer>
  </template>
  
  <script setup lang="ts">
  const currentDate = new Date().toLocaleDateString('zh-CN')
  </script>
  
  <style scoped>
  .footer {
    background: #2c3e50;
    color: white;
    margin-top: auto;
  }
  
  .dark .footer {
    background: #1a252f;
  }
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 2rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }
  
  .footer-info h3 {
    margin-bottom: 1rem;
    color: #3498db;
  }
  
  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .footer-link {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-link:hover {
    color: #3498db;
  }
  
  .footer-contact {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .footer-bottom {
    border-top: 1px solid #34495e;
    padding: 1.5rem 2rem;
    text-align: center;
    color: #bdc3c7;
  }
  
  .dark .footer-bottom {
    border-top-color: #2c3e50;
  }
  
  .footer-bottom p {
    margin: 0.25rem 0;
  }
  </style>