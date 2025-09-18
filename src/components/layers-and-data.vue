<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const addLayerCode = computed(() => `const myData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [69.2797, 41.3111],
      },
      properties: {
        name: 'My Point',
      },
    },
  ],
};

yarrowMap.addLayer(
  'my-custom-layer', // ${t('layersAndData.codeComments.uniqueLayerName')}
  'circle', // ${t('layersAndData.codeComments.layerType')}
  myData,
  {
    'circle-radius': 10,
    'circle-color': '#ff0000',
  }
);`)

const advancedLayerCode = computed(() => `yarrowMap.addLayer(
  layerName,        // string - ${t('layersAndData.codeComments.uniqueIdentifier')}
  layerType,        // ${t('layersAndData.codeComments.layerTypeOptions')}
  featureCollection, // ${t('layersAndData.codeComments.geoJsonFeatureCollection')}
  paint,            // ${t('layersAndData.codeComments.paintProperties')}
  layout,           // ${t('layersAndData.codeComments.layoutProperties')}
  iconSettings      // ${t('layersAndData.codeComments.iconConfiguration')}
);`)

const symbolLayerCode = computed(() => `const symbolData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [69.2797, 41.3111] },
      properties: { name: 'Custom Point' }
    }
  ]
};

yarrowMap.addLayer(
  'custom-symbols',
  'symbol',
  symbolData,
  {
    'text-halo-color': '#ffffff',
    'text-halo-width': 2
  },
  {
    'icon-image': 'custom-icon',
    'icon-image-data': 'data:image/png;base64,...', // ${t('layersAndData.codeComments.base64ImageData')}
    'icon-size': 0.8,
    'icon-allow-overlap': true,
    'text-field': ['get', 'name'],
    'text-offset': [0, 1.5],
    'text-anchor': 'top',
    'text-size': 14
  },
  {
    width: 32,  // ${t('layersAndData.codeComments.iconWidth')}
    height: 32  // ${t('layersAndData.codeComments.iconHeight')}
  }
);`)

const lineLayerCode = computed(() => `const lineData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[69.240, 41.299], [69.280, 41.311]]
      }
    }
  ]
};

yarrowMap.addLayer(
  'custom-line',
  'line',
  lineData,
  {
    'line-color': '#3b82f6',
    'line-width': 4,
    'line-opacity': 0.8
  },
  {
    'line-join': 'round',
    'line-cap': 'round'
  }
);`)

const markersCode = computed(() => `// ${t('layersAndData.codeComments.addRedMarker')}
const marker = yarrowMap.addMarker([41.3111, 69.2797]); // [latitude, longitude]

// ${t('layersAndData.codeComments.addMarkerOptions')}
const customMarker = yarrowMap.addMarker([41.2995, 69.2401], {
  element: customElement,     // ${t('layersAndData.codeComments.customMarkerElement')}
  color: '#0000ff',          // ${t('layersAndData.codeComments.markerColor')}
  draggable: true,           // ${t('layersAndData.codeComments.allowDragging')}
  offset: [0, -10],          // ${t('layersAndData.codeComments.pixelOffset')}
  anchor: 'bottom',          // ${t('layersAndData.codeComments.anchorPosition')}
  onClick: () => {           // ${t('layersAndData.codeComments.clickEventHandler')}
    console.log('${t('layersAndData.codeComments.markerClicked')}');
  }
});

// ${t('layersAndData.codeComments.addCustomHTML')}
const customElement = document.createElement('div');
customElement.innerHTML = '📍';
customElement.style.fontSize = '24px';

const htmlMarker = yarrowMap.addMarker([41.3050, 69.2500], {
  element: customElement,
  anchor: 'center'
});

// ${t('layersAndData.codeComments.removeMarker')}
yarrowMap.removeMarker(marker);`)

const removeLayerCode = computed(() => `yarrowMap.removeLayer('my-custom-layer');`)
</script>

<template>
  <div id="layers-and-data">
    <div class="container">
      <h2>{{ t('layersAndData.title') }}</h2>
      <p>
        {{ t('layersAndData.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('layersAndData.addGeoJSON.title') }}</h3>
      <p>
        {{ t('layersAndData.addGeoJSON.description', { geoJsonLayer: 'GeoJSON layer' }) }}
      </p>
    </div>
    <Code
      :code="addLayerCode"
      language="typescript"
      filename="geojson-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('layersAndData.advancedConfig.title') }}</h3>
      <p>
        {{ t('layersAndData.advancedConfig.description', { addLayer: 'addLayer' }) }}
      </p>
    </div>
    <Code
      :code="advancedLayerCode"
      language="typescript"
      filename="advanced-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('layersAndData.advancedConfig.symbolLayerTitle') }}</h4>
    </div>
    <Code
      :code="symbolLayerCode"
      language="typescript"
      filename="symbol-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>{{ t('layersAndData.advancedConfig.lineLayerTitle') }}</h4>
    </div>
    <Code
      :code="lineLayerCode"
      language="typescript"
      filename="line-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('layersAndData.markers.title') }}</h3>
      <p>
        {{ t('layersAndData.markers.description') }}
      </p>
    </div>
    <Code
      :code="markersCode"
      language="typescript"
      filename="markers.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="marker-options">
        <h4>{{ t('layersAndData.markers.optionsTitle') }}</h4>
        <ul>
          <li><span>element</span>: {{ t('layersAndData.markers.element') }}</li>
          <li><span>color</span>: {{ t('layersAndData.markers.color') }}</li>
          <li><span>draggable</span>: {{ t('layersAndData.markers.draggable') }}</li>
          <li><span>offset</span>: {{ t('layersAndData.markers.offset') }}</li>
          <li><span>anchor</span>: {{ t('layersAndData.markers.anchor') }}</li>
          <li><span>onClick</span>: {{ t('layersAndData.markers.onClick') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <h3>{{ t('layersAndData.removeLayer.title') }}</h3>
      <p>
        {{ t('layersAndData.removeLayer.description') }}
      </p>
    </div>
    <Code
      :code="removeLayerCode"
      language="typescript"
      filename="remove-layer.ts"
      file-type="TS"
    />
  </div>
</template>

<style scoped>
#layers-and-data {
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
      color: #555;
      margin: 20px 0;
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

    .marker-options {
      max-width: 800px;
      margin: 0 auto;
      text-align: left;

      h4 {
        text-align: center;
        margin-bottom: 20px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 8px 0;
          font-size: 16px;
          border-bottom: 1px solid #eee;

          span {
            color: #fe6d00;
            font-weight: 700;
            font-family: monospace;
          }
        }
      }
    }
  }
}
</style>