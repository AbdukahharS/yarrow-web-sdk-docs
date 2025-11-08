<script setup lang="ts">
import iOSHero from '../components/ios/ios-hero.vue'
import iOSInstallation from '../components/ios/ios-installation.vue'
import iOSOverview from '../components/ios/ios-overview.vue'
import iOSInitialization from '../components/ios/ios-initialization.vue'
import iOSMapSettings from '../components/ios/ios-map-settings.vue'
import iOSZoomControls from '../components/ios/ios-zoom-controls.vue'
import iOSMarkers from '../components/ios/ios-markers.vue'
import iOSRouting from '../components/ios/ios-routing.vue'
import iOSCamera from '../components/ios/ios-camera.vue'
import iOSGestures from '../components/ios/ios-gestures.vue'
import iOSUserLocation from '../components/ios/ios-user-location.vue'
import iOSWeather from '../components/ios/ios-weather.vue'
import iOSGeocoding from '../components/ios/ios-geocoding.vue'
import iOSLayers from '../components/ios/ios-layers.vue'
import iOSBestPractices from '../components/ios/ios-best-practices.vue'
</script>

<template>
  <div class="sdk-page">
    <iOSHero />
    <iOSInstallation />
    <iOSOverview />
    <iOSInitialization />
    <iOSMapSettings />
    <iOSZoomControls />
    <iOSMarkers />
    <iOSRouting />
    <iOSCamera />
    <iOSGestures />
    <iOSUserLocation />
    <iOSWeather />
    <iOSGeocoding />
    <iOSLayers />
    <iOSBestPractices />
  </div>
</template>

<style scoped>
.sdk-page {
  width: 100%;
}
</style>
