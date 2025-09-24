<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const moveEndCode = computed(() => `yarrowMap.onMoveEnd((lat, lng, zoom) => {
  console.log(\`${t('handlingEvents.codeComments.mapMoved')} \${lat}, \${lng} ${t('handlingEvents.codeComments.withZoom')} \${zoom}\`);
});`)

const mapClickCode = computed(() => `yarrowMap.onMapClick((lat, lng) => {
  console.log(\`${t('handlingEvents.codeComments.mapClicked')} \${lat}, \${lng}\`);
});`)

const iconClickCode = computed(() => `// ${t('handlingEvents.codeComments.listenPOIs')}
yarrowMap.onIconClick('pois', (lat, lng, properties) => {
  console.log('${t('handlingEvents.codeComments.poiClicked')}', properties);
});

// ${t('handlingEvents.codeComments.listenBuildings')}
yarrowMap.onIconClick('buildings', (lat, lng, properties) => {
  console.log('${t('handlingEvents.codeComments.buildingClicked')}', properties);
});`)
</script>

<template>
  <div id="handling-events">
    <div class="container">
      <h2>{{ t('handlingEvents.title') }}</h2>
      <p>
        {{ t('handlingEvents.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('handlingEvents.mapMovement.title') }}</h3>
      <p>
        {{ t('handlingEvents.mapMovement.description') }}
      </p>
    </div>
    <Code
      :code="moveEndCode"
      language="typescript"
      filename="map-movement.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('handlingEvents.mapClicks.title') }}</h3>
      <p>
        {{ t('handlingEvents.mapClicks.description') }}
      </p>
    </div>
    <Code
      :code="mapClickCode"
      language="typescript"
      filename="map-clicks.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('handlingEvents.poiClicks.title') }}</h3>
      <p>
        {{ t('handlingEvents.poiClicks.description', { pois: 'points of interest (POIs)', buildings: 'buildings' }) }}
      </p>
    </div>
    <Code
      :code="iconClickCode"
      language="typescript"
      filename="poi-clicks.ts"
      file-type="TS"
    />
  </div>
</template>

<style scoped>
#handling-events {
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
  }
}
</style>