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

const configOptionsCode = computed(() => `const mapConfig = new YarrowMapConfig({
  container,    // ${t('code.comments.containerParam')}
  center,       // [number, number] - [lng, lat]
  zoom,         // ${t('code.comments.zoomParam')}
  minZoom,      // ${t('code.comments.minZoomParam')}
  maxZoom,      // ${t('code.comments.maxZoomParam')}
  theme,        // ${t('code.comments.themeParam')}
  cache,        // { enabled?: boolean, lifespanDays?: number }
  brandBadgePosition, // 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
  controls      // { enabled?: boolean, position?: 'left'|'right', zoom?: boolean, compass?: boolean }
});`)

const fullExampleCode = computed(() => `import { YarrowMap, YarrowMapConfig } from '@yarrow/yarrow-map-web-sdk';

const mapConfig = new YarrowMapConfig({
  container: 'map',                    // ${t('code.comments.containerIdComment')}
  center: [69.2401, 41.2995],         // ${t('code.comments.centerCoordinatesComment')}
  zoom: 12,                           // ${t('code.comments.initialZoomComment')}
  minZoom: 5,                         // ${t('code.comments.minimumZoomComment')}
  maxZoom: 18,                        // ${t('code.comments.maximumZoomComment')}
  theme: 'dark',                      // ${t('code.comments.themeComment')}
  cache: {
    enabled: true,                    // Enable local persistent cache (default: false)
    lifespanDays: 30                  // Cache lifespan in days (default: 30)
  },
  brandBadgePosition: 'top-right',
  controls: {
    enabled: true,                    // Yarrow controls are OFF by default
    position: 'right',
    zoom: true,
    compass: true
  },
});

const yarrowMap = new YarrowMap(mapConfig);
yarrowMap.init().then(() => {
  console.log('${t('code.comments.successMessage')}');
});`)

const reactQuickStartCode = computed(() => `import { YarrowMapView } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  return (
    <YarrowMapView
      config={{
        center: [69.2401, 41.2995],
        zoom: 12,
        brandBadgePosition: 'bottom-left',
      }}
      style={{ width: '100%', height: '600px' }}
    />
  );
};`)

const reactHookCode = computed(() => `import { useYarrowMap } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  const { containerRef, isReady, error } = useYarrowMap({
    config: {
      center: [69.2401, 41.2995],
      zoom: 12,
      brandBadgePosition: 'bottom-right',
    },
  });

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
      {isReady && <p>Map ready</p>}
      {error && <p>Failed to initialize map</p>}
    </div>
  );
};`)

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

    <div id="react-usage" class="container">
      <h2>{{ t('gettingStarted.reactUsage.title') }}</h2>
      <p>{{ t('gettingStarted.reactUsage.intro') }} <span>@yarrow/yarrow-map-web-sdk/react</span>.</p>
      <h3>{{ t('gettingStarted.reactUsage.quickStart') }}</h3>
    </div>
    <Code
      :code="reactQuickStartCode"
      language="tsx"
      filename="react-quick-start.tsx"
      file-type="TSX"
    />

    <div class="container">
      <h3>{{ t('gettingStarted.reactUsage.hookTitle') }}</h3>
      <p>{{ t('gettingStarted.reactUsage.hookDescription') }} <span>useYarrowMap</span>.</p>
    </div>
    <Code
      :code="reactHookCode"
      language="tsx"
      filename="react-use-yarrow-map.tsx"
      file-type="TSX"
    />

    <div class="container">
      <p class="note"><strong>{{ t('gettingStarted.reactUsage.ssrNoteTitle') }}</strong> {{ t('gettingStarted.reactUsage.ssrNoteDescription') }}</p>
    </div>

    <div class="container">
      <h2>{{ t('gettingStarted.initialization.title') }}</h2>
      <p>
        {{ t('gettingStarted.initialization.description', { yarrowMap: 'YarrowMap' }) }}
      </p>
      <p class="note">
        <strong>{{ t('gettingStarted.initialization.importantNote') }}</strong> {{ t('gettingStarted.initialization.coordinateFormat') }}
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
      color: var(--text-primary);
    }

    h3 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: var(--text-muted);
    }

    p {
      font-weight: 500;
      font-size: 20px;
      text-align: center;
      max-width: 600px;
      margin: 42px auto 52px;
      color: var(--text-secondary);

      span {
        color: var(--accent-color);
        font-weight: 700;
      }
    }

    button {
      border: none;
      background: linear-gradient(168.78deg, var(--accent-color) -33.7%, var(--bg-secondary) 254.67%);
      color: #fff;
      font-weight: 500;
      font-size: 20px;
      padding: 15px 40px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      cursor: pointer;
      transition: all 0.3s ease;
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
  }
}
</style>
