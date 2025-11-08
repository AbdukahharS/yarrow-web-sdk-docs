<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const customIconsCode = computed(() => `// ${t('advancedFeatures.codeComments.iconsAutomatic')}
yarrowMap.init().then(() => {
  // ${t('advancedFeatures.codeComments.useServerIcons')}
  yarrowMap.addLayer(
    'poi-layer',
    'symbol',
    poiData,
    {},
    {
      'icon-image': ['get', 'icon_img'], // ${t('advancedFeatures.codeComments.referencesIcon')}
      'icon-size': 0.7
    }
  );
});`)

const customIconDataCode = computed(() => `yarrowMap.addLayer(
  'custom-icons',
  'symbol',
  symbolData,
  {},
  {
    'icon-image': 'my-custom-icon',
    'icon-image-data': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    'icon-size': 1.0
  },
  {
    width: 48,
    height: 48
  }
);`)

const cleanupCode = computed(() => `const clearSearch = yarrowMap.highlightSearchResults('query');
const clearBuses = await yarrowMap.showBusRoute();

// ${t('advancedFeatures.codeComments.whenDoneCleanup')}
clearSearch();
clearBuses();`)

const reuseLayerCode = computed(() => `// ${t('advancedFeatures.codeComments.autoCleanupPrevious')}
yarrowMap.addLayer('dynamic-layer', 'circle', newData, paint);`)

const meaningfulNamesCode = computed(() => `// ${t('advancedFeatures.codeComments.goodDescriptive')}
yarrowMap.addLayer('user-locations-2024', 'symbol', userData);

// ${t('advancedFeatures.codeComments.avoidGeneric')}
yarrowMap.addLayer('layer1', 'symbol', userData);`)

const errorHandlingCode = computed(() => `try {
  await yarrowMap.buildRouteWithLabels(start, end, 'car');
} catch (error) {
  console.error('${t('advancedFeatures.codeComments.routeFailed')}', error);
  // ${t('advancedFeatures.codeComments.handleError')}
}`)
</script>

<template>
  <div id="advanced-features">
    <div class="container">
      <h2>{{ t('advancedFeatures.title') }}</h2>
      <p>
        {{ t('advancedFeatures.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('advancedFeatures.customIcons.title') }}</h3>
      <h4>{{ t('advancedFeatures.customIcons.loadingTitle') }}</h4>
      <p>
        {{ t('advancedFeatures.customIcons.loadingDescription') }}
      </p>
    </div>
    <Code
      :code="customIconsCode"
      language="typescript"
      filename="custom-icons.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('advancedFeatures.customIcons.customDataTitle') }}</h4>
      <p>
        {{ t('advancedFeatures.customIcons.customDataDescription') }}
      </p>
    </div>
    <Code
      :code="customIconDataCode"
      language="typescript"
      filename="custom-icon-data.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('advancedFeatures.performance.title') }}</h3>

      <div class="info-box">
        <h4>{{ t('advancedFeatures.performance.layerManagement.title') }}</h4>
        <ul>
          <li>{{ t('advancedFeatures.performance.layerManagement.autoCleanup') }}</li>
          <li>{{ t('advancedFeatures.performance.layerManagement.sourceRemoval') }}</li>
          <li>{{ t('advancedFeatures.performance.layerManagement.iconCache') }}</li>
        </ul>
      </div>

      <div class="info-box">
        <h4>{{ t('advancedFeatures.performance.busOptimization.title') }}</h4>
        <ul>
          <li>{{ t('advancedFeatures.performance.busOptimization.maxBusLimit') }}</li>
          <li>{{ t('advancedFeatures.performance.busOptimization.viewportFiltering') }}</li>
          <li>{{ t('advancedFeatures.performance.busOptimization.svgCaching') }}</li>
          <li>{{ t('advancedFeatures.performance.busOptimization.debouncedUpdates') }}</li>
        </ul>
      </div>

      <div class="info-box">
        <h4>{{ t('advancedFeatures.performance.memoryManagement.title') }}</h4>
        <ul>
          <li>{{ t('advancedFeatures.performance.memoryManagement.autoCleanup') }}</li>
          <li>{{ t('advancedFeatures.performance.memoryManagement.cacheClearing') }}</li>
          <li>{{ t('advancedFeatures.performance.memoryManagement.markerRemoval') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <h3>{{ t('advancedFeatures.bestPractices.title') }}</h3>

      <h4>{{ t('advancedFeatures.bestPractices.cleanupTitle') }}</h4>
    </div>
    <Code
      :code="cleanupCode"
      language="typescript"
      filename="cleanup.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('advancedFeatures.bestPractices.reuseLayerTitle') }}</h4>
    </div>
    <Code
      :code="reuseLayerCode"
      language="typescript"
      filename="reuse-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('advancedFeatures.bestPractices.meaningfulNamesTitle') }}</h4>
    </div>
    <Code
      :code="meaningfulNamesCode"
      language="typescript"
      filename="meaningful-names.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('advancedFeatures.bestPractices.errorHandlingTitle') }}</h4>
    </div>
    <Code
      :code="errorHandlingCode"
      language="typescript"
      filename="error-handling.ts"
      file-type="TS"
    />
  </div>
</template>

<style scoped>
#advanced-features {
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
      margin-bottom: 30px;
      margin-top: 60px;
      color: var(--text-primary);
      transition: all 0.3s ease;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: var(--text-secondary);
      margin: 30px 0 20px;
      transition: all 0.3s ease;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 700px;
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
      max-width: 900px;
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
        margin-top: 0;
        color: var(--text-primary);
      }

      ul {
        list-style: disc;
        padding-left: 20px;
        margin: 0;

        li {
          padding: 8px 0;
          font-size: 16px;
          color: var(--text-secondary);
          transition: all 0.3s ease;
          line-height: 1.6;
        }
      }
    }
  }
}
</style>
