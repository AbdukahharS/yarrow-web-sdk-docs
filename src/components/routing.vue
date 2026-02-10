<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const simpleRouteCode = computed(() => `const start = [41.2995, 69.2401]; // [latitude, longitude]
const end = [41.3111, 69.2797];
const profile = 'car'; // 'car', 'bicycle', or 'pedestrian'

yarrowMap.buildRouteWithLabels(start, end, profile).then(({ features, directions }) => {
  console.log('${t('routing.codeComments.routeBuilt')}', features);
  console.log('${t('routing.codeComments.directions')}', directions);
});`)

const multiStopRouteCode = computed(() => `const coordinates = [
  [41.2995, 69.2401], // ${t('routing.codeComments.startPoint')}
  [41.3111, 69.2797], // ${t('routing.codeComments.waypointOne')}
  [41.325, 69.285],   // ${t('routing.codeComments.endPoint')}
];
const profile = 'car';
const language = 'en'; // Optional: 'en', 'ru', etc. (default: 'ru')

yarrowMap.buildMultiSegmentRouteWithLabels(coordinates, profile, language).then(({ features, directions }) => {
  console.log('${t('routing.codeComments.multiSegmentRoute')}', features);
  console.log('${t('routing.codeComments.directions')}', directions);
});`)

const clearRoutesCode = computed(() => `yarrowMap.clearAllRoutes();`)

const multipleRoutesCode = computed(() => `// ${t('routing.codeComments.routeFeatures')}
const routes = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[69.240, 41.299], [69.280, 41.311], [69.285, 41.315]]
    },
    properties: {
      duration: 15.5,
      distance: 2500
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[69.240, 41.299], [69.275, 41.308], [69.285, 41.315]]
    },
    properties: {
      duration: 18.2,
      distance: 3000
    }
  }
];

// ${t('routing.codeComments.renderDefault')}
yarrowMap.renderRoutes(routes);

// ${t('routing.codeComments.renderCustom')}
yarrowMap.renderRoutes(routes, 'my-custom-routes');`)
</script>

<template>
  <div id="routing">
    <div class="container">
      <h2>{{ t('routing.title') }}</h2>
      <p>
        {{ t('routing.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('routing.simpleRoute.title') }}</h3>
      <p>
        {{ t('routing.simpleRoute.description') }}
      </p>
    </div>
    <Code
      :code="simpleRouteCode"
      language="typescript"
      filename="simple-route.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('routing.multiStopRoute.title') }}</h3>
      <p>
        {{ t('routing.multiStopRoute.description', { multipleWaypoints: 'multiple waypoints' }) }}
      </p>
    </div>
    <Code
      :code="multiStopRouteCode"
      language="typescript"
      filename="multi-stop-route.ts"
      file-type="TS"
    />

    <div class="container">
      <p class="note">
        <strong>{{ t('routing.importantNote') }}</strong> {{ t('routing.coordinateFormat') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('routing.clearRoutes.title') }}</h3>
      <p>
        {{ t('routing.clearRoutes.description') }}
      </p>
    </div>
    <Code
      :code="clearRoutesCode"
      language="typescript"
      filename="clear-routes.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('routing.multipleRoutes.title') }}</h3>
      <p>
        {{ t('routing.multipleRoutes.description') }}
      </p>
    </div>
    <Code
      :code="multipleRoutesCode"
      language="typescript"
      filename="multiple-routes.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="features-info">
        <h4>{{ t('routing.features.title') }}</h4>
        <ul>
          <li>{{ t('routing.features.autoColors') }}</li>
          <li>{{ t('routing.features.separateLayers') }}</li>
          <li>{{ t('routing.features.defaultName') }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#routing {
  padding: 200px 0;

  .container {
    margin: 50px auto;

    h2 {
      font-weight: 600;
      font-size: 32px;
      text-align: center;
      margin-bottom: 20px;
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: var(--text-secondary);
      margin: 20px 0;
      transition: all 0.3s ease;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 600px;
      margin: 20px auto;
      color: var(--text-secondary);
      transition: all 0.3s ease;

      span {
        color: var(--accent-color);
        font-weight: 700;
        transition: all 0.3s ease;
      }
    }

    .note {
      background: var(--bg-secondary);
      border-left: 4px solid var(--accent-color);
      padding: 20px;
      margin: 20px auto;
      border-radius: 5px;
      font-size: 16px;
      text-align: left;
      max-width: 800px;
      color: var(--text-secondary);
      transition: all 0.3s ease;
    }

    .features-info {
      max-width: 800px;
      margin: 0 auto;
      text-align: left;

      h4 {
        text-align: center;
        margin-bottom: 20px;
      }

      ul {
        list-style: disc;
        padding-left: 20px;

        li {
          padding: 8px 0;
          font-size: 16px;
          line-height: 1.5;
          color: var(--text-secondary);
          transition: all 0.3s ease;

          code, span {
            color: var(--accent-color);
            font-weight: 700;
            font-family: monospace;
            transition: all 0.3s ease;
          }
        }
      }
    }
  }
}
</style>
