<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const completeExampleCode = computed(() => `YarrowMap(lang: "en") { instance in
    // Setup user location
    instance.showUserLocation()

    // Add tap gesture handler
    instance.addOnPointTapGesture { coordinate, properties in
        if let properties = properties {
            // Show POI details
            showPOIDetails(properties)
        }
    }

    // Add camera change listener
    instance.addOnCameraChangeListener { coordinate in
        updateLocationInfo(coordinate)
    }

    // Calculate and display a route
    let waypoints = [startPoint, endPoint]
    instance.addRoute(
        targetLocations: waypoints,
        profile: "driving"
    ) { state, response, feature in
        if state == .Positive, let feature = feature {
            let distance = feature.properties.distance
            let duration = feature.properties.duration
            showRouteInfo(distance: distance, duration: duration)
        }
    }

    // Fetch weather for current location
    instance.fetchWeather { state, forecast in
        if state == .Positive, let forecast = forecast {
            updateWeatherUI(forecast)
        }
    }
}`)
</script>

<template>
  <div id="ios-best-practices">
    <div class="container">
      <h2>Best Practices</h2>
    </div>

    <div class="container">
      <h3>Memory Management</h3>
      <p>
        The <code>YarrowInstance</code> is decorated with <code>@MainActor</code>, ensuring all operations
        occur on the main thread. This prevents common concurrency issues when updating UI elements.
      </p>
    </div>

    <div class="container">
      <h3>Coordinate Systems</h3>
      <p>
        All coordinates use the standard <code>CLLocationCoordinate2D</code> format with latitude and
        longitude in decimal degrees.
      </p>
    </div>

    <div class="container">
      <h3>Error Handling</h3>
      <p>
        Many methods use a callback pattern with a <code>ViewModelState</code> enum:
      </p>
      <ul>
        <li><code>.Loading</code>: Operation in progress</li>
        <li><code>.Positive</code>: Operation succeeded</li>
        <li><code>.Negative</code>: Operation failed</li>
      </ul>
      <p>
        Always handle all cases to provide a robust user experience.
      </p>
    </div>

    <div class="container">
      <h3>Route Colors</h3>
      <p>
        The SDK provides default colors for alternative routes: <code>#C68EFD</code>, <code>#9FB3DF</code>,
        and <code>#B2A5FF</code>, with the selected route highlighted in <code>#FE6D00</code> (orange).
        You can override these with custom hex colors.
      </p>
    </div>

    <div class="container">
      <h3>Performance Considerations</h3>
      <ul>
        <li>Remove markers and routes when they're no longer needed to maintain optimal performance</li>
        <li>The weather and geocoding data are cached automatically</li>
        <li>Icon scaling operations modify map style directly and should be used judiciously</li>
      </ul>
    </div>

    <div class="container">
      <h2>Complete Integration Example</h2>
      <p>
        Here's a comprehensive example showing how to integrate multiple features:
      </p>
    </div>
    <Code
      :code="completeExampleCode"
      language="swift"
      filename="CompleteExample.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>Thread Safety</h3>
      <p>
        All <code>YarrowInstance</code> methods must be called from the main thread due to the
        <code>@MainActor</code> annotation. The SDK handles this automatically for callbacks,
        ensuring UI updates are safe.
      </p>
    </div>

    <div class="container">
      <h3>Logging</h3>
      <p>
        The SDK uses Apple's unified logging system (<code>os_log</code>) for debugging. All log messages
        are prefixed with "Yarrow-SDK | Instance:" for easy filtering in Console.app or Xcode's debug console.
      </p>
    </div>

    <div class="container footer-info">
      <p>
        <strong>Last Updated:</strong> November 2025<br>
        <strong>Version:</strong> Compatible with Yarrow SDK 1.x
      </p>
    </div>
  </div>
</template>

<style scoped>
#ios-best-practices {
  padding: 100px 0 200px;

  .container {
    margin-bottom: 60px;

    h2 {
      font-weight: 600;
      font-size: 28px;
      text-align: center;
      color: var(--text-primary);
      margin-bottom: 20px;
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      color: var(--text-primary);
      margin-bottom: 15px;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 800px;
      margin: 20px auto;
      color: var(--text-secondary);
      line-height: 1.6;

      code {
        background: var(--bg-secondary);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        color: var(--accent-color);
      }
    }

    ul {
      max-width: 800px;
      margin: 20px auto;
      text-align: left;
      color: var(--text-secondary);
      font-size: 18px;
      line-height: 1.8;

      li {
        margin-bottom: 10px;

        code {
          background: var(--bg-secondary);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: 'Fira Code', monospace;
          color: var(--accent-color);
        }
      }
    }
  }

  .footer-info {
    margin-top: 80px;
    padding-top: 40px;
    border-top: 2px solid var(--border-color);

    p {
      font-size: 16px;
      color: var(--text-muted);

      strong {
        color: var(--text-primary);
      }
    }
  }
}
</style>
