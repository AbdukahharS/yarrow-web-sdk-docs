<script setup lang="ts">
import Hero from '../components/hero.vue'
import gettingStarted from '../components/getting-started.vue'
import BasicMap from '../components/basic-map.vue'
import HandlingEvents from '../components/handling-events.vue'
import LayersAndData from '../components/layers-and-data.vue'
import Routing from '../components/routing.vue'
import Search from '../components/search.vue'
import PublicTransport from '../components/public-transport.vue'
import UtilityMethods from '../components/utility-methods.vue'
import AdvancedFeatures from '../components/advanced-features.vue'
</script>

<template>
  <div class="sdk-page">
    <Hero />
    <gettingStarted />
    <BasicMap />
    <HandlingEvents />
    <LayersAndData />
    <Routing />
    <Search />
    <PublicTransport />
    <UtilityMethods />
    <AdvancedFeatures />
  </div>
</template>

<style scoped>
.sdk-page {
  width: 100%;
}
</style>
