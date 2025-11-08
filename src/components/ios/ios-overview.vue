<script setup lang="ts">
</script>

<template>
  <div id="ios-overview">
    <div class="container">
      <h2>Overview</h2>
      <p>
        The <code>YarrowInstance</code> class serves as the primary interface for interacting with the Yarrow Map SDK.
        It provides a comprehensive set of tools for managing map interactions, including markers, routes, camera controls,
        and user location tracking.
      </p>
      <p>
        This class acts as a bridge between your application and the underlying map view controller,
        offering an intuitive API for common mapping operations.
      </p>
    </div>
  </div>
</template>

<style scoped>
#ios-overview {
  padding: 100px 0;

  .container {
    max-width: 800px;
    margin: 0 auto;

    h2 {
      font-weight: 600;
      font-size: 28px;
      text-align: center;
      color: var(--text-primary);
      margin-bottom: 30px;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      color: var(--text-secondary);
      margin-bottom: 20px;
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
