<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const resetNorthCode = computed(() => `instance.resetNorth()`)

const reloadStyleCode = computed(() => `instance.reloadStyle()`)
</script>

<template>
  <div id="ios-map-settings">
    <div class="container">
      <h2>Map Settings</h2>
    </div>

    <div class="container">
      <h3>resetNorth()</h3>
      <p>
        Resets the map's orientation to point north. This is particularly useful when users have rotated the map
        and need to return to the default orientation.
      </p>
    </div>
    <Code
      :code="resetNorthCode"
      language="swift"
      filename="ResetNorth.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>reloadStyle()</h3>
      <p>
        Forces a reload of the current map style. Use this when you need to refresh the map's appearance
        or apply style changes.
      </p>
    </div>
    <Code
      :code="reloadStyleCode"
      language="swift"
      filename="ReloadStyle.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-map-settings {
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
  }
}
</style>
