<script setup lang="ts">
import { ref } from 'vue'
import Code from './code.vue'

const installCommand = 'npm install @yarrow/yarrow-map-web-sdk'
const buttonText = ref(installCommand)

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(installCommand)
    buttonText.value = 'Copied to clipboard!'
    setTimeout(() => {
      buttonText.value = installCommand
    }, 2000)
  } catch (err) {
    console.error('Failed to copy: ', err)
    buttonText.value = 'Copy failed'
    setTimeout(() => {
      buttonText.value = installCommand
    }, 2000)
  }
}

const setupCode = `import { YarrowMap } from '@yarrow/yarrow-map-web-sdk';

// Configuration for the map
const mapConfig = {
  container: 'map', // ID of the div element to render the map in
  center: [69.2401, 41.2995], // Initial center of the map [longitude, latitude]
  zoom: 12, // Initial zoom level
};

// Create a new map instance
const yarrowMap = new YarrowMap(mapConfig);

// Initialize the map
yarrowMap.init().then(() => {
  console.log('Map initialized successfully!');
});`

const configOptionsCode = `const mapConfig = new YarrowMapConfig(
  container,    // string | HTMLElement - ID of the div element or the element itself
  center,       // [number, number] - Initial center [longitude, latitude]
  zoom,         // number - Initial zoom level (default: 10)
  minZoom,      // number - Minimum zoom level (default: 0)
  maxZoom       // number - Maximum zoom level (default: 19)
);`

const fullExampleCode = `import { YarrowMap, YarrowMapConfig } from '@yarrow/yarrow-map-web-sdk';

const mapConfig = new YarrowMapConfig(
  'map',                    // Container ID
  [69.2401, 41.2995],      // Center coordinates
  12,                      // Initial zoom
  5,                       // Minimum zoom
  18                       // Maximum zoom
);

const yarrowMap = new YarrowMap(mapConfig);
yarrowMap.init().then(() => {
  console.log('Map initialized successfully!');
});`
</script>

<template>
  <div id="getting-started">
    <div class="container">
      <h2>Getting Started</h2>
    </div>

    <div class="container">
      <h2>Installation</h2>
      <p>
        First, add the <span>Yarrow Map Web SDK</span> to your project using
        your preferred package manager.
      </p>
      <button class="install-button btn-animate" @click="copyToClipboard">
        {{ buttonText }}
      </button>
    </div>

    <div class="container">
      <h2>Initialization</h2>
      <p>
        To get started, you need to create an instance of
        <span>YarrowMap</span>. This requires a configuration object that
        specifies the container element, center coordinates, and zoom level.
      </p>
    </div>
    <Code
      :code="setupCode"
      language="typescript"
      filename="main.js"
      file-type="JS"
    />

    <div class="container">
      <h2>Configuration Options</h2>
      <p>
        The <span>YarrowMapConfig</span> class accepts the following parameters:
      </p>
    </div>
    <Code
      :code="configOptionsCode"
      language="typescript"
      filename="config.js"
      file-type="JS"
    />

    <div class="container">
      <h3>Example with all options:</h3>
    </div>
    <Code
      :code="fullExampleCode"
      language="typescript"
      filename="example.js"
      file-type="JS"
    />
  </div>
</template>

<style scoped>
#getting-started {
  padding: 200px 0;

  .container {
    margin-bottom: 80px;

    h2 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
    }

    h3 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: #666;
    }

    p {
      font-weight: 500;
      font-size: 20px;
      text-align: center;
      max-width: 600px;
      margin: 42px auto 52px;

      span {
        color: #fe6d00;
        font-weight: 700;
      }
    }

    button {
      border: none;
      background: linear-gradient(168.78deg, #fe6d00 -33.7%, #ffffff 254.67%);
      color: #fff;
      font-weight: 500;
      font-size: 20px;
      padding: 15px 40px;
      border-radius: 20px;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
  }
}
</style>
