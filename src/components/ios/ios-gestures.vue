<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const tapGestureCode = computed(() => `instance.addOnTapGesture { coordinate in
    print("Map tapped at: \\(coordinate.latitude), \\(coordinate.longitude)")
}`)

const pointTapCode = computed(() => `instance.addOnPointTapGesture { coordinate, properties in
    if let properties = properties {
        print("Tapped on: \\(properties.name ?? "Unknown")")
    }
}`)

const routeTapCode = computed(() => `instance.addOnRouteTapGesture { coordinate, feature in
    if let feature = feature {
        print("Route tapped at: \\(coordinate)")
    }
}`)

const buildingTapCode = computed(() => `instance.addOnBuildingTapGesture { coordinate, feature in
    if let feature = feature {
        print("Building selected")
    }
}`)
</script>

<template>
  <div id="ios-gestures">
    <div class="container">
      <h2>Gesture Handling</h2>
      <p>
        The gesture system allows you to respond to user interactions with different types of map features.
      </p>
    </div>

    <div class="container">
      <h3>addOnTapGesture(action:)</h3>
      <p>
        Registers a callback for general map taps that don't hit any specific features.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>action</code>: Closure called with the tapped coordinate
      </p>
    </div>
    <Code
      :code="tapGestureCode"
      language="swift"
      filename="TapGesture.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>addOnPointTapGesture(action:)</h3>
      <p>
        Handles taps on point features like markers or POIs. The callback receives both the coordinate
        and parsed properties of the tapped feature.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>action</code>: Closure called with coordinate and optional <code>PointProperties</code>
      </p>
    </div>
    <Code
      :code="pointTapCode"
      language="swift"
      filename="PointTap.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>addOnRouteTapGesture(action:)</h3>
      <p>
        Responds to taps on route lines, enabling interactive route selection or information display.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>action</code>: Closure called with coordinate and optional <code>MLNPolylineFeature</code>
      </p>
    </div>
    <Code
      :code="routeTapCode"
      language="swift"
      filename="RouteTap.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>addOnBuildingTapGesture(action:)</h3>
      <p>
        Handles taps on building polygons, useful for displaying building information or selection.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>action</code>: Closure called with coordinate and optional <code>MLNPolygonFeature</code>
      </p>
    </div>
    <Code
      :code="buildingTapCode"
      language="swift"
      filename="BuildingTap.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-gestures {
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
