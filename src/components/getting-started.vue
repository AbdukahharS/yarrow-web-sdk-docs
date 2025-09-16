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
</script>

<template>
  <div id="getting-started">
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
        <span>YarrowMap</span>.This requires a configuration object that
        specifies the container element, center coordinates, and zoom level
      </p>
    </div>
    <Code
      :code="setupCode"
      language="typescript"
      filename="APP/page.tsx"
      file-type="TS"
    />
  </div>
</template>

<style scoped>
#getting-started {
  padding: 300px 0;

  .container {
    margin-bottom: 80px;

    h2 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
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
