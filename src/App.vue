<script setup lang="ts">
import Main from './components/main.vue'
import { watch } from 'vue'
import sidebar from './components/sidebar.vue'
import { useI18n } from 'vue-i18n'

const circles = [
  { top: 15, left: 15 },
  { top: 20, left: 75 },
  { top: 75, left: 90 },
  { top: 85, left: 25 },
]

const { t, locale } = useI18n()

// Update document title when locale changes
watch(
  locale,
  () => {
    document.title = t('app.title')
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <div
      v-for="(circle, index) in circles"
      :key="`circle-${index}-${circle.top}-${circle.left}`"
      class="shadow-circle"
      :style="{
        top: `${circle.top}vh`,
        left: `${circle.left}vw`,
      }"
    ></div>
  </div>
  <sidebar />
  <Main />
</template>

<style scoped>
.shadow-circle {
  position: fixed;
  width: 1px;
  height: 1px;
  background: #fe6d0066;
  box-shadow: 0px -15px 250px 100px #fe6d0066;
  z-index: -1;
}

@media screen and (max-width: 768px) {
  .shadow-circle {
    box-shadow: 0px -10px 150px 50px #fe6d0066;
  }
}
</style>