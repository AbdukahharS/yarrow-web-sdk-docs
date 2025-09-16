<script setup lang="ts">
import Code from './code.vue'

const changeStylesCode = `// Switch to satellite view
yarrowMap.changeStyles('satellite');

// Switch to hybrid view (satellite with labels)
yarrowMap.changeStyles('hybrid');

// Switch back to the default map style
yarrowMap.changeStyles();`

const zoomToCode = `// Fly to a new location with a specific zoom level
yarrowMap.zoomTo(41.3111, 69.2797, 15); // Latitude, Longitude, Zoom Level`

const fitBoundsCode = `const geojsonData = {
  type: 'FeatureCollection',
  features: [
    // Your GeoJSON features here
  ],
};

yarrowMap.fitBounds(geojsonData);`

const backgroundColorCode = `// Change the map background to a custom color
yarrowMap.changeBackgroundColor('#f0f0f0'); // Light gray background`
</script>

<template>
  <div id="basic-map">
    <div class="container">
      <h2>Basic Map Manipulation</h2>
      <p>
        Learn how to control your map's appearance and view programmatically.
      </p>
    </div>

    <div class="container">
      <h3>Changing the Map Style</h3>
      <p>
        You can change the map's visual style. The available styles are <span>satellite</span>, <span>hybrid</span>, and the default map style.
      </p>
    </div>
    <Code
      :code="changeStylesCode"
      language="typescript"
      filename="map-styles.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Moving the Map View</h3>
      <p>
        You can programmatically move the map to a new location or fit it to a specific geographic area.
      </p>
      <h4>Zooming to a specific point:</h4>
    </div>
    <Code
      :code="zoomToCode"
      language="typescript"
      filename="zoom-to.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>Fitting the map to a set of features:</h4>
      <p>
        This is useful when you want to display a set of points, lines, or polygons and ensure they are all visible.
      </p>
    </div>
    <Code
      :code="fitBoundsCode"
      language="typescript"
      filename="fit-bounds.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Changing Background Color</h3>
      <p>
        You can change the background color of the map programmatically:
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
        <strong>Note:</strong> The changeBackgroundColor method waits for the map style
        to be fully loaded before applying the background color change.
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
      margin-bottom: 15px;
      margin-top: 40px;
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

    .note {
      background: #f8f9fa;
      border-left: 4px solid #fe6d00;
      padding: 20px;
      margin: 20px auto;
      border-radius: 5px;
      font-size: 16px;
      text-align: left;
      max-width: 800px;
    }
  }
}
</style>