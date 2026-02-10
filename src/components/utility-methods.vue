<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const boundingBoxCode = computed(() => `const geojsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [69.2797, 41.3111]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[69.240, 41.299], [69.280, 41.311]]
      }
    }
  ]
};

const boundingBox = yarrowMap.getBoundingBox(geojsonData);
console.log(boundingBox);
// ${t('utilityMethods.codeComments.output')}`)

const clearCacheCode = computed(() => `await yarrowMap.clearCache();`)
</script>

<template>
  <div id="utility-methods">
    <div class="container">
      <h2>{{ t('utilityMethods.title') }}</h2>
      <p>
        {{ t('utilityMethods.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('utilityMethods.boundingBox.title') }}</h3>
      <p>
        {{ t('utilityMethods.boundingBox.description') }}
      </p>
    </div>
    <Code
      :code="boundingBoxCode"
      language="typescript"
      filename="bounding-box.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="info-box">
        <h4>{{ t('utilityMethods.boundingBox.supportedTitle') }}</h4>
        <ul>
          <li>{{ t('utilityMethods.boundingBox.point') }}</li>
          <li>{{ t('utilityMethods.boundingBox.lineString') }}</li>
          <li>{{ t('utilityMethods.boundingBox.polygon') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="info-box">
        <h4>{{ t('utilityMethods.boundingBox.containsTitle') }}</h4>
        <ul>
          <li><span>xMin</span>: {{ t('utilityMethods.boundingBox.xMin') }}</li>
          <li><span>xMax</span>: {{ t('utilityMethods.boundingBox.xMax') }}</li>
          <li><span>yMin</span>: {{ t('utilityMethods.boundingBox.yMin') }}</li>
          <li><span>yMax</span>: {{ t('utilityMethods.boundingBox.yMax') }}</li>
        </ul>
      </div>
    </div>

    <div id="clear-local-cache" class="container">
      <h3>{{ t('utilityMethods.clearLocalCache.title') }}</h3>
      <p>{{ t('utilityMethods.clearLocalCache.description') }}</p>
    </div>
    <Code
      :code="clearCacheCode"
      language="typescript"
      filename="clear-cache.ts"
      file-type="TS"
    />
  </div>
</template>

<style scoped>
#utility-methods {
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

    .info-box {
      max-width: 800px;
      margin: 30px auto;
      text-align: left;
      background: var(--bg-secondary);
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 2px 8px var(--shadow-color);
      transition: all 0.3s ease;

      h4 {
        text-align: left;
        margin-bottom: 15px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 10px 0;
          font-size: 16px;
          border-bottom: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.3s ease;

          &:last-child {
            border-bottom: none;
          }

          span {
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
