<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const installCommand = 'npm install @yarrow/yarrow-map-web-sdk'
const buttonText = ref(installCommand)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(installCommand)
    buttonText.value = t('gettingStarted.installation.copied')
    setTimeout(() => {
      buttonText.value = installCommand
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    buttonText.value = t('gettingStarted.installation.copyFailed')
    setTimeout(() => {
      buttonText.value = installCommand
    }, 2000)
  }
}

const setupCode = computed(() => `import { YarrowMap } from '@yarrow/yarrow-map-web-sdk';

// ${t('code.comments.configForMap')}
const mapConfig = {
  container: 'map', // ${t('code.comments.containerComment')}
  center: [69.2401, 41.2995], // ${t('code.comments.centerComment')}
  zoom: 12, // ${t('code.comments.zoomComment')}
};

// ${t('code.comments.createInstance')}
const yarrowMap = new YarrowMap(mapConfig);

// ${t('code.comments.initializeMap')}
yarrowMap.init().then(() => {
  console.log('${t('code.comments.successMessage')}');
});`)

const configOptionsCode = computed(() => `const mapConfig = new YarrowMapConfig(
  container,    // ${t('code.comments.containerParam')}
  center,       // ${t('code.comments.centerParam')}
  zoom,         // ${t('code.comments.zoomParam')}
  minZoom,      // ${t('code.comments.minZoomParam')}
  maxZoom       // ${t('code.comments.maxZoomParam')}
);`)

const fullExampleCode = computed(() => `import { YarrowMap, YarrowMapConfig } from '@yarrow/yarrow-map-web-sdk';

const mapConfig = new YarrowMapConfig(
  'map',                    // ${t('code.comments.containerIdComment')}
  [69.2401, 41.2995],      // ${t('code.comments.centerCoordinatesComment')}
  12,                      // ${t('code.comments.initialZoomComment')}
  5,                       // ${t('code.comments.minimumZoomComment')}
  18                       // ${t('code.comments.maximumZoomComment')}
);

const yarrowMap = new YarrowMap(mapConfig);
yarrowMap.init().then(() => {
  console.log('${t('code.comments.successMessage')}');
});`)
</script>

<template>
  <div id="getting-started">
    <div class="container">
      <h2>{{ t('gettingStarted.title') }}</h2>
    </div>

    <div class="container">
      <h2>{{ t('gettingStarted.installation.title') }}</h2>
      <p>
        {{ t('gettingStarted.installation.description', { sdk: 'Yarrow Map Web SDK' }) }}
      </p>
      <button class="install-button btn-animate" @click="copyToClipboard">
        {{ buttonText }}
      </button>
    </div>

    <div class="container">
      <h2>{{ t('gettingStarted.initialization.title') }}</h2>
      <p>
        {{ t('gettingStarted.initialization.description', { yarrowMap: 'YarrowMap' }) }}
      </p>
    </div>
    <Code
      :code="setupCode"
      language="typescript"
      filename="main.js"
      file-type="JS"
    />

    <div class="container">
      <h2>{{ t('gettingStarted.configuration.title') }}</h2>
      <p>
        {{ t('gettingStarted.configuration.description', { yarrowMapConfig: 'YarrowMapConfig' }) }}
      </p>
    </div>
    <Code
      :code="configOptionsCode"
      language="typescript"
      filename="config.js"
      file-type="JS"
    />

    <div class="container">
      <h3>{{ t('gettingStarted.configuration.exampleTitle') }}</h3>
    </div>
    <Code
      :code="fullExampleCode"
      language="typescript"
      filename="example.js"
      file-type="JS"
    />
  </div>
</template>

<style scoped>
#getting-started {
  padding: 200px 0;

  .container {
    margin-bottom: 80px;

    h2 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
    }

    h3 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: #666;
    }

    p {
      font-weight: 500;
      font-size: 20px;
      text-align: center;
      max-width: 600px;
      margin: 42px auto 52px;

      span {
        color: #fe6d00;
        font-weight: 700;
      }
    }

    button {
      border: none;
      background: linear-gradient(168.78deg, #fe6d00 -33.7%, #ffffff 254.67%);
      color: #fff;
      font-weight: 500;
      font-size: 20px;
      padding: 15px 40px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
