<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const addRouteCode = computed(() => `let waypoints = [startLocation, endLocation]
instance.addRoute(
    targetLocations: waypoints,
    profile: "driving",
    selectedRouteID: 0,
    otherColor: "#B2A5FF"
) { state, response, selectedFeature in
    switch state {
    case .Positive:
        print("Route successfully calculated")
        print("Distance: \\(selectedFeature?.properties.distance ?? 0) meters")
    case .Negative:
        print("Route calculation failed")
    default:
        break
    }
}`)

const updateRouteCode = computed(() => `instance.updateSelectedRoute(
    route: alternativeRoute,
    otherColor: "#9FB3DF"
)`)

const customRouteCode = computed(() => `instance.addRoute(index: 0, feature: customRouteFeature)`)

const removeRouteCode = computed(() => `// Remove route and all markers
instance.removeRoute()

// Remove only visual elements, keep data
instance.removeRoute(withData: false)`)
</script>

<template>
  <div id="ios-routing">
    <div class="container">
      <h2>Route Management</h2>
      <p>
        The route functionality enables you to display navigation paths between multiple points with support
        for alternative routes and custom styling.
      </p>
    </div>

    <div class="container">
      <h3>addRoute(targetLocations:profile:selectedRouteID:otherColor:callback:)</h3>
      <p>
        Calculates and displays routes between multiple locations. The SDK automatically handles route calculation,
        marker placement at waypoints, and visual representation of alternative paths.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>targetLocations</code>: Array of coordinates representing waypoints (minimum 2 required)<br>
        <code>profile</code>: Routing profile ("driving", "walking", "cycling")<br>
        <code>selectedRouteID</code>: Optional ID to highlight a specific route variant<br>
        <code>otherColor</code>: Optional hex color for alternative routes (default colors will be used if nil)<br>
        <code>callback</code>: Closure called with the routing result<br><br>
        <strong>Callback Parameters:</strong><br>
        <code>state</code>: Current state of the operation (Loading, Positive, Negative)<br>
        <code>response</code>: Complete route response containing all calculated routes<br>
        <code>selectedFeature</code>: The highlighted route feature
      </p>
    </div>
    <Code
      :code="addRouteCode"
      language="swift"
      filename="AddRoute.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>updateSelectedRoute(route:otherColor:)</h3>
      <p>
        Updates the visual representation of routes to highlight a different variant without recalculating.
        This is useful when presenting route alternatives to users.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>route</code>: The <code>RouteFeature</code> to highlight<br>
        <code>otherColor</code>: Optional hex color for non-selected routes
      </p>
    </div>
    <Code
      :code="updateRouteCode"
      language="swift"
      filename="UpdateRoute.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>addRoute&lt;T&gt;(index:feature:)</h3>
      <p>
        Adds a custom route feature to the map with full control over styling. This method is designed for
        advanced use cases where you're managing route data externally.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>index</code>: Layer index for the route<br>
        <code>feature</code>: A <code>RouteFeature</code> conforming to <code>YarrowTypeAlias</code>
      </p>
    </div>
    <Code
      :code="customRouteCode"
      language="swift"
      filename="CustomRoute.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>removeRoute(withData: Bool = true)</h3>
      <p>
        Removes the currently displayed route from the map. Optionally clears all associated data
        including waypoint markers.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>withData</code>: Whether to clear internal route data and waypoint markers (default: true)
      </p>
    </div>
    <Code
      :code="removeRouteCode"
      language="swift"
      filename="RemoveRoute.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-routing {
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
