<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import Logo from '../assets/logo.svg'
import CustomSelect from './CustomSelect.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const sdkOptions = computed(() => [
  { name: t('sdk.web'), value: 'web-sdk', path: '/web-sdk' },
  { name: t('sdk.ios'), value: 'ios-sdk', path: '/ios-sdk' },
  { name: t('sdk.flutter'), value: 'flutter-sdk', path: '/flutter-sdk' }
])

const currentSDK = computed(() => {
  const path = route.path
  if (path.includes('flutter')) return 'flutter-sdk'
  if (path.includes('ios')) return 'ios-sdk'
  return 'web-sdk'
})

const webSDKLinks = computed(() => [
  { name: t('nav.gettingStarted'), href: '#getting-started' },
  { name: t('nav.reactUsage'), href: '#react-usage' },
  { name: t('nav.basicMap'), href: '#basic-map' },
  { name: t('nav.handlingEvents'), href: '#handling-events' },
  { name: t('nav.layersAndData'), href: '#layers-and-data' },
  { name: t('nav.routing'), href: '#routing' },
  { name: t('nav.search'), href: '#search' },
  { name: t('nav.publicTransport'), href: '#public-transport' },
  { name: t('nav.utilityMethods'), href: '#utility-methods' },
  { name: t('nav.advancedFeatures'), href: '#advanced-features' },
  { name: t('nav.apiReference'), href: '#api-reference' },
  { name: t('nav.versionInformation'), href: '#version-information' },
  { name: t('nav.support'), href: '#support' },
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

const toHeadingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const flutterSections = [
  { key: 'nav.flutter.whatThisPackageProvides', anchor: '1. What this package provides' },
  { key: 'nav.flutter.requirements', anchor: '2. Requirements' },
  { key: 'nav.flutter.installation', anchor: '3. Installation' },
  { key: 'nav.flutter.import', anchor: '3.1 Import' },
  { key: 'nav.flutter.quickStart', anchor: '4. Quick start' },
  { key: 'nav.flutter.coreObjectsAndLifecycle', anchor: '5. Core objects and lifecycle' },
  { key: 'nav.flutter.yarrowMapView', anchor: '5.1 YarrowMapView' },
  { key: 'nav.flutter.yarrowMapController', anchor: '5.2 YarrowMapController' },
  { key: 'nav.flutter.readinessRules', anchor: '5.3 Readiness rules' },
  { key: 'nav.flutter.disposalRules', anchor: '5.4 Disposal rules' },
  { key: 'nav.flutter.configuration', anchor: '6. Configuration (YarrowMapConfig)' },
  { key: 'nav.flutter.fieldDetails', anchor: '6.1 Field details' },
  { key: 'nav.flutter.themeEnum', anchor: '6.2 Theme enum' },
  { key: 'nav.flutter.badgePositionEnum', anchor: '6.3 Badge position enum' },
  { key: 'nav.flutter.controlsConfig', anchor: '6.4 Controls config' },
  { key: 'nav.flutter.apiReference', anchor: '7. YarrowMap API reference' },
  { key: 'nav.flutter.styleTheme', anchor: '7.1 Style/theme' },
  { key: 'nav.flutter.camera', anchor: '7.2 Camera' },
  { key: 'nav.flutter.globalMapEvents', anchor: '7.3 Global map events' },
  { key: 'nav.flutter.featureClickEvents', anchor: '7.4 Feature click events' },
  { key: 'nav.flutter.layers', anchor: '7.5 Layers' },
  { key: 'nav.flutter.markers', anchor: '7.6 Markers' },
  { key: 'nav.flutter.routing', anchor: '7.7 Routing' },
  { key: 'nav.flutter.searchHighlight', anchor: '7.8 Search highlight' },
  { key: 'nav.flutter.busTracking', anchor: '7.9 Bus tracking' },
  { key: 'nav.flutter.cache', anchor: '7.10 Cache' },
  { key: 'nav.flutter.endpointContract', anchor: '8. Endpoint contract expected by SDK' },
  { key: 'nav.flutter.usageExamples', anchor: '9. Usage examples by feature' },
  { key: 'nav.flutter.initializeWithDarkTheme', anchor: '9.1 Initialize with dark theme, left controls, cache' },
  { key: 'nav.flutter.safeAccess', anchor: '9.2 Safe access from UI handlers' },
  { key: 'nav.flutter.customSymbolLayer', anchor: '9.3 Add a custom symbol layer and click handling' },
  { key: 'nav.flutter.clusteredPoints', anchor: '9.4 Add clustered points' },
  { key: 'nav.flutter.buildRouteWithLabels', anchor: '9.5 Build route with labels' },
  { key: 'nav.flutter.multiSegmentRoute', anchor: '9.6 Multi-segment route with language' },
  { key: 'nav.flutter.searchLifecycle', anchor: '9.7 Search lifecycle with cancellation' },
  { key: 'nav.flutter.busLifecycle', anchor: '9.8 Bus lifecycle with cancellation' },
  { key: 'nav.flutter.markerAddRemove', anchor: '9.9 Marker add/remove' },
  { key: 'nav.flutter.coordinateConventions', anchor: '10. Coordinate conventions (important)' },
  { key: 'nav.flutter.errorHandling', anchor: '11. Error handling and defensive patterns' },
  { key: 'nav.flutter.protectEarlyCalls', anchor: '11.1 Protect early calls' },
  { key: 'nav.flutter.catchRequestFailures', anchor: '11.2 Catch request failures' },
  { key: 'nav.flutter.cancelLongRunningTasks', anchor: '11.3 Always cancel long-running tasks' },
  { key: 'nav.flutter.commonPitfalls', anchor: '12. Common pitfalls' },
  { key: 'nav.flutter.fullScreenExample', anchor: '13. Full screen example' },
  { key: 'nav.flutter.publicExports', anchor: '14. Public exports from package' }
]

const flutterSDKLinks = computed(() =>
  flutterSections.map((section) => ({
    name: t(section.key),
    href: `#${toHeadingId(section.anchor)}`
  }))
)

const links = computed(() => {
  if (currentSDK.value === 'ios-sdk') return iOSSDKLinks.value
  if (currentSDK.value === 'flutter-sdk') return flutterSDKLinks.value
  return webSDKLinks.value
})

const handleSDKChange = (value: string) => {
  const sdk = sdkOptions.value.find(s => s.value === value)
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
      const id = link.href.startsWith('#') ? link.href.slice(1) : link.href
      const element = document.getElementById(id)
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
  padding: 45px 25px;
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  direction: rtl;

  * {
    direction: ltr;
  }

  .sdk-selector {
    margin-top: 30px;
  }

  .links {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 16px;

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
