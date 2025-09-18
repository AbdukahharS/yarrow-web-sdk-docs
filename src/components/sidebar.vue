<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Logo from '../assets/logo.svg'

const { t, locale } = useI18n()

const links = computed(() => [
  { name: t('nav.gettingStarted'), href: '#getting-started' },
  { name: t('nav.basicMap'), href: '#basic-map' },
  { name: t('nav.handlingEvents'), href: '#handling-events' },
  { name: t('nav.layersAndData'), href: '#layers-and-data' },
  { name: t('nav.routing'), href: '#routing' },
  { name: t('nav.search'), href: '#search' },
  { name: t('nav.publicTransport'), href: '#public-transport' },
])

const changeLocale = (newLocale: string) => {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
}

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

  links.value.forEach((link) => {
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
    <div class="language-switcher">
      <span class="language-label">{{ t('ui.language') }}</span>
      <div class="language-options">
        <button
          @click="changeLocale('en')"
          :class="{ active: locale === 'en' }"
          class="lang-btn"
        >
          EN
        </button>
        <button
          @click="changeLocale('uz')"
          :class="{ active: locale === 'uz' }"
          class="lang-btn"
        >
          UZ
        </button>
        <button
          @click="changeLocale('ru')"
          :class="{ active: locale === 'ru' }"
          class="lang-btn"
        >
          RU
        </button>
      </div>
    </div>
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

  .language-switcher {
    margin-top: 30px;
    text-align: center;

    .language-label {
      font-size: 14px;
      font-weight: 600;
      color: #c2c2c2;
      display: block;
      margin-bottom: 15px;
    }

    .language-options {
      display: flex;
      gap: 8px;
      justify-content: center;

      .lang-btn {
        background: transparent;
        border: 1px solid #c2c2c2;
        color: #c2c2c2;
        padding: 6px 12px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          border-color: #fe6d00;
          color: #fe6d00;
        }

        &.active {
          background: #fe6d00;
          border-color: #fe6d00;
          color: #ffffff;
        }
      }
    }
  }

  .links {
    margin-top: 70px;
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
        background: linear-gradient(180deg, #FE6D00 -72%, #FFFFFF 311%);
        color: #ffffff;
        border-radius: 12px;
      }
    }
  }
}
</style>
