<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const geocodingCode = computed(() => `let location = CLLocationCoordinate2D(latitude: 41.3037, longitude: 69.2479)
instance.fetchGeoCoding(target: location) { state, data in
    switch state {
    case .Positive:
        if let data = data {
            print("Address: \\(data.displayName)")
        }
    case .Negative:
        print("Geocoding failed")
    default:
        break
    }
}`)
</script>

<template>
  <div id="ios-geocoding">
    <div class="container">
      <h2>Geocoding</h2>
    </div>

    <div class="container">
      <h3>fetchGeoCoding(target:callback:)</h3>
      <p>
        Converts coordinates into human-readable address information (reverse geocoding).
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>target</code>: The coordinate to reverse geocode<br>
        <code>callback</code>: Closure called with state and optional <code>GeoData</code>
      </p>
    </div>
    <Code
      :code="geocodingCode"
      language="swift"
      filename="Geocoding.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-geocoding {
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
