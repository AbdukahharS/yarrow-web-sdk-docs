<script setup lang="ts">
import Code from './code.vue'

const simpleRouteCode = `const start = [41.2995, 69.2401]; // [latitude, longitude]
const end = [41.3111, 69.2797];
const profile = 'car'; // 'car', 'bicycle', or 'pedestrian'

yarrowMap.buildRouteWithLabels(start, end, profile).then(({ features, directions }) => {
  console.log('Route built:', features);
  console.log('Directions:', directions);
});`

const multiStopRouteCode = `const coordinates = [
  [41.2995, 69.2401], // Start
  [41.3111, 69.2797], // Waypoint 1
  [41.325, 69.285],   // End
];
const profile = 'car';

yarrowMap.buildMultiSegmentRouteWithLabels(coordinates, profile).then(({ features, directions }) => {
  console.log('Multi-segment route built:', features);
  console.log('Directions:', directions);
});`

const clearRoutesCode = `yarrowMap.clearAllRoutes();`

const multipleRoutesCode = `// Array of route features (GeoJSON LineString features)
const routes = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[69.240, 41.299], [69.280, 41.311], [69.285, 41.315]]
    },
    properties: {
      duration: 15.5,
      distance: 2500
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[69.240, 41.299], [69.275, 41.308], [69.285, 41.315]]
    },
    properties: {
      duration: 18.2,
      distance: 3000
    }
  }
];

// Render routes with default styling
yarrowMap.renderRoutes(routes);

// Render routes with custom base layer name
yarrowMap.renderRoutes(routes, 'my-custom-routes');`
</script>

<template>
  <div id="routing">
    <div class="container">
      <h2>Routing</h2>
      <p>
        The SDK provides powerful routing capabilities for different transportation modes.
      </p>
    </div>

    <div class="container">
      <h3>Building and Displaying a Simple Route</h3>
      <p>
        Calculate and display a route between a start and end point.
      </p>
    </div>
    <Code
      :code="simpleRouteCode"
      language="typescript"
      filename="simple-route.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Building and Displaying a Multi-Stop Route</h3>
      <p>
        You can also create a route that passes through <span>multiple waypoints</span>.
      </p>
    </div>
    <Code
      :code="multiStopRouteCode"
      language="typescript"
      filename="multi-stop-route.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Clearing Routes</h3>
      <p>
        To remove all route-related layers from the map:
      </p>
    </div>
    <Code
      :code="clearRoutesCode"
      language="typescript"
      filename="clear-routes.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Rendering Multiple Routes</h3>
      <p>
        You can render multiple route features with automatic color coding:
      </p>
    </div>
    <Code
      :code="multipleRoutesCode"
      language="typescript"
      filename="multiple-routes.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="features-info">
        <h4>Features:</h4>
        <ul>
          <li>Automatically assigns different colors to each route (#3b82f6, #10b981, #f59e0b, #ef4444, #8b5cf6)</li>
          <li>Creates separate layers for each route (${baseLayerName}-0, ${baseLayerName}-1, etc.)</li>
          <li>Default base layer name is 'route' if not specified</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#routing {
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

    .features-info {
      max-width: 800px;
      margin: 0 auto;
      text-align: left;

      h4 {
        text-align: center;
        margin-bottom: 20px;
      }

      ul {
        list-style: disc;
        padding-left: 20px;

        li {
          padding: 8px 0;
          font-size: 16px;
          line-height: 1.5;

          code, span {
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