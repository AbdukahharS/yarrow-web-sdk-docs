<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const zoomInCode = computed(() => `instance.zoomIn()`)

const zoomOutCode = computed(() => `instance.zoomOut()`)

const setZoomLevelCode = computed(() => `// Set to street-level detail
instance.setZoomLevel(16.0)`)
</script>

<template>
  <div id="ios-zoom-controls">
    <div class="container">
      <h2>Zoom Controls</h2>
      <p>
        The SDK provides fine-grained control over the map's zoom level, allowing you to create smooth
        navigation experiences.
      </p>
    </div>

    <div class="container">
      <h3>zoomIn()</h3>
      <p>
        Increases the zoom level by one step with animation. The map smoothly transitions to show more detail.
      </p>
    </div>
    <Code
      :code="zoomInCode"
      language="swift"
      filename="ZoomIn.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>zoomOut()</h3>
      <p>
        Decreases the zoom level by one step with animation, revealing a wider area of the map.
      </p>
    </div>
    <Code
      :code="zoomOutCode"
      language="swift"
      filename="ZoomOut.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>setZoomLevel(_ zoom: Double)</h3>
      <p>
        Sets the map to a specific zoom level. Zoom levels typically range from 4 (minimum) to 19 (maximum),
        with higher values showing more detail.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>zoom</code>: The desired zoom level (4.0 to 19.0)
      </p>
    </div>
    <Code
      :code="setZoomLevelCode"
      language="swift"
      filename="SetZoomLevel.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-zoom-controls {
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
