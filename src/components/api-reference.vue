<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const configClassCode = computed(() => `constructor(
  config: {
    container: string | HTMLElement;
    center: [number, number];
    zoom?: number;           // default: 10
    minZoom?: number;        // default: 0
    maxZoom?: number;        // default: 19
    theme?: 'light' | 'dark'; // default: 'light'
    cache?: {
      enabled?: boolean;      // default: false
      lifespanDays?: number;  // default: 30 (1 month)
    };
    brandBadgePosition?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    controls?: {
      enabled?: boolean;      // default: false
      position?: 'left' | 'right';
      zoom?: boolean;         // default: true
      compass?: boolean;      // default: true
    };
  }
)`)

const typeDefinitionsCode = computed(() => `interface BoundingBox {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

interface RouteResult {
  features: any[];
  directions: any[];
}

interface MarkerOptions {
  element?: HTMLElement;
  color?: string;
  draggable?: boolean;
  anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClick?: () => void;
}

interface SearchOptions {
  layerName?: string;
  iconImage?: string;
  highlightColor?: string;
  pulseAnimation?: boolean;
  zoomToResults?: boolean;
  onIconClick?: (lat: number, lng: number, properties: any) => void;
  onResultsUpdate?: (results: any[]) => void;
  onLoadingStateChange?: (state: 'firstRender' | 'rerender' | false) => void;
}`)

const methods = computed(() => [
  { method: 'init()', params: 'None', type: 'Promise<void>', desc: t('apiReference.methods.init') },
  { method: "changeStyles(styleType?)", params: "styleType?: 'satellite' | 'hybrid'", type: 'Promise<any>', desc: t('apiReference.methods.changeStyles') },
  { method: "changeTheme(theme)", params: "theme: 'light' | 'dark'", type: 'Promise<any>', desc: t('apiReference.methods.changeTheme') },
  { method: 'zoomTo(lat, lng, zoom)', params: 'lat: number, lng: number, zoom: number', type: 'void', desc: t('apiReference.methods.zoomTo') },
  { method: 'fitBounds(data)', params: 'data: GeoJSON', type: 'void', desc: t('apiReference.methods.fitBounds') },
  { method: 'getBoundingBox(data)', params: 'data: GeoJSON', type: 'BoundingBox', desc: t('apiReference.methods.getBoundingBox') },
  { method: 'onMoveEnd(callback)', params: 'callback: (lat, lng, zoom) => void', type: 'void', desc: t('apiReference.methods.onMoveEnd') },
  { method: 'onMapClick(callback)', params: 'callback: (lat, lng) => void', type: 'void', desc: t('apiReference.methods.onMapClick') },
  { method: 'onIconClick(layerGroup, callback)', params: "layerGroup: 'pois' | 'buildings', callback: Function", type: 'void', desc: t('apiReference.methods.onIconClick') },
  { method: 'onLayerClick(layerGroup, callback)', params: "layerGroup: 'pois' | 'buildings', callback: Function", type: 'void', desc: t('apiReference.methods.onLayerClick') },
  { method: 'changeBackgroundColor(color)', params: 'color: string', type: 'void', desc: t('apiReference.methods.changeBackgroundColor') },
  { method: 'addLayer()', params: 'layerName, layerType, featureCollection, paint?, layout?, iconSettings?', type: 'void', desc: t('apiReference.methods.addLayer') },
  { method: 'removeLayer(layerName)', params: 'layerName: string', type: 'void', desc: t('apiReference.methods.removeLayer') },
  { method: 'addMarker(coordinates, options?)', params: 'coordinates: [lat, lng], options?: MarkerOptions', type: 'Marker | null', desc: t('apiReference.methods.addMarker') },
  { method: 'removeMarker(marker)', params: 'marker: Marker', type: 'void', desc: t('apiReference.methods.removeMarker') },
  { method: 'renderRoutes(routes, baseLayerName?)', params: 'routes: Feature[], baseLayerName?: string', type: 'void', desc: t('apiReference.methods.renderRoutes') },
  { method: 'buildRouteWithLabels()', params: 'start: [lat, lng], end: [lat, lng], profile: string', type: 'Promise<RouteResult>', desc: t('apiReference.methods.buildRouteWithLabels') },
  { method: 'buildMultiSegmentRouteWithLabels()', params: 'coordinates: [lat, lng][], profile: string, language?: string', type: 'Promise<RouteResult>', desc: t('apiReference.methods.buildMultiSegmentRouteWithLabels') },
  { method: 'clearAllRoutes()', params: 'None', type: 'void', desc: t('apiReference.methods.clearAllRoutes') },
  { method: 'clearCache()', params: 'None', type: 'Promise<void>', desc: t('apiReference.methods.clearCache') },
  { method: 'highlightSearchResults()', params: 'query: string, options?: SearchOptions', type: '() => void', desc: t('apiReference.methods.highlightSearchResults') },
  { method: 'showBusRoute(routeId?)', params: 'routeId?: string', type: 'Promise<() => void>', desc: t('apiReference.methods.showBusRoute') }
])
</script>

<template>
  <div>
    <div id="api-reference" class="container">
      <h2>{{ t('apiReference.title') }}</h2>
    </div>

    <div class="container">
      <h3>{{ t('apiReference.configClassTitle') }}</h3>
    </div>
    <Code
      :code="configClassCode"
      language="typescript"
      filename="yarrow-map-config.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('apiReference.methodsTitle') }}</h3>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>{{ t('apiReference.table.method') }}</th>
              <th>{{ t('apiReference.table.parameters') }}</th>
              <th>{{ t('apiReference.table.returnType') }}</th>
              <th>{{ t('apiReference.table.description') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="method in methods" :key="method.method">
              <td><code>{{ method.method }}</code></td>
              <td><code>{{ method.params }}</code></td>
              <td><code>{{ method.type }}</code></td>
              <td>{{ method.desc }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="container">
      <h3>{{ t('apiReference.typeDefinitionsTitle') }}</h3>
    </div>
    <Code
      :code="typeDefinitionsCode"
      language="typescript"
      filename="types.ts"
      file-type="TS"
    />

    <div id="version-information" class="container">
      <h2>{{ t('apiReference.versionInfo.title') }}</h2>
      <ul>
        <li><strong>{{ t('apiReference.versionInfo.currentVersion') }}</strong> 1.0.39</li>
        <li><strong>{{ t('apiReference.versionInfo.dependencies') }}</strong> maplibre-gl ^5.5.0, axios ^1.7.9</li>
        <li><strong>{{ t('apiReference.versionInfo.repository') }}</strong> https://git.yarrow.uz/yarrow-sdk/frontend/yarrow-map-web-sdk</li>
      </ul>
    </div>

    <div id="support" class="container">
      <h2>{{ t('apiReference.support.title') }}</h2>
      <p>{{ t('apiReference.support.description') }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin: 50px auto;
}

h2 {
  font-weight: 600;
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-primary);
}

h3 {
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  margin-bottom: 20px;
  color: var(--text-primary);
}

p {
  font-weight: 500;
  font-size: 18px;
  text-align: center;
  max-width: 900px;
  margin: 20px auto;
  color: var(--text-secondary);
}

ul {
  max-width: 900px;
  margin: 20px auto;
  color: var(--text-secondary);
  line-height: 1.7;
}

.table-wrap {
  overflow-x: auto;
  max-width: 1000px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-secondary);
}

th,
td {
  border: 1px solid var(--border-color);
  padding: 12px;
  text-align: left;
  vertical-align: top;
  color: var(--text-secondary);
}

th {
  color: var(--text-primary);
}
</style>
