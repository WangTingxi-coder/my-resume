<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      于2025年毕业于湖南外国语职业学院<br>
      <a href="https://vite.dev/" target="_blank" rel="noopener">年龄：22</a> <br>
      <a href="https://vuejs.org/" target="_blank" rel="noopener">性别：男</a><br>
      <a href="https://vuejs.org/">学历：大专</a>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
