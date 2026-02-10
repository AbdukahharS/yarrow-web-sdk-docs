<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const changeStylesCode = computed(() => `// ${t('basicMap.codeComments.switchSatellite')}
yarrowMap.changeStyles('satellite');

// ${t('basicMap.codeComments.switchHybrid')}
yarrowMap.changeStyles('hybrid');

// ${t('basicMap.codeComments.switchDefault')}
yarrowMap.changeStyles();`)

const initialThemeCode = computed(() => `// ${t('basicMap.codeComments.initializeDarkTheme')}
const mapConfig = new YarrowMapConfig(
  'map',
  [69.2401, 41.2995],
  12,
  5,
  18,
  'dark'  // ${t('basicMap.codeComments.setInitialTheme')}
);`)

const switchThemeCode = computed(() => `// ${t('basicMap.codeComments.switchDarkMode')}
await yarrowMap.changeTheme('dark');

// ${t('basicMap.codeComments.switchLightMode')}
await yarrowMap.changeTheme('light');`)

const zoomToCode = computed(() => `// ${t('basicMap.codeComments.flyToLocation')}
yarrowMap.zoomTo(41.3111, 69.2797, 15); // ${t('basicMap.codeComments.latLngZoomLevel')}`)

const fitBoundsCode = computed(() => `const geojsonData = {
  type: 'FeatureCollection',
  features: [
    // ${t('basicMap.codeComments.yourGeoJSONFeatures')}
  ],
};

yarrowMap.fitBounds(geojsonData);`)

const backgroundColorCode = computed(() => `// ${t('basicMap.codeComments.changeBackground')}
yarrowMap.changeBackgroundColor('#f0f0f0'); // ${t('basicMap.codeComments.lightGrayBackground')}`)
</script>

<template>
  <div id="basic-map">
    <div class="container">
      <h2>{{ t('basicMap.title') }}</h2>
      <p>
        {{ t('basicMap.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('basicMap.changeMapStyle.title') }}</h3>
      <p>
        {{ t('basicMap.changeMapStyle.description', { satellite: 'satellite', hybrid: 'hybrid' }) }}
      </p>
      <p>{{ t('basicMap.changeMapStyle.pitchNote') }} <span>85-degree pitch</span> {{ t('basicMap.changeMapStyle.pitchNoteSuffix') }}</p>
    </div>
    <Code
      :code="changeStylesCode"
      language="typescript"
      filename="map-styles.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('basicMap.changeTheme.title') }}</h3>
      <p>
        {{ t('basicMap.changeTheme.description') }}
      </p>
      <h4>{{ t('basicMap.changeTheme.settingInitialTheme') }}</h4>
    </div>
    <Code
      :code="initialThemeCode"
      language="typescript"
      filename="initial-theme.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('basicMap.changeTheme.switchingDynamically') }}</h4>
    </div>
    <Code
      :code="switchThemeCode"
      language="typescript"
      filename="switch-theme.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="feature-box">
        <h4>{{ t('basicMap.changeTheme.featuresTitle') }}</h4>
        <ul>
          <li>{{ t('basicMap.changeTheme.autoRefetch') }}</li>
          <li>{{ t('basicMap.changeTheme.updateLayers') }}</li>
          <li>{{ t('basicMap.changeTheme.preserveIcons') }}</li>
          <li>{{ t('basicMap.changeTheme.seamlessTransition') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <h3>{{ t('basicMap.moveMapView.title') }}</h3>
      <p>
        {{ t('basicMap.moveMapView.description') }}
      </p>
      <h4>{{ t('basicMap.moveMapView.zoomToPoint') }}</h4>
    </div>
    <Code
      :code="zoomToCode"
      language="typescript"
      filename="zoom-to.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('basicMap.moveMapView.fitToFeatures') }}</h4>
      <p>
        {{ t('basicMap.moveMapView.fitDescription') }}
      </p>
    </div>
    <Code
      :code="fitBoundsCode"
      language="typescript"
      filename="fit-bounds.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('basicMap.backgroundColor.title') }}</h3>
      <p>
        {{ t('basicMap.backgroundColor.description') }}
      </p>
    </div>
    <Code
      :code="backgroundColorCode"
      language="javascript"
      filename="background.js"
      file-type="JS"
    />

    <div class="container">
      <p class="note">
        <strong>{{ t('basicMap.note.title') }}</strong> {{ t('basicMap.note.description') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
#basic-map {
  padding: 200px 0;

  .container {
    margin: 50px auto;

    h2 {
      font-weight: 600;
      font-size: 32px;
      text-align: center;
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
      color: var(--text-primary);
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      margin-bottom: 15px;
      margin-top: 40px;
      color: var(--text-primary);
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 600px;
      margin: 20px auto;
      color: var(--text-secondary);

      span {
        color: var(--accent-color);
        font-weight: 700;
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

    .feature-box {
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
        margin-top: 0;
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
