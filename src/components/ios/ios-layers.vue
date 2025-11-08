<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const currentLayerCode = computed(() => `let currentMode = instance.currentLayerMode()
print("Current layer: \\(currentMode)")`)

const setLayerCode = computed(() => `// Switch to satellite view
instance.setLayerMode(mode: .satellite)

// Switch to streets view
instance.setLayerMode(mode: .streets)`)

const scaleIconTypeCode = computed(() => `// Emphasize all restaurant icons
instance.scaleIcon("restaurant")`)

const scaleIconIdCode = computed(() => `// Highlight a specific POI
instance.scaleIcon(12345)`)

const resetScaleCode = computed(() => `instance.resetIconScale()`)

const angledViewCode = computed(() => `// Enable 3D perspective
instance.angeledView(isEnabled: true)

// Return to flat view
instance.angeledView(isEnabled: false)`)

const logLayersCode = computed(() => `instance.logLayers()`)
</script>

<template>
  <div id="ios-layers">
    <div class="container">
      <h2>Layer Management</h2>
      <p>
        Map layers control the visual style of the base map (streets, satellite, terrain, etc.).
      </p>
    </div>

    <div class="container">
      <h3>currentLayerMode()</h3>
      <p>
        Returns the currently active map layer style.
      </p>
      <p class="note">
        <strong>Returns:</strong> <code>LayerMode</code> enum value
      </p>
    </div>
    <Code
      :code="currentLayerCode"
      language="swift"
      filename="CurrentLayer.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>setLayerMode(mode: LayerMode)</h3>
      <p>
        Changes the map's base layer style. This triggers a complete style reload with the new visual theme.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>mode</code>: The <code>LayerMode</code> to activate
      </p>
    </div>
    <Code
      :code="setLayerCode"
      language="swift"
      filename="SetLayer.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h2>Icon Scaling</h2>
      <p>
        These advanced methods allow you to dynamically emphasize specific POI icons on the map based on zoom level.
      </p>
    </div>

    <div class="container">
      <h3>scaleIcon(_ nodeType: String, withText: Bool = false)</h3>
      <p>
        Scales icons matching a specific node type across all zoom levels. This creates a visual hierarchy
        by making certain categories of POIs more prominent.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>nodeType</code>: The type identifier for icons to scale<br>
        <code>withText</code>: Reserved for future text scaling functionality
      </p>
    </div>
    <Code
      :code="scaleIconTypeCode"
      language="swift"
      filename="ScaleIconType.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>scaleIcon(_ nodeId: Int, withText: Bool = false)</h3>
      <p>
        Scales a single icon identified by its unique node ID. Perfect for highlighting a specific selected location.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>nodeId</code>: The unique identifier of the icon to scale<br>
        <code>withText</code>: Reserved for future text scaling functionality
      </p>
    </div>
    <Code
      :code="scaleIconIdCode"
      language="swift"
      filename="ScaleIconId.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>resetIconScale()</h3>
      <p>
        Returns all icon scales to their default values, removing any custom scaling previously applied.
      </p>
    </div>
    <Code
      :code="resetScaleCode"
      language="swift"
      filename="ResetScale.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h2>3D View</h2>
    </div>

    <div class="container">
      <h3>angeledView(isEnabled: Bool)</h3>
      <p>
        Toggles the map's pitch to create a 3D perspective view. When enabled, the map tilts to a 60-degree angle,
        providing a more immersive view of the terrain and buildings.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>isEnabled</code>: Whether to enable the angled (3D) view
      </p>
    </div>
    <Code
      :code="angledViewCode"
      language="swift"
      filename="AngledView.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h2>Debugging</h2>
    </div>

    <div class="container">
      <h3>logLayers()</h3>
      <p>
        Outputs information about all map style layers to the console. This is useful during development to
        understand the layer structure and troubleshoot styling issues.
      </p>
    </div>
    <Code
      :code="logLayersCode"
      language="swift"
      filename="LogLayers.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-layers {
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
