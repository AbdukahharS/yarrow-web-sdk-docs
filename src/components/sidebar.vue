<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Logo from '../assets/logo.svg'

const links = [
  { name: 'Getting Started', href: '#getting-started' },
  { name: 'Basic Map', href: '#basic-map' },
  { name: 'Handling Events', href: '#handling-events' },
  { name: 'Layers and Data', href: '#layers-and-data' },
  { name: 'Routing', href: '#routing' },
  { name: 'Search', href: '#search' },
  { name: 'Public Transport', href: '#public-transport' },
]

const activeSection = ref('')

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = '#' + entry.target.id
        }
      })
    },
    {
      rootMargin: '-10% 0px -80% 0px',
      threshold: 0
    }
  )

  links.forEach((link) => {
    const element = document.querySelector(link.href)
    if (element) {
      observer?.observe(element)
    }
  })
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <aside>
    <img :src="Logo" />
    <div class="links">
      <a v-for="(link, index) in links" :key="index" :href="link.href" :class="{ active: activeSection === link.href }">
        {{ link.name }}
      </a>
    </div>
  </aside>
</template>

<style scoped>
aside {
  width: 283px;
  background: #ffffff;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
  padding: 65px 45px;

  .links {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 30px;

    a {
      font-weight: 600;
      color: #c2c2c2;
      text-decoration: none;
      font-size: 18px;
      display: block;
      padding: 14px 0;
      text-align: center;
      width: 100%;
      transition: color 0.2s ease;

      &.active {
        color: #007bff;
      }
    }
  }
}
</style>
