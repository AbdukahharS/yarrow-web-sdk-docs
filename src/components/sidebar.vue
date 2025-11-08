<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Logo from '../assets/logo.svg'
import CustomSelect from './CustomSelect.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const sdkOptions = [
  { name: 'Web SDK', value: 'web-sdk', path: '/web-sdk' },
  { name: 'iOS SDK', value: 'ios-sdk', path: '/ios-sdk' }
]

const currentSDK = computed(() => {
  const path = route.path
  if (path.includes('ios')) return 'ios-sdk'
  return 'web-sdk'
})

const webSDKLinks = computed(() => [
  { name: t('nav.gettingStarted'), href: '#getting-started' },
  { name: t('nav.basicMap'), href: '#basic-map' },
  { name: t('nav.handlingEvents'), href: '#handling-events' },
  { name: t('nav.layersAndData'), href: '#layers-and-data' },
  { name: t('nav.routing'), href: '#routing' },
  { name: t('nav.search'), href: '#search' },
  { name: t('nav.publicTransport'), href: '#public-transport' },
  { name: t('nav.utilityMethods'), href: '#utility-methods' },
  { name: t('nav.advancedFeatures'), href: '#advanced-features' },
])

const iOSSDKLinks = computed(() => [
  { name: t('nav.ios.installation'), href: '#ios-installation' },
  { name: t('nav.ios.overview'), href: '#ios-overview' },
  { name: t('nav.ios.initialization'), href: '#ios-initialization' },
  { name: t('nav.ios.mapSettings'), href: '#ios-map-settings' },
  { name: t('nav.ios.zoomControls'), href: '#ios-zoom-controls' },
  { name: t('nav.ios.markers'), href: '#ios-markers' },
  { name: t('nav.ios.routing'), href: '#ios-routing' },
  { name: t('nav.ios.camera'), href: '#ios-camera' },
  { name: t('nav.ios.gestures'), href: '#ios-gestures' },
  { name: t('nav.ios.userLocation'), href: '#ios-user-location' },
  { name: t('nav.ios.weather'), href: '#ios-weather' },
  { name: t('nav.ios.geocoding'), href: '#ios-geocoding' },
  { name: t('nav.ios.layers'), href: '#ios-layers' },
  { name: t('nav.ios.bestPractices'), href: '#ios-best-practices' },
])

const links = computed(() => {
  return currentSDK.value === 'ios-sdk' ? iOSSDKLinks.value : webSDKLinks.value
})

const handleSDKChange = (value: string) => {
  const sdk = sdkOptions.find(s => s.value === value)
  if (sdk) {
    router.push(sdk.path)
  }
}

const activeSection = ref('')
const isMobile = ref(false)
const isDrawerOpen = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 768
}

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const handleLinkClick = () => {
  if (isMobile.value) {
    closeDrawer()
  }
}

let observer: IntersectionObserver | null = null

const setupObserver = () => {
  // Disconnect existing observer if any
  observer?.disconnect()

  // Create new observer
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

  // Wait for next tick to ensure DOM is updated
  setTimeout(() => {
    links.value.forEach((link) => {
      const element = document.querySelector(link.href)
      if (element) {
        observer?.observe(element)
      }
    })
  }, 100)
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)
  setupObserver()
})

// Watch for route changes and re-setup observer
watch(() => route.path, () => {
  activeSection.value = '' // Reset active section
  setupObserver()
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
  observer?.disconnect()
})

defineExpose({
  toggleDrawer,
  isMobile
})
</script>

<template>
  <!-- Mobile hamburger button -->
  <button
    v-if="isMobile"
    @click="toggleDrawer"
    class="hamburger-btn"
    :class="{ open: isDrawerOpen }"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <!-- Overlay for mobile -->
  <div
    v-if="isMobile && isDrawerOpen"
    class="overlay"
    @click="closeDrawer"
  ></div>

  <!-- Sidebar -->
  <aside :class="{
    'mobile-hidden': isMobile && !isDrawerOpen,
    'mobile-drawer': isMobile && isDrawerOpen
  }">
    <img :src="Logo" />

    <!-- SDK Selector -->
    <div class="sdk-selector">
      <CustomSelect
        :model-value="currentSDK"
        :options="sdkOptions"
        @update:model-value="handleSDKChange"
      />
    </div>

    <div class="links">
      <a
        v-for="(link, index) in links"
        :key="index"
        :href="link.href"
        :class="{ active: activeSection === link.href }"
        @click="handleLinkClick"
      >
        {{ link.name }}
      </a>
    </div>
  </aside>
</template>

<style scoped>
/* Hamburger button styles */
.hamburger-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: var(--bg-secondary);
  border: none;
  border-radius: 8px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 8px var(--shadow-color);
  transition: all 0.3s ease;
}

.hamburger-btn.open {
  top: 20px;
  left: 240px;
}

.hamburger-btn span {
  width: 20px;
  height: 2px;
  background: var(--text-secondary);
  transition: all 0.3s ease;
  transform-origin: center;
}

.hamburger-btn.open span:first-child {
  width: 30px;
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-btn.open span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.open span:last-child {
  width: 30px;
  transform: rotate(-45deg) translate(4px, -4px);
}

/* Overlay for mobile drawer */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--overlay-color);
  height: 100vh;
  z-index: 999;
}

aside {
  width: 283px;
  background: var(--bg-secondary);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  padding: 45px 35px;
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;

  .sdk-selector {
    margin-top: 30px;
  }

  .links {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    a {
      font-weight: 600;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 18px;
      display: block;
      padding: 14px 0;
      text-align: center;
      width: 100%;
      transition: color 0.2s ease;

      &.active {
        background: linear-gradient(180deg, #FE6D00 -72%, var(--bg-secondary) 311%);
        color: #ffffff;
        border-radius: 12px;
      }

      &:not(.active):hover {
        color: #FE6D00;
      }
    }
  }
}

/* Mobile responsive styles */
@media (max-width: 767px) {
  aside {
    border-radius: 0;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    padding: 20px;
    padding-bottom: 60px;
    width: 300px;

    .sdk-selector {
      margin-top: 20px;
    }

    .links {
      margin-top: 20px;
      gap: 15px;

      a {
        font-size: 16px;
        padding: 12px 0;
      }
    }
  }

  aside.mobile-hidden {
    transform: translateX(-100%);
  }

  aside.mobile-drawer {
    transform: translateX(0);
  }
}
</style>
