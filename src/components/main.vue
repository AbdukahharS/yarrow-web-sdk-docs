<script setup lang="ts">
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
main {
  margin-left: 283px;
  transition: margin-left 0.3s ease;
  color: var(--text-primary);
}

@media (max-width: 767px) {
  main {
    margin-left: 0;
    padding: 20px;
  }
}
</style>
