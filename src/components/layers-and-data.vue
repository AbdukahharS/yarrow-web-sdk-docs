<script setup lang="ts">
import Code from './code.vue'

const addLayerCode = `const myData = {
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
  'my-custom-layer', // A unique name for the layer
  'circle', // The type of layer (e.g., 'circle', 'line', 'fill', 'symbol')
  myData,
  {
    'circle-radius': 10,
    'circle-color': '#ff0000',
  }
);`

const advancedLayerCode = `yarrowMap.addLayer(
  layerName,        // string - Unique identifier for the layer
  layerType,        // Layer type: 'symbol', 'fill', 'line', 'background', 'raster', 'circle', 'heatmap', 'fill-extrusion', 'hillshade'
  featureCollection, // GeoJSON FeatureCollection
  paint,            // Paint properties object
  layout,           // Layout properties object
  iconSettings      // Icon configuration (width, height)
);`

const symbolLayerCode = `const symbolData = {
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
    'icon-image-data': 'data:image/png;base64,...', // Base64 image data
    'icon-size': 0.8,
    'icon-allow-overlap': true,
    'text-field': ['get', 'name'],
    'text-offset': [0, 1.5],
    'text-anchor': 'top',
    'text-size': 14
  },
  {
    width: 32,  // Icon width
    height: 32  // Icon height
  }
);`

const lineLayerCode = `const lineData = {
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
);`

const markersCode = `// Add a simple red marker (default color)
const marker = yarrowMap.addMarker([41.3111, 69.2797]); // [latitude, longitude]

// Add a marker with all options
const customMarker = yarrowMap.addMarker([41.2995, 69.2401], {
  element: customElement,     // HTMLElement - Custom marker element
  color: '#0000ff',          // string - Marker color (default: '#FF0000')
  draggable: true,           // boolean - Allow dragging (default: false)
  offset: [0, -10],          // [number, number] - Pixel offset
  anchor: 'bottom',          // Anchor position: 'center', 'top', 'bottom', 'left', 'right', etc.
  onClick: () => {           // function - Click event handler
    console.log('Marker clicked!');
  }
});

// Add a marker with custom HTML element
const customElement = document.createElement('div');
customElement.innerHTML = '📍';
customElement.style.fontSize = '24px';

const htmlMarker = yarrowMap.addMarker([41.3050, 69.2500], {
  element: customElement,
  anchor: 'center'
});

// Remove a marker
yarrowMap.removeMarker(marker);`

const removeLayerCode = `yarrowMap.removeLayer('my-custom-layer');`
</script>

<template>
  <div id="layers-and-data">
    <div class="container">
      <h2>Working with Layers and Data</h2>
      <p>
        Learn how to add custom data, markers, and layers to your map.
      </p>
    </div>

    <div class="container">
      <h3>Adding a GeoJSON Layer</h3>
      <p>
        You can add custom data to the map in the form of a <span>GeoJSON layer</span>. This is useful for displaying points, lines, or polygons.
      </p>
    </div>
    <Code
      :code="addLayerCode"
      language="typescript"
      filename="geojson-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Advanced Layer Configuration</h3>
      <p>
        The <span>addLayer</span> method supports advanced configuration options for different layer types:
      </p>
    </div>
    <Code
      :code="advancedLayerCode"
      language="typescript"
      filename="advanced-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>Symbol layer with custom icons:</h4>
    </div>
    <Code
      :code="symbolLayerCode"
      language="typescript"
      filename="symbol-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>Line layer with styling:</h4>
    </div>
    <Code
      :code="lineLayerCode"
      language="typescript"
      filename="line-layer.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Adding and Removing Markers</h3>
      <p>
        You can add markers to the map to indicate specific locations.
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
        <h4>Marker Options:</h4>
        <ul>
          <li><span>element</span>: Custom HTML element for the marker</li>
          <li><span>color</span>: Marker color (default: '#FF0000')</li>
          <li><span>draggable</span>: Whether the marker can be dragged (default: false)</li>
          <li><span>offset</span>: Pixel offset from the marker position</li>
          <li><span>anchor</span>: Anchor point of the marker relative to its coordinates</li>
          <li><span>onClick</span>: Click event handler function</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <h3>Removing a Layer</h3>
      <p>
        You can remove a layer that you've previously added.
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