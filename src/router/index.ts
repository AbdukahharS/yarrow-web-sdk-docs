import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/web-sdk'
  },
  {
    path: '/web-sdk',
    name: 'WebSDK',
    component: () => import('../pages/WebSDKPage.vue'),
    meta: {
      title: 'Web SDK Documentation'
    }
  },
  {
    path: '/ios-sdk',
    name: 'iOSSDK',
    component: () => import('../pages/iOSSDKPage.vue'),
    meta: {
      title: 'iOS SDK Documentation'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
