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
  maxZoom,      // ${t('code.comments.maxZoomParam')}
  theme,        // ${t('code.comments.themeParam')}
  cache         // { enabled?: boolean, lifespanDays?: number } - Local persistent cache config (default: { enabled: false, lifespanDays: 30 })
);`)

const fullExampleCode = computed(() => `import { YarrowMap, YarrowMapConfig } from '@yarrow/yarrow-map-web-sdk';

const mapConfig = new YarrowMapConfig(
  'map',                    // ${t('code.comments.containerIdComment')}
  [69.2401, 41.2995],      // ${t('code.comments.centerCoordinatesComment')}
  12,                      // ${t('code.comments.initialZoomComment')}
  5,                       // ${t('code.comments.minimumZoomComment')}
  18,                      // ${t('code.comments.maximumZoomComment')}
  'dark',                  // ${t('code.comments.themeComment')}
  {
    enabled: true,         // Enable local persistent cache (default: false)
    lifespanDays: 30       // Cache lifespan in days (default: 30)
  }
);

const yarrowMap = new YarrowMap(mapConfig);
yarrowMap.init().then(() => {
  console.log('${t('code.comments.successMessage')}');
});`)

const reactQuickStartCode = computed(() => `import { YarrowMapView } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  return (
    <YarrowMapView
      config={{
        center: [69.2401, 41.2995], // [lng, lat]
        zoom: 12,
        theme: 'light',
        cache: { enabled: true, lifespanDays: 30 },
      }}
      className="map-root"
      style={{ width: '100%', height: '600px' }}
    />
  );
};`)

const reactOnReadyCode = computed(() => `import { YarrowMapView } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  return (
    <YarrowMapView
      config={{ center: [69.2401, 41.2995], zoom: 12 }}
      onReady={(map) => {
        map.changeStyles('hybrid');
        map.onMapClick((lat, lng) => {
          console.log('Clicked:', lat, lng);
        });
      }}
      style={{ width: '100%', height: '600px' }}
    />
  );
};`)

const reactHookCode = computed(() => `import { useEffect } from 'react';
import { useYarrowMap } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  const { containerRef, map, isReady, error } = useYarrowMap({
    config: {
      center: [69.2401, 41.2995], // [lng, lat]
      zoom: 12,
      theme: 'dark',
      cache: { enabled: true, lifespanDays: 14 },
    },
  });

  useEffect(() => {
    if (!map) return;
    map.onMoveEnd((lat, lng, zoom) => {
      console.log('Map moved:', { lat, lng, zoom });
    });
  }, [map]);

  if (error) return <p>Failed to initialize map: {error.message}</p>;

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
      {!isReady && <p>Loading map...</p>}
    </div>
  );
};`)

const reactConfigKeyCode = computed(() => `const { containerRef } = useYarrowMap({
  config: {
    center: [69.2401, 41.2995],
    zoom: 12,
  },
  configKey: \`city-\${cityId}\`, // map will reinitialize when cityId changes
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
      <h3>{{ t('gettingStarted.reactUsage.onReadyTitle') }}</h3>
      <p>{{ t('gettingStarted.reactUsage.onReadyDescription') }} <span>onReady</span>.</p>
    </div>
    <Code
      :code="reactOnReadyCode"
      language="tsx"
      filename="react-on-ready.tsx"
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
      <h3>{{ t('gettingStarted.reactUsage.configKeyTitle') }}</h3>
      <p>{{ t('gettingStarted.reactUsage.configKeyDescription') }} <span>configKey</span>.</p>
    </div>
    <Code
      :code="reactConfigKeyCode"
      language="tsx"
      filename="react-config-key.tsx"
      file-type="TSX"
    />

    <div class="container">
      <p class="note"><strong>{{ t('gettingStarted.reactUsage.ssrNoteTitle') }}</strong> {{ t('gettingStarted.reactUsage.ssrNoteDescription') }} (<span>window</span>/<span>document</span> {{ t('gettingStarted.reactUsage.requiredText') }}).</p>
      <p class="note"><strong>{{ t('gettingStarted.reactUsage.controlsNoteTitle') }}</strong> {{ t('gettingStarted.reactUsage.controlsNoteDescription') }} <span>addControl()</span> {{ t('gettingStarted.reactUsage.ifNeededText') }}</p>
    </div>
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
