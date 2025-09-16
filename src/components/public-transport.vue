<script setup lang="ts">
import Code from './code.vue'

const specificRouteCode = `const routeId = 'some-route-id';
yarrowMap.showBusRoute(routeId).then(clearBusRoute => {
  // To stop showing the bus route later
  // clearBusRoute();
});`

const allBusesCode = `yarrowMap.showBusRoute().then(clearBusRoutes => {
  // To stop showing all bus routes
  // clearBusRoutes();
});`

const clearingBusesCode = `// Store the cleanup function
const clearBuses = await yarrowMap.showBusRoute('route-123');

// Later, clear the bus route display
clearBuses();`
</script>

<template>
  <div id="public-transport">
    <div class="container">
      <h2>Public Transport</h2>
      <p>
        Display real-time public transportation information on your map.
      </p>
    </div>

    <div class="container">
      <h3>Displaying Real-Time Bus Locations</h3>
      <p>
        You can display the <span>real-time locations</span> of buses on the map.
      </p>
      <h4>Show buses for a specific route:</h4>
    </div>
    <Code
      :code="specificRouteCode"
      language="typescript"
      filename="specific-bus-route.ts"
      file-type="TS"
    />

    <div class="container">
      <h4>Show all buses in the current map view:</h4>
      <p>
        If you don't provide a <span>route_id</span>, the map will show all buses within the visible area.
      </p>
    </div>
    <Code
      :code="allBusesCode"
      language="typescript"
      filename="all-buses.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Clearing Bus Routes</h3>
      <p>
        The <span>showBusRoute</span> method returns a cleanup function that you can call to stop displaying bus locations and remove all related data:
      </p>
    </div>
    <Code
      :code="clearingBusesCode"
      language="typescript"
      filename="clear-buses.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="cleanup-info">
        <h4>What the cleanup function does:</h4>
        <ul>
          <li>Stops the automatic bus location updates (15-second interval)</li>
          <li>Removes all bus markers from the map</li>
          <li>Removes all route layers from the map</li>
          <li>Removes map move event listeners</li>
          <li>Clears internal caches (SVG cache, etc.)</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="performance-info">
        <h4>Performance Optimization:</h4>
        <ul>
          <li>Maximum 100 buses displayed at once (randomly selected if more exist)</li>
          <li>5km radius filtering for general bus display (no route_id)</li>
          <li>Automatic viewport filtering for subsequent updates</li>
          <li>SVG icon caching for better performance</li>
          <li>Debounced map movement updates (500ms delay)</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="features-info">
        <h4>Automatic Updates:</h4>
        <ul>
          <li>Bus locations update every 15 seconds</li>
          <li>Map movement triggers bus location refresh (for general display)</li>
          <li>Distance-based filtering (minimum 500m movement)</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#public-transport {
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

    .cleanup-info, .performance-info, .features-info {
      max-width: 800px;
      margin: 0 auto;
      text-align: left;

      h4 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
      }

      ul {
        list-style: disc;
        padding-left: 20px;

        li {
          padding: 8px 0;
          font-size: 16px;
          line-height: 1.5;
        }
      }
    }
  }
}
</style>