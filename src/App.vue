<script setup lang="ts">
import Main from './components/main.vue';
import { ref, onMounted, onUnmounted } from 'vue'
import sidebar from './components/sidebar.vue';

const circles = ref<Array<{ top: string; left: string }>>([])

const calculateCircles = () => {
  const viewportHeight = window.innerHeight
  
  // Calculate number of circles based on viewport height
  // One circle roughly every 200px of height, minimum 5 circles
  const numCircles = Math.max(5, Math.floor(viewportHeight / 200))
  
  const newCircles = []
  
  for (let i = 0; i < numCircles; i++) {
    // Distribute circles vertically with some randomness
    const baseTop = (i + 1) * (100 / (numCircles + 1))
    const randomTopOffset = (Math.random() - 0.5) * 20 // ±10% variation
    const top = Math.max(5, Math.min(95, baseTop + randomTopOffset))
    
    // Random horizontal positioning
    const left = Math.random() * 100 // Between 0% and 100%

    newCircles.push({
      top: `${top}%`,
      left: `${left}%`
    })
  }
  
  circles.value = newCircles
}

onMounted(() => {
  calculateCircles()
  window.addEventListener('resize', calculateCircles)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateCircles)
})
</script>

<template>
  <div>
    <div 
      v-for="(circle, index) in circles" 
      :key="index"
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