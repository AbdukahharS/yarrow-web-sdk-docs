<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const initCode = computed(() => `YarrowMap(lang: "en") { instance in
    // Use the instance here
    instance.zoomIn()
}`)
</script>

<template>
  <div id="ios-initialization">
    <div class="container">
      <h2>Initialization</h2>
      <p>
        The <code>YarrowInstance</code> is initialized internally by the SDK when the map becomes ready.
        You'll receive an instance through the callback provided in the <code>YarrowMap</code> initializer:
      </p>
    </div>
    <Code
      :code="initCode"
      language="swift"
      filename="Initialization.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-initialization {
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
