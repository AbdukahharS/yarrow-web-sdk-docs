<script setup lang="ts">
import { computed } from 'vue'
import Code from '../code.vue'

const weatherCode = computed(() => `instance.fetchWeather { state, forecast in
    switch state {
    case .Positive:
        if let forecast = forecast {
            print("Temperature: \\(forecast.current.temperature)")
        }
    case .Negative:
        print("Failed to fetch weather")
    default:
        break
    }
}`)
</script>

<template>
  <div id="ios-weather">
    <div class="container">
      <h2>Weather Integration</h2>
    </div>

    <div class="container">
      <h3>fetchWeather(callback:)</h3>
      <p>
        Retrieves weather forecast data for the current map center. The SDK caches weather data to minimize
        unnecessary network requests.
      </p>
      <p class="note">
        <strong>Parameters:</strong><br>
        <code>callback</code>: Closure called with state and optional <code>ForecastResponse</code>
      </p>
    </div>
    <Code
      :code="weatherCode"
      language="swift"
      filename="FetchWeather.swift"
      file-type="SWIFT"
    />
  </div>
</template>

<style scoped>
#ios-weather {
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
