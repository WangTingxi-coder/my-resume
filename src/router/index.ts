import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: '王廷希 - 个人简历' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/ProjectsView.vue'),
      meta: { title: '项目经验 - 王廷希' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
      meta: { title: '联系方式 - 王廷希' }
    }
  ]
})

// 路由守卫 - 更新页面标题
router.beforeEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
})

export default router