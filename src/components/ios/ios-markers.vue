<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const addMarkerCode = computed(() => `let marker = CustomMarker(
    id: "restaurant-1",
    image: restaurantIcon,
    coordinates: CLLocationCoordinate2D(latitude: 41.3037, longitude: 69.2479),
    anchor: .center
)
instance.addMarker(marker: marker)`)

const addMarkersCode = computed(() => `let markers = [marker1, marker2, marker3]
instance.addMarkers(markers: markers)`)

const removeMarkerCode = computed(() => `instance.removeMarker(markerId: "restaurant-1")`)
</script>

<template>
  <div id="ios-markers">
    <div class="container">
      <h2>Marker Management</h2>
      <p>
        Markers allow you to highlight specific locations on the map with custom imagery.
        The SDK handles all the complexity of layer and source management for you.
      </p>
    </div>

    <div class="container">
      <h3>addMarker(marker: CustomMarker)</h3>
      <p>
        Places a single custom marker on the map. Each marker requires a unique identifier, an image, and coordinates.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>marker</code>: A <code>CustomMarker</code> object containing the marker's configuration
      </p>
    </div>
    <Code
      :code="addMarkerCode"
      language="swift"
      filename="AddMarker.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>addMarkers(markers: [CustomMarker])</h3>
      <p>
        Efficiently adds multiple markers to the map in a single operation.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>markers</code>: An array of <code>CustomMarker</code> objects
      </p>
    </div>
    <Code
      :code="addMarkersCode"
      language="swift"
      filename="AddMarkers.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>removeMarker(markerId: String)</h3>
      <p>
        Removes a specific marker from the map using its identifier. The SDK automatically cleans up both
        the layer and source associated with the marker.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>markerId</code>: The unique identifier of the marker to remove
      </p>
    </div>
    <Code
      :code="removeMarkerCode"
      language="swift"
      filename="RemoveMarker.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-markers {
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
