<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const specificRouteCode = computed(() => `const routeId = 'some-route-id';
yarrowMap.showBusRoute(routeId).then(clearBusRoute => {
  // ${t('publicTransport.codeComments.stopShowing')}
  // clearBusRoute();
});`)

const allBusesCode = computed(() => `yarrowMap.showBusRoute().then(clearBusRoutes => {
  // ${t('publicTransport.codeComments.stopShowingAll')}
  // clearBusRoutes();
});`)

const clearingBusesCode = computed(() => `// ${t('publicTransport.codeComments.storeCleanup')}
const clearBuses = await yarrowMap.showBusRoute('route-123');

// ${t('publicTransport.codeComments.laterClear')}
clearBuses();`)
</script>

<template>
  <div id="public-transport">
    <div class="container">
      <h2>{{ t('publicTransport.title') }}</h2>
      <p>
        {{ t('publicTransport.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('publicTransport.realTimeBuses.title') }}</h3>
      <p>
        {{ t('publicTransport.realTimeBuses.description', { realTimeLocations: 'real-time locations' }) }}
      </p>
      <h4>{{ t('publicTransport.realTimeBuses.specificRoute') }}</h4>
    </div>
    <Code
      :code="specificRouteCode"
      language="typescript"
      filename="specific-bus-route.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('publicTransport.realTimeBuses.allBuses') }}</h4>
      <p>
        {{ t('publicTransport.realTimeBuses.allBusesDescription', { routeId: 'route_id' }) }}
      </p>
    </div>
    <Code
      :code="allBusesCode"
      language="typescript"
      filename="all-buses.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('publicTransport.clearingBuses.title') }}</h3>
      <p>
        {{ t('publicTransport.clearingBuses.description', { showBusRoute: 'showBusRoute' }) }}
      </p>
    </div>
    <Code
      :code="clearingBusesCode"
      language="typescript"
      filename="clear-buses.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="cleanup-info">
        <h4>{{ t('publicTransport.cleanupInfo.title') }}</h4>
        <ul>
          <li>{{ t('publicTransport.cleanupInfo.stopUpdates') }}</li>
          <li>{{ t('publicTransport.cleanupInfo.removeMarkers') }}</li>
          <li>{{ t('publicTransport.cleanupInfo.removeLayers') }}</li>
          <li>{{ t('publicTransport.cleanupInfo.removeListeners') }}</li>
          <li>{{ t('publicTransport.cleanupInfo.clearCaches') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="performance-info">
        <h4>{{ t('publicTransport.performanceInfo.title') }}</h4>
        <ul>
          <li>{{ t('publicTransport.performanceInfo.maxBuses') }}</li>
          <li>{{ t('publicTransport.performanceInfo.radiusFiltering') }}</li>
          <li>{{ t('publicTransport.performanceInfo.viewportFiltering') }}</li>
          <li>{{ t('publicTransport.performanceInfo.iconCaching') }}</li>
          <li>{{ t('publicTransport.performanceInfo.debouncedUpdates') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="features-info">
        <h4>{{ t('publicTransport.automaticUpdates.title') }}</h4>
        <ul>
          <li>{{ t('publicTransport.automaticUpdates.updateInterval') }}</li>
          <li>{{ t('publicTransport.automaticUpdates.mapMovement') }}</li>
          <li>{{ t('publicTransport.automaticUpdates.distanceFiltering') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#public-transport {
  padding: 200px 0;

  .container {
    margin: 50px auto;

    h2 {
      font-weight: 600;
      font-size: 32px;
      text-align: center;
      margin-bottom: 20px;
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      margin-bottom: 15px;
      margin-top: 40px;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 600px;
      margin: 20px auto;

      span {
        color: #fe6d00;
        font-weight: 700;
      }
    }

    .cleanup-info, .performance-info, .features-info {
      max-width: 800px;
      margin: 0 auto;
      text-align: left;

      h4 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
      }

      ul {
        list-style: disc;
        padding-left: 20px;

        li {
          padding: 8px 0;
          font-size: 16px;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>