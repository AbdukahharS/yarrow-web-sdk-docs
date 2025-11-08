<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const showLocationCode = computed(() => `// Show location and animate to it
instance.showUserLocation()

// Show location without moving camera
instance.showUserLocation(animate: false)`)

const getUserLocationCode = computed(() => `instance.getUserLocation(animate: true) { state, coordinate in
    switch state {
    case .Loading:
        print("Getting location...")
    case .Positive:
        if let coordinate = coordinate {
            print("User at: \\(coordinate)")
        }
    case .Negative:
        print("Could not get user location")
    }
}`)

const animateToCurrentCode = computed(() => `instance.animateToCurrentLocation()`)

const lastLocationCode = computed(() => `if let location = instance.lastLocation() {
    print("Last known position: \\(location)")
}`)

const trackUserCode = computed(() => `// Follow user with heading
instance.trackUser(mode: .followWithHeading)

// Simple follow mode
instance.trackUser(mode: .follow)`)

const stopTrackingCode = computed(() => `instance.stopTrackingUser()`)
</script>

<template>
  <div id="ios-user-location">
    <div class="container">
      <h2>User Location</h2>
      <p>
        These methods help you work with the user's current location and create location-aware experiences.
      </p>
    </div>

    <div class="container">
      <h3>showUserLocation(animate: Bool = true)</h3>
      <p>
        Enables the display of the user's location on the map with heading indicators. Optionally animates
        the camera to center on the user's position.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>animate</code>: Whether to animate the camera to the user's location (default: true)
      </p>
    </div>
    <Code
      :code="showLocationCode"
      language="swift"
      filename="ShowUserLocation.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>getUserLocation(animate:action:)</h3>
      <p>
        Retrieves the user's current location asynchronously and optionally centers the camera on it.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>animate</code>: Whether to animate the camera to the location<br>
        <code>action</code>: Closure called with state and optional coordinate
      </p>
    </div>
    <Code
      :code="getUserLocationCode"
      language="swift"
      filename="GetUserLocation.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>animateToCurrentLocation()</h3>
      <p>
        Immediately animates the camera to the user's current location with a street-level zoom (17.0).
      </p>
    </div>
    <Code
      :code="animateToCurrentCode"
      language="swift"
      filename="AnimateToCurrentLocation.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>lastLocation()</h3>
      <p>
        Returns the most recently known user location without triggering any updates or animations.
      </p>
      <p class="note">
        <strong>Returns:</strong> Optional <code>CLLocationCoordinate2D</code>
      </p>
    </div>
    <Code
      :code="lastLocationCode"
      language="swift"
      filename="LastLocation.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>trackUser(mode: MLNUserTrackingMode)</h3>
      <p>
        Enables continuous user tracking with a specified mode. The camera will automatically follow
        the user's movements.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>mode</code>: The tracking mode to use (<code>none</code>, <code>follow</code>,
        <code>followWithHeading</code>, <code>followWithCourse</code>)
      </p>
    </div>
    <Code
      :code="trackUserCode"
      language="swift"
      filename="TrackUser.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>stopTrackingUser()</h3>
      <p>
        Disables user tracking, allowing free camera movement again.
      </p>
    </div>
    <Code
      :code="stopTrackingCode"
      language="swift"
      filename="StopTracking.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-user-location {
  padding: 100px 0;

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

      strong {
        color: var(--text-primary);
      }

      code {
        background: var(--bg-glass);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: 'Fira Code', monospace;
        color: var(--accent-color);
      }
    }
  }
}
</style>
