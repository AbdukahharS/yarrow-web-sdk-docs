<script setup lang="ts">
import Code from './code.vue'

const moveEndCode = `yarrowMap.onMoveEnd((lat, lng, zoom) => {
  console.log(\`Map moved to: \${lat}, \${lng} with zoom: \${zoom}\`);
});`

const mapClickCode = `yarrowMap.onMapClick((lat, lng) => {
  console.log(\`Map clicked at: \${lat}, \${lng}\`);
});`

const iconClickCode = `// Listen for clicks on POIs
yarrowMap.onIconClick('pois', (lat, lng, properties) => {
  console.log('POI clicked:', properties);
});

// Listen for clicks on buildings
yarrowMap.onIconClick('buildings', (lat, lng, properties) => {
  console.log('Building clicked:', properties);
});`
</script>

<template>
  <div id="handling-events">
    <div class="container">
      <h2>Handling Events</h2>
      <p>
        You can listen for various user interactions with the map.
      </p>
    </div>

    <div class="container">
      <h3>Listen for Map Movement</h3>
      <p>
        Execute a callback function whenever the map finishes moving.
      </p>
    </div>
    <Code
      :code="moveEndCode"
      language="typescript"
      filename="map-movement.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Listen for Map Clicks</h3>
      <p>
        Execute a callback when the user clicks on the map.
      </p>
    </div>
    <Code
      :code="mapClickCode"
      language="typescript"
      filename="map-clicks.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Listen for Clicks on POIs or Buildings</h3>
      <p>
        You can add click listeners to specific groups of features on the map, like <span>points of interest (POIs)</span> or <span>buildings</span>.
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
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
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
  }
}
</style>