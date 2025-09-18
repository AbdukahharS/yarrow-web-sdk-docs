<script setup lang="ts">
import Main from './components/main.vue';
import { ref, onMounted, onUnmounted, watch } from 'vue'
import sidebar from './components/sidebar.vue';
import { useI18n } from 'vue-i18n';

// Pre-generate static circles to prevent any reactivity issues
const generateStaticCircles = () => {
  const numCircles = 8 // Fixed number of circles

  const staticCircles = []

  // Predefined positions for controlled chaos
  const positions = [
    { top: 15, left: 12 },
    { top: 25, left: 65 },
    { top: 8, left: 88 },
    { top: 35, left: 25 },
    { top: 75, left: 15 },
    { top: 85, left: 75 },
    { top: 65, left: 45 },
    { top: 90, left: 92 }
  ]

  for (let i = 0; i < numCircles; i++) {
    staticCircles.push({
      top: `${positions[i].top}%`,
      left: `${positions[i].left}%`
    })
  }

  return staticCircles
}

const circles = ref(generateStaticCircles())

const { t, locale } = useI18n()

// Update document title when locale changes
watch(locale, () => {
  document.title = t('app.title')
}, { immediate: true })

onMounted(() => {
  // No resize listener - circles are now static
})

onUnmounted(() => {
  // Nothing to clean up
})
</script>

<template>
  <div>
    <div
      v-for="(circle, index) in circles"
      :key="`circle-${index}-${circle.top}-${circle.left}`"
      class="shadow-circle"
      :style="{
        top: circle.top,
        left: circle.left,
        '--delay': `${index * 0.5}s`
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
  background: #FE6D00;
  box-shadow: 0px -15px 250px 100px #FE6D0066;
  z-index: -1;
  opacity: 0;
  animation: 
    fadeIn 2s ease-in-out var(--fade-delay, 0s) forwards,
    lazyFloat var(--move-duration, 20s) ease-in-out var(--move-delay, 0s) infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes lazyFloat {
  0%, 100% {
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  25% {
    transform: translate(var(--move-distance, 30px), calc(var(--move-distance, 30px) * -0.7)) rotate(90deg) scale(1.1);
  }
  50% {
    transform: translate(calc(var(--move-distance, 30px) * 0.7), calc(var(--move-distance, 30px) * -1.2)) rotate(180deg) scale(0.9);
  }
  75% {
    transform: translate(calc(var(--move-distance, 30px) * -0.8), calc(var(--move-distance, 30px) * -0.5)) rotate(270deg) scale(1.05);
  }
}

/* Different circle variations for visual interest */
.shadow-circle:nth-child(2n) {
  box-shadow: 0px -10px 200px 80px #FE6D004D;
  animation-direction: reverse; /* Some circles move in opposite direction */
}

.shadow-circle:nth-child(3n) {
  box-shadow: 0px -20px 300px 120px #FE6D0033;
}

.shadow-circle:nth-child(4n) {
  background: #FF8533;
  box-shadow: 0px -12px 220px 90px #FF853366;
  animation-direction: alternate; /* Some circles alternate direction */
}

.shadow-circle:nth-child(5n) {
  animation-timing-function: ease-in-out;
  transform-origin: center center;
}

.shadow-circle:nth-child(6n) {
  animation-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);
}

/* Pause animations on hover for better UX */
.shadow-circle:hover {
  animation-play-state: paused;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .shadow-circle {
    animation: fadeIn 2s ease-in-out var(--fade-delay, 0s) forwards;
  }
}
</style>