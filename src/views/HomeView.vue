<template>
  <div class="resume-app" :class="{ 'dark-mode': darkMode }">
    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="nav-brand">王廷希 - 个人简历</div>
      <ul class="nav-links">
        <li v-for="section in sections" :key="section.id">
          <a :href="`#${section.id}`" @click.prevent="scrollToSection(section.id)">
            {{ section.name }}
          </a>
        </li>
      </ul>
      <div class="nav-actions">
        <button class="theme-toggle" @click="toggleTheme">
          {{ darkMode ? '☀️' : '🌙' }}
        </button>
        <button class="btn primary small" @click="downloadResume">
          📄 下载简历
        </button>
      </div>
    </nav>

    <!-- 移动端菜单 -->
    <div class="mobile-nav">
      <button class="menu-toggle" @click="toggleMobileMenu">
        ☰
      </button>
      <div class="mobile-menu" v-if="mobileMenuOpen">
        <a v-for="section in sections" 
           :key="section.id"
           :href="`#${section.id}`"
           @click="scrollToSection(section.id)">
          {{ section.name }}
        </a>
      </div>
    </div>

    <div class="resume-container">
      <!-- 头部区域 -->
      <header id="home" class="hero-section">
        <div class="hero-content">
          <div class="avatar-container">
            <img 
              src="/自拍.jpg" 
              alt="王廷希" 
              class="hero-avatar"
              @click="showAvatarModal = true"
            >
            <div class="online-status"></div>
          </div>
          <h1>王廷希</h1>
          <p class="hero-subtitle">计算机网络技术专业 · 2025届毕业生</p>
          <p class="hero-tagline">专注前端开发与网络自动化运维</p>
          
          <div class="hero-actions">
            <button class="btn primary" @click="contactMe">
              💬 立即联系
            </button>
            <button class="btn secondary" @click="scrollToSection('projects')">
              🚀 查看项目
            </button>
          </div>

          <div class="quick-info">
            <div class="info-item">
              <span class="icon">📍</span>
              <span>现居惠州 · 求职广东省</span>
            </div>
            <div class="info-item">
              <span class="icon">🎓</span>
              <span>湖南外国语职业学院 · 2025届</span>
            </div>
            <div class="info-item">
              <span class="icon">💼</span>
              <span>前端开发/网络工程 · 可一个月后到岗</span>
            </div>
          </div>
        </div>
      </header>

      <!-- 关于我 -->
      <section id="about" class="section">
        <h2>关于我</h2>
        <div class="about-content">
          <div class="about-text">
            <p>一名充满热情的计算机网络技术专业应届毕业生，对前端开发和网络自动化运维有浓厚兴趣。具备扎实的Python、Vue.js和网络配置技能，期待在IT行业开启职业生涯。</p>
            
            <div class="personal-traits">
              <h3>个人特质</h3>
              <div class="traits-grid">
                <div 
                  v-for="(trait, index) in personalTraits" 
                  :key="trait.name"
                  class="trait-item"
                  :class="{ 'expanded': activeTrait === trait.name }"
                  @mouseenter="handleTraitHover(trait.name, index)"
                  @mouseleave="activeTrait = null"
                >
                  <div class="trait-content">
                    <span class="trait-icon">{{ trait.icon }}</span>
                    <span class="trait-name">{{ trait.name }}</span>
                  </div>
                  <div 
                    class="trait-detail-expandable" 
                    v-if="activeTrait === trait.name"
                  >
                    {{ trait.detail }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="about-stats">
            <div class="stat-card" 
                 v-for="stat in stats" 
                 :key="stat.label"
                 @click="showStatDetail(stat)">
              <div class="stat-number">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-trend">{{ stat.trend }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- 基本信息 -->
      <section id="info" class="section">
        <h2>基本信息</h2>
        <div class="info-grid">
          <div class="info-card" v-for="item in basicInfo" :key="item.label">
            <div class="info-header">
              <span class="info-icon">{{ item.icon }}</span>
              <strong>{{ item.label }}</strong>
            </div>
            <div class="info-value">{{ item.value }}</div>
            <div class="info-action" v-if="item.action" @click="handleInfoAction(item)">
              {{ item.action }}
            </div>
          </div>
        </div>
      </section>

      <!-- 教育背景 -->
      <section id="education" class="section">
        <h2>教育背景</h2>
        <div class="education-timeline">
          <div class="timeline-item">
            <div class="timeline-year">2022-2025</div>
            <div class="timeline-content">
              <h3>湖南外国语职业学院</h3>
              <p class="education-major">计算机网络技术 · 专科</p>
              <p class="education-detail">2022级 · 2025届毕业生</p>
              <div class="education-achievements">
                <h4>主要成就</h4>
                <ul>
                  <li>完成基于Python的校园网自动化运维毕业设计</li>
                  <li>掌握前端开发与网络自动化核心技术</li>
                  <li>获得C1驾驶证</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 技能专长 -->
      <section id="skills" class="section">
        <h2>技能专长</h2>
        <div class="skills-container">
          <div class="skill-category" v-for="category in skills" :key="category.name">
            <h3>{{ category.name }}</h3>
            <div class="skill-list">
              <div class="skill-item" 
                   v-for="skill in category.items" 
                   :key="skill.name"
                   @click="showSkillDetail(skill)"
                   @mouseenter="hoverSkill = skill.name"
                   @mouseleave="hoverSkill = null">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-progress" 
                       :style="{ width: skill.level + '%' }"
                       :class="{ 'hover': hoverSkill === skill.name }"></div>
                </div>
                <div class="skill-tags">
                  <span class="skill-tag" v-for="tag in skill.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 项目经验 -->
      <section id="projects" class="section">
        <h2>项目经验</h2>
        <div class="projects-showcase">
          <div class="project-main">
            <div class="project-hero">
              <h3>基于Python的湖外校园网自动化运维方案设计</h3>
              <p class="project-subtitle">毕业设计项目 · 网络自动化运维系统</p>
              
              <div class="project-highlights">
                <div class="highlight-item">
                  <span class="highlight-icon">🎯</span>
                  <span>自动化替代手工运维，提升效率80%</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">⚡</span>
                  <span>实时监控与多渠道预警，降低故障风险</span>
                </div>
                <div class="highlight-item">
                  <span class="highlight-icon">🔧</span>
                  <span>配置版本管理，保障网络稳定性</span>
                </div>
              </div>
            </div>

            <div class="project-details">
              <div class="detail-section">
                <h4>技术栈</h4>
                <div class="tech-stack">
                  <span class="tech-item" v-for="tech in projectTechStack" :key="tech">
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="detail-section">
                <h4>核心功能</h4>
                <div class="features-grid">
                  <div class="feature-item" 
                       v-for="feature in projectFeatures" 
                       :key="feature.name"
                       @click="showFeatureDetail(feature)">
                    <div class="feature-icon">{{ feature.icon }}</div>
                    <div class="feature-content">
                      <strong>{{ feature.name }}</strong>
                      <p>{{ feature.description }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="detail-section">
                <h4>项目成果</h4>
                <div class="achievements">
                  <div class="achievement-item" v-for="achievement in achievements" :key="achievement">
                    ✅ {{ achievement }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="project-gallery">
            <h4>项目截图</h4>
            <div class="gallery-grid">
              <div class="gallery-item" 
                   v-for="(image, index) in projectImages" 
                   :key="index"
                   @click="openImageModal(image)">
                <img :src="image.thumb" :alt="image.title" class="gallery-thumb">
                <div class="gallery-overlay">
                  <span class="gallery-title">{{ image.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 联系方式 -->
      <section id="contact" class="section">
        <h2>联系方式</h2>
        <div class="contact-container">
          <div class="contact-methods">
            <div class="contact-method" 
                 v-for="contact in contacts" 
                 :key="contact.type"
                 @click="handleContact(contact)">
              <div class="contact-icon">{{ contact.icon }}</div>
              <div class="contact-info">
                <strong>{{ contact.type }}</strong>
                <p>{{ contact.value }}</p>
                <span class="contact-action">{{ contact.action }}</span>
              </div>
            </div>
          </div>

          <div class="contact-form">
            <h4>快速联系</h4>
            <form @submit.prevent="submitContactForm">
              <div class="form-group">
                <input type="text" v-model="contactForm.name" placeholder="您的姓名" required>
              </div>
              <div class="form-group">
                <input type="email" v-model="contactForm.email" placeholder="您的邮箱" required>
              </div>
              <div class="form-group">
                <textarea v-model="contactForm.message" placeholder="留言内容" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn primary full-width">发送消息</button>
            </form>
          </div>
        </div>
      </section>
    </div>

    <!-- 模态框 -->
    <div class="modal" v-if="showAvatarModal" @click="showAvatarModal = false">
      <div class="modal-content" @click.stop>
        <img src="/自拍.jpg" alt="个人照片" class="modal-avatar">
        <button class="modal-close" @click="showAvatarModal = false">×</button>
      </div>
    </div>

    <!-- 技能详情模态框 -->
    <div class="modal" v-if="selectedSkill" @click="selectedSkill = null">
      <div class="modal-content skill-modal" @click.stop>
        <h3>{{ selectedSkill.name }}</h3>
        <div class="skill-detail-content">
          <p>{{ selectedSkill.detail }}</p>
          <div class="skill-examples">
            <h4>相关项目应用</h4>
            <ul>
              <li v-for="example in selectedSkill.examples" :key="example">{{ example }}</li>
            </ul>
          </div>
        </div>
        <button class="modal-close" @click="selectedSkill = null">×</button>
      </div>
    </div>

    <!-- 回到顶部按钮 -->
    <button class="back-to-top" v-if="showBackToTop" @click="scrollToTop">
      ↑
    </button>

    <!-- 底部 -->
    <footer class="resume-footer">
      <p>© 2024 王廷希 - 个人简历 | 最后更新: {{ currentDate }}</p>
      <p>期待与您合作！</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'

// 响应式数据
const darkMode = ref(false)
const mobileMenuOpen = ref(false)
const showAvatarModal = ref(false)
const showBackToTop = ref(false)
const hoverSkill = ref<string | null>(null)
const selectedSkill = ref<any>(null)
const activeTrait = ref<string | null>(null)

// 项目图片 - 使用本地图片
const projectImages = [
  { 
    thumb: '/top.jpg', 
    full: '/top.jpg', 
    title: '系统架构图' 
  },
  { 
    thumb: '/监控图.jpg', 
    full: '/监控图.jpg', 
    title: '设备监控界面' 
  },
  { 
    thumb: '/测试图.jpg', 
    full: '/测试图.jpg', 
    title: '性能图表' 
  }
]

// 当前日期
const currentDate = new Date().toLocaleDateString('zh-CN')

// 联系方式表单
const contactForm = reactive({
  name: '',
  email: '',
  message: ''
})

// 导航章节
const sections = [
  { id: 'home', name: '首页' },
  { id: 'about', name: '关于我' },
  { id: 'info', name: '基本信息' },
  { id: 'education', name: '教育背景' },
  { id: 'skills', name: '技能专长' },
  { id: 'projects', name: '项目经验' },
  { id: 'contact', name: '联系方式' }
]

// 个人特质
const personalTraits = [
  { 
    name: '认真负责', 
    icon: '🎯', 
    detail: '对工作认真负责，注重细节，确保每个任务都高质量完成' 
  },
  { 
    name: '学习能力强', 
    icon: '🚀', 
    detail: '快速学习新技术，持续关注行业发展趋势' 
  },
  { 
    name: '团队合作', 
    icon: '👥', 
    detail: '良好的团队协作精神，善于沟通协调' 
  },
  { 
    name: '抗压能力强', 
    icon: '💪', 
    detail: '能够承受工作压力，适应加班和紧急任务' 
  },
  { 
    name: '沟通能力', 
    icon: '💬', 
    detail: '表达清晰，能够有效与团队成员和客户沟通' 
  },
  { 
    name: '兴趣爱好', 
    icon: '🎾', 
    detail: '乒乓球、音乐、阅读，保持工作生活平衡' 
  }
]

// 统计数据
const stats = [
  { label: '技术技能', value: '10+', trend: '持续学习中' },
  { label: '项目经验', value: '3+', trend: '包含毕业设计' },
  { label: '学习年限', value: '3年', trend: '专业学习' },
  { label: '证书资质', value: '2+', trend: 'C1驾照等' }
]

// 基本信息
const basicInfo = [
  { icon: '🎂', label: '出生日期', value: '2003年4月9日' },
  { icon: '👦', label: '性别', value: '男' },
  { icon: '👨‍👩‍👧‍👦', label: '民族', value: '苗族' },
  { icon: '💍', label: '婚姻状况', value: '未婚' },
  { icon: '🎓', label: '学历', value: '专科' },
  { icon: '📍', label: '现居地址', value: '惠州' },
  { icon: '🏢', label: '求职意向', value: '前端开发/网络工程' },
  { icon: '🌍', label: '工作城市', value: '广东省', action: '查看地图' }
]

// 技能数据
const skills = [
  {
    name: '前端开发',
    items: [
      { 
        name: 'HTML/CSS', 
        level: 85,
        detail: '熟练掌握HTML5语义化标签和CSS3新特性，能够实现响应式布局和动画效果',
        examples: ['个人简历网站开发', '响应式布局实现'],
        tags: ['语义化', '响应式', 'Flexbox', 'Grid']
      },
      { 
        name: 'JavaScript', 
        level: 80,
        detail: '掌握ES6+特性，熟悉DOM操作、事件处理、异步编程等核心概念',
        examples: ['交互功能实现', '数据处理'],
        tags: ['ES6+', 'DOM', '异步', '模块化']
      },
      { 
        name: 'Vue.js', 
        level: 75,
        detail: '熟悉Vue3组合式API，了解Vue Router、Pinia等生态工具',
        examples: ['本简历网站', '组件开发'],
        tags: ['Vue3', '组合式API', 'Vite']
      }
    ]
  },
  {
    name: '后端技术',
    items: [
      { 
        name: 'Python', 
        level: 80,
        detail: '熟练使用Python进行自动化脚本开发，掌握网络编程和数据处理',
        examples: ['校园网自动化运维', '数据处理脚本'],
        tags: ['自动化', '网络编程', '数据处理']
      },
      { 
        name: 'Node.js', 
        level: 65,
        detail: '了解Node.js基础，能够使用Express框架开发简单API',
        examples: ['RESTful API开发'],
        tags: ['Express', 'RESTful', 'API']
      },
      { 
        name: 'MySQL', 
        level: 70,
        detail: '掌握数据库基本操作，能够进行数据查询、优化和管理',
        examples: ['项目数据存储', '性能监控数据'],
        tags: ['数据库设计', 'SQL优化']
      }
    ]
  },
  {
    name: '运维与工具',
    items: [
      { 
        name: '网络配置', 
        level: 75,
        detail: '熟悉网络设备配置，了解TCP/IP协议栈和网络安全管理',
        examples: ['校园网设备配置', '网络拓扑规划'],
        tags: ['路由器', '交换机', 'TCP/IP']
      },
      { 
        name: 'Linux', 
        level: 70,
        detail: '掌握Linux常用命令，能够进行系统管理和服务部署',
        examples: ['服务器管理', '自动化部署'],
        tags: ['系统管理', 'Shell脚本']
      },
      { 
        name: 'Git', 
        level: 80,
        detail: '熟练使用Git进行版本控制，了解团队协作流程',
        examples: ['项目版本管理', '团队协作'],
        tags: ['版本控制', '团队协作']
      },
      { 
        name: 'VMware', 
        level: 70,
        detail: '能够使用VMware进行虚拟化环境搭建和测试',
        examples: ['测试环境搭建', '网络模拟'],
        tags: ['虚拟化', '环境搭建']
      }
    ]
  }
]

// 项目技术栈
const projectTechStack = [
  'Python', 'Paramiko', 'Netmiko', 'Flask', 'MySQL', 
  'Redis', 'Pandas', 'Matplotlib', 'Vue.js', 'Linux'
]

// 项目功能特性
const projectFeatures = [
  {
    name: '网络设备自动巡检',
    icon: '🔍',
    description: '定期对校园网设备进行自动化巡检，实时监控设备状态'
  },
  {
    name: '故障预警系统',
    icon: '⚠️',
    description: '实时监控设备异常，通过多渠道及时发出预警信息'
  },
  {
    name: '配置管理',
    icon: '⚙️',
    description: '实现设备配置的集中管理、备份和自动化部署'
  },
  {
    name: '性能监控',
    icon: '📊',
    description: '对网络性能指标进行实时监控和数据分析'
  }
]

// 项目成果
const achievements = [
  '实现校园网设备自动化巡检，提升运维效率80%',
  '建立实时故障预警机制，降低网络故障风险',
  '完成配置版本管理，确保网络配置一致性',
  '开发性能监控系统，提供数据可视化分析'
]

// 联系方式
const contacts = [
  { 
    type: '手机', 
    value: '13298559440', 
    icon: '📞', 
    action: '点击拨打' 
  },
  { 
    type: '邮箱', 
    value: '2707588003@qq.com', 
    icon: '📧', 
    action: '发送邮件' 
  },
  { 
    type: '微信', 
    value: 'wtxdewiexi', 
    icon: '💬', 
    action: '复制微信号' 
  },
  { 
    type: '地址', 
    value: '惠州 · 求职广东省', 
    icon: '📍', 
    action: '查看位置' 
  }
]

// 方法
const toggleTheme = () => {
  darkMode.value = !darkMode.value
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    mobileMenuOpen.value = false
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const downloadResume = () => {
  // 这里可以连接下载PDF的功能
  alert('简历PDF下载功能即将开启')
}

const contactMe = () => {
  scrollToSection('contact')
}

// 处理个人特质悬停
const handleTraitHover = (traitName: string, index: number) => {
  activeTrait.value = traitName
}

const showSkillDetail = (skill: any) => {
  selectedSkill.value = skill
}

const showStatDetail = (stat: any) => {
  alert(`${stat.label}: ${stat.value} - ${stat.trend}`)
}

const showFeatureDetail = (feature: any) => {
  alert(`${feature.name}: ${feature.description}`)
}

const handleContact = (contact: any) => {
  switch (contact.type) {
    case '手机':
      window.open(`tel:${contact.value}`, '_self')
      break
    case '邮箱':
      window.open(`mailto:${contact.value}`, '_self')
      break
    case '微信':
      navigator.clipboard.writeText(contact.value)
      alert('微信号已复制到剪贴板')
      break
    case '地址':
      // 这里可以打开地图
      const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent('广东省')}`
      window.open(mapUrl, '_blank')
      break
  }
}

const handleInfoAction = (item: any) => {
  if (item.label === '工作城市') {
    const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent('广东省')}`
    window.open(mapUrl, '_blank')
  }
}

const submitContactForm = () => {
  // 这里可以连接后端API
  alert('感谢您的留言！我会尽快回复您。')
  // 重置表单
  contactForm.name = ''
  contactForm.email = ''
  contactForm.message = ''
}

const openImageModal = (image: any) => {
  // 这里可以实现图片模态框
  alert(`查看图片: ${image.title}`)
}

// 监听滚动事件
const handleScroll = () => {
  showBackToTop.value = window.scrollY > 300
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 基础样式 */
.resume-app {
  min-height: 100vh;
  background: #f8f9fa;
  color: #333;
  transition: all 0.3s ease;
  font-family: 'Microsoft YaHei', 'PingFang SC', sans-serif;
}

.resume-app.dark-mode {
  background: #1a1a1a;
  color: #fff;
}

.resume-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 导航栏样式 */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0,0,0,0.1);
}

.dark-mode .navbar {
  background: rgba(26, 26, 26, 0.95);
}

.nav-brand {
  font-size: 1.3rem;
  font-weight: bold;
  color: #3498db;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
}

.nav-links a {
  text-decoration: none;
  color: inherit;
  transition: color 0.3s;
  font-weight: 500;
}

.nav-links a:hover {
  color: #3498db;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s;
}

.theme-toggle:hover {
  background: rgba(52, 152, 219, 0.1);
}

/* 移动端导航 */
.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.dark-mode .mobile-nav {
  background: rgba(26, 26, 26, 0.95);
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  text-align: left;
}

.mobile-menu {
  background: inherit;
}

.mobile-menu a {
  display: block;
  padding: 1rem 2rem;
  text-decoration: none;
  color: inherit;
  border-bottom: 1px solid #eee;
  transition: background 0.3s;
}

.dark-mode .mobile-menu a {
  border-bottom-color: #444;
}

.mobile-menu a:hover {
  background: rgba(52, 152, 219, 0.1);
}

/* 按钮样式 */
.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn.primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
}

.btn.secondary {
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
}

.btn.secondary:hover {
  background: #3498db;
  color: white;
}

.btn.small {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

.btn.full-width {
  width: 100%;
  justify-content: center;
}

/* 英雄区域 */
.hero-section {
  padding: 140px 0 80px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.05)" points="0,1000 1000,0 1000,1000"/></svg>');
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}

.hero-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid white;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.hero-avatar:hover {
  transform: scale(1.05) rotate(5deg);
}

.online-status {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  background: #2ecc71;
  border: 3px solid white;
  border-radius: 50%;
}

.hero-content h1 {
  font-size: 3.5rem;
  margin: 1rem 0;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.hero-subtitle {
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
}

.hero-tagline {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.hero-actions {
  margin-bottom: 3rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.quick-info {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255,255,255,0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}

/* 章节通用样式 */
.section {
  padding: 100px 0;
}

.section h2 {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 3rem;
  color: #2c3e50;
  position: relative;
}

.dark-mode .section h2 {
  color: #ecf0f1;
}

.section h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  border-radius: 2px;
}

/* 关于我区域 */
.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: start;
}

.about-text {
  font-size: 1.1rem;
  line-height: 1.8;
}

.personal-traits {
  margin-top: 2rem;
}

.personal-traits h3 {
  color: #3498db;
  margin-bottom: 1.5rem;
}

.traits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

/* 个人特质项样式 - 文档流展开方案 */
.trait-item {
  background: white;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  overflow: hidden;
  min-height: 80px;
  display: flex;
  flex-direction: column;
}

.dark-mode .trait-item {
  background: #2d2d2d;
}

.trait-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.trait-item.expanded {
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.trait-content {
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.trait-icon {
  font-size: 2rem;
}

.trait-name {
  font-weight: 600;
  color: #2c3e50;
}

.dark-mode .trait-name {
  color: #ecf0f1;
}

/* 可展开的详情框 - 在文档流中 */
.trait-detail-expandable {
  background: #34495e;
  color: white;
  padding: 1.5rem;
  font-size: 0.9rem;
  line-height: 1.5;
  border-top: 1px solid rgba(255,255,255,0.1);
  animation: slideDown 0.3s ease-out;
}

.dark-mode .trait-detail-expandable {
  background: #2c3e50;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    max-height: 200px;
    transform: translateY(0);
  }
}

.about-stats {
  display: grid;
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-left: 4px solid #3498db;
}

.dark-mode .stat-card {
  background: #2d2d2d;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 0.5rem;
}

.stat-trend {
  font-size: 0.9rem;
  color: #27ae60;
  font-weight: 500;
}

/* 基本信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: all 0.3s;
  border-left: 4px solid #3498db;
}

.dark-mode .info-card {
  background: #2d2d2d;
}

.info-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.info-icon {
  font-size: 1.5rem;
}

.info-value {
  font-size: 1.1rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.dark-mode .info-value {
  color: #ecf0f1;
}

.info-action {
  color: #3498db;
  cursor: pointer;
  font-weight: 500;
  transition: color 0.3s;
}

.info-action:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* 教育背景 */
.education-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.timeline-item {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  border-left: 4px solid #3498db;
}

.dark-mode .timeline-item {
  background: #2d2d2d;
}

.timeline-year {
  display: inline-block;
  background: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 1rem;
}

.timeline-content h3 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.dark-mode .timeline-content h3 {
  color: #ecf0f1;
}

.education-major {
  color: #3498db;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.education-detail {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
}

.education-achievements h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.dark-mode .education-achievements h4 {
  color: #ecf0f1;
}

.education-achievements ul {
  list-style: none;
  padding: 0;
}

.education-achievements li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.education-achievements li::before {
  content: '✅';
  position: absolute;
  left: 0;
}

/* 技能区域 */
.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.skill-category {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.dark-mode .skill-category {
  background: #2d2d2d;
}

.skill-category h3 {
  color: #3498db;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.4rem;
}

.skill-list {
  space-y: 1.5rem;
}

.skill-item {
  margin-bottom: 1.5rem;
  cursor: pointer;
  transition: all 0.3s;
}

.skill-item:hover {
  transform: translateX(5px);
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.skill-name {
  font-weight: 600;
  color: #2c3e50;
}

.dark-mode .skill-name {
  color: #ecf0f1;
}

.skill-level {
  color: #3498db;
  font-weight: 600;
  font-size: 0.9rem;
}

.skill-bar {
  height: 8px;
  background: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.dark-mode .skill-bar {
  background: #34495e;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2980b9);
  border-radius: 4px;
  transition: width 1s ease-in-out;
  position: relative;
}

.skill-progress.hover {
  background: linear-gradient(90deg, #2980b9, #3498db);
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: rgba(52, 152, 219, 0.1);
  color: #3498db;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 项目经验 */
.projects-showcase {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.dark-mode .projects-showcase {
  background: #2d2d2d;
}

.project-main {
  padding: 3rem;
}

.project-hero {
  text-align: center;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #ecf0f1;
}

.dark-mode .project-hero {
  border-bottom-color: #34495e;
}

.project-hero h3 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.dark-mode .project-hero h3 {
  color: #ecf0f1;
}

.project-subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-bottom: 2rem;
}

.project-highlights {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.highlight-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(52, 152, 219, 0.1);
  padding: 1rem 1.5rem;
  border-radius: 10px;
  color: #3498db;
  font-weight: 500;
}

.detail-section {
  margin-bottom: 2.5rem;
}

.detail-section h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.dark-mode .detail-section h4 {
  color: #ecf0f1;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tech-item {
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.dark-mode .feature-item {
  background: #34495e;
}

.feature-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.feature-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.feature-content strong {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.dark-mode .feature-content strong {
  color: #ecf0f1;
}

.achievements {
  display: grid;
  gap: 1rem;
}

.achievement-item {
  padding: 1rem;
  background: rgba(52, 152, 219, 0.1);
  border-radius: 8px;
  color: #2c3e50;
  border-left: 4px solid #3498db;
}

.dark-mode .achievement-item {
  color: #ecf0f1;
  background: rgba(52, 152, 219, 0.2);
}

.project-gallery {
  padding: 2rem 3rem;
  background: #f8f9fa;
  border-top: 1px solid #ecf0f1;
}

.dark-mode .project-gallery {
  background: #34495e;
  border-top-color: #2c3e50;
}

.project-gallery h4 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.dark-mode .project-gallery h4 {
  color: #ecf0f1;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-item {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 4/3;
  background: #ecf0f1;
}

.dark-mode .gallery-item {
  background: #2c3e50;
}

.gallery-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.gallery-item:hover .gallery-thumb {
  transform: scale(1.1);
}

.gallery-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0,0,0,0.8));
  color: white;
  padding: 1rem;
  transform: translateY(100%);
  transition: transform 0.3s;
}

.gallery-item:hover .gallery-overlay {
  transform: translateY(0);
}

/* 联系方式 */
.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.contact-methods {
  display: grid;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.dark-mode .contact-method {
  background: #2d2d2d;
}

.contact-method:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.contact-info strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #2c3e50;
}

.dark-mode .contact-info strong {
  color: #ecf0f1;
}

.contact-action {
  color: #3498db;
  font-size: 0.9rem;
  font-weight: 500;
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.dark-mode .contact-form {
  background: #2d2d2d;
}

.contact-form h4 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.dark-mode .contact-form h4 {
  color: #ecf0f1;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ecf0f1;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  background: #f8f9fa;
  color: #2c3e50;
}

.dark-mode .form-group input,
.dark-mode .form-group textarea {
  background: #34495e;
  border-color: #2c3e50;
  color: #ecf0f1;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #3498db;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

/* 模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
}

.modal-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
  background: white;
  border-radius: 15px;
  overflow: hidden;
}

.dark-mode .modal-content {
  background: #2d2d2d;
}

.modal-avatar {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.skill-modal {
  max-width: 500px;
  padding: 2rem;
}

.skill-modal h3 {
  color: #3498db;
  margin-bottom: 1rem;
  text-align: center;
}

.skill-detail-content {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.skill-examples h4 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.dark-mode .skill-examples h4 {
  color: #ecf0f1;
}

.skill-examples ul {
  list-style: none;
  padding: 0;
}

.skill-examples li {
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.skill-examples li::before {
  content: '💡';
  position: absolute;
  left: 0;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.modal-close:hover {
  background: rgba(0,0,0,0.7);
}

/* 回到顶部按钮 */
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(52, 152, 219, 0.4);
  transition: all 0.3s;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-to-top:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(52, 152, 219, 0.6);
}

/* 底部 */
.resume-footer {
  background: #2c3e50;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
}

.dark-mode .resume-footer {
  background: #1a252f;
}

.resume-footer p {
  margin: 0.5rem 0;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .contact-container {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .navbar {
    display: none;
  }
  
  .mobile-nav {
    display: block;
  }
  
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .section {
    padding: 60px 0;
  }
  
  .section h2 {
    font-size: 2.2rem;
  }
  
  .project-main {
    padding: 2rem;
  }
  
  .project-hero h3 {
    font-size: 1.8rem;
  }
  
  .skills-container {
    grid-template-columns: 1fr;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-actions .btn {
    width: 100%;
    max-width: 300px;
    justify-content: center;
  }
  
  .quick-info {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .resume-container {
    padding: 0 10px;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }
  
  .section h2 {
    font-size: 1.8rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .project-highlights {
    flex-direction: column;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .modal {
    padding: 1rem;
  }
  
  .traits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>