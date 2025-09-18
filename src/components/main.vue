<script setup lang="ts">
import Hero from './hero.vue'
import gettingStarted from './getting-started.vue'
import BasicMap from './basic-map.vue'
import HandlingEvents from './handling-events.vue'
import LayersAndData from './layers-and-data.vue'
import Routing from './routing.vue'
import Search from './search.vue'
import PublicTransport from './public-transport.vue'
</script>

<template>
  <main>
    <Hero />
    <gettingStarted />
    <BasicMap />
    <HandlingEvents />
    <LayersAndData />
    <Routing />
    <Search />
    <PublicTransport />
  </main>
</template>

<style scoped>
main {
  margin-left: 283px;
  transition: margin-left 0.3s ease;
}

@media (max-width: 767px) {
  main {
    margin-left: 0;
    padding: 20px;
  }
}
</style>
