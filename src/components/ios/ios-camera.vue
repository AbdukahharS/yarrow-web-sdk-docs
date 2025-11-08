<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const animateCameraCode = computed(() => `let tashkent = CLLocationCoordinate2D(latitude: 41.3037, longitude: 69.2479)
instance.animateCamera(target: tashkent, zoom: 14.0)`)

const cameraListenerCode = computed(() => `instance.addOnCameraChangeListener { coordinate in
    print("Camera moved to: \\(coordinate.latitude), \\(coordinate.longitude)")
}`)
</script>

<template>
  <div id="ios-camera">
    <div class="container">
      <h2>Camera Control</h2>
      <p>
        Camera methods provide smooth, animated transitions to different map views.
      </p>
    </div>

    <div class="container">
      <h3>animateCamera(target:zoom:)</h3>
      <p>
        Smoothly animates the camera to focus on a specific location with a defined zoom level.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>target</code>: The coordinate to center on<br>
        <code>zoom</code>: The zoom level to use
      </p>
    </div>
    <Code
      :code="animateCameraCode"
      language="swift"
      filename="AnimateCamera.swift"
      file-type="SWIFT"
    />

    <div class="container">
      <h3>addOnCameraChangeListener(action:)</h3>
      <p>
        Registers a callback that fires whenever the map's camera position changes, whether from user
        interaction or programmatic control.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>action</code>: Closure called with the new center coordinate
      </p>
    </div>
    <Code
      :code="cameraListenerCode"
      language="swift"
      filename="CameraListener.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-camera {
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
