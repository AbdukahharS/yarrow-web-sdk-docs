# Yarrow Map Web SDK Documentation

This document provides a comprehensive guide to using the Yarrow Map Web SDK for embedding and interacting with Yarrow maps in your web application.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Initialization](#initialization)
  - [Configuration Options](#configuration-options)
  - [React Usage](#react-usage)
- [Basic Map Manipulation](#basic-map-manipulation)
  - [Changing the Map Style](#changing-the-map-style)
  - [Changing the Map Theme](#changing-the-map-theme)
  - [Moving the Map View](#moving-the-map-view)
  - [Changing Background Color](#changing-background-color)
- [Handling Events](#handling-events)
  - [Listen for Map Movement](#listen-for-map-movement)
  - [Listen for Map Clicks](#listen-for-map-clicks)
  - [Listen for Clicks on POIs or Buildings](#listen-for-clicks-on-pois-or-buildings)
- [Working with Layers and Data](#working-with-layers-and-data)
  - [Adding a GeoJSON Layer](#adding-a-geojson-layer)
  - [Advanced Layer Configuration](#advanced-layer-configuration)
  - [Adding and Removing Markers](#adding-and-removing-markers)
  - [Removing a Layer](#removing-a-layer)
- [Routing](#routing)
  - [Building and Displaying a Simple Route](#building-and-displaying-a-simple-route)
  - [Building and Displaying a Multi-Stop Route](#building-and-displaying-a-multi-stop-route)
  - [Clearing Routes](#clearing-routes)
  - [Rendering Multiple Routes](#rendering-multiple-routes)
- [Search](#search)
  - [Highlighting Search Results](#highlighting-search-results)
  - [Advanced Search Configuration](#advanced-search-configuration)
- [Public Transport](#public-transport)
  - [Displaying Real-Time Bus Locations](#displaying-real-time-bus-locations)
  - [Clearing Bus Routes](#clearing-bus-routes)
- [Utility Methods](#utility-methods)
  - [Calculating Bounding Box](#calculating-bounding-box)
- [Advanced Features](#advanced-features)
  - [Custom Icons and Styling](#custom-icons-and-styling)
  - [Performance Optimization](#performance-optimization)

---

## Getting Started

### Installation

First, add the Yarrow Map Web SDK to your project using your preferred package manager.

```bash
npm install @yarrow/yarrow-map-web-sdk
```

### Initialization

To get started, you need to create an instance of `YarrowMap`. This requires a configuration object that specifies the container element, center coordinates, and zoom level.

**Important - Coordinate Format**: This SDK uses `[longitude, latitude]` format for map configuration (matching MapLibre GL convention), but `[latitude, longitude]` format for all other methods like routing and markers (matching common usage).

```javascript
import { YarrowMap } from '@yarrow/yarrow-map-web-sdk';

// Configuration for the map
const mapConfig = {
  container: 'map', // ID of the div element to render the map in
  center: [69.2401, 41.2995], // Initial center [longitude, latitude] - MapLibre convention
  zoom: 12, // Initial zoom level
};

// Create a new map instance
const yarrowMap = new YarrowMap(mapConfig);

// Initialize the map
yarrowMap.init().then(() => {
  console.log('Map initialized successfully!');
});
```

**Note:** By default, all MapLibre controls (zoom, navigation, attribution) are automatically removed during initialization. Use MapLibre's `addControl()` method if you need to add specific controls.

### Configuration Options

The `YarrowMapConfig` class accepts the following parameters:

```javascript
const mapConfig = new YarrowMapConfig(
  container,    // string | HTMLElement - ID of the div element or the element itself
  center,       // [number, number] - Initial center [longitude, latitude] - MapLibre convention
  zoom,         // number - Initial zoom level (default: 10)
  minZoom,      // number - Minimum zoom level (default: 0)
  maxZoom,      // number - Maximum zoom level (default: 19)
  theme,        // 'light' | 'dark' - Map theme (default: 'light')
  cache         // { enabled?: boolean, lifespanDays?: number } - Local persistent cache config (default: { enabled: false, lifespanDays: 30 })
);
```

**Example with all options:**

```javascript
import { YarrowMap, YarrowMapConfig } from '@yarrow/yarrow-map-web-sdk';

const mapConfig = new YarrowMapConfig(
  'map',                    // Container ID
  [69.2401, 41.2995],      // Center coordinates
  12,                      // Initial zoom
  5,                       // Minimum zoom
  18,                      // Maximum zoom
  'dark',                  // Theme (optional, default: 'light')
  {
    enabled: true,         // Enable local persistent cache (default: false)
    lifespanDays: 30       // Cache lifespan in days (default: 30)
  }
);

const yarrowMap = new YarrowMap(mapConfig);
yarrowMap.init().then(() => {
  console.log('Map initialized successfully!');
});
```

### React Usage

React APIs are exported from the `@yarrow/yarrow-map-web-sdk/react` subpath.

**1. Quick start with `YarrowMapView`**

```tsx
import { YarrowMapView } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  return (
    <YarrowMapView
      config={{
        center: [69.2401, 41.2995], // [lng, lat]
        zoom: 12,
        theme: 'light',
        cache: { enabled: true, lifespanDays: 30 },
      }}
      className="map-root"
      style={{ width: '100%', height: '600px' }}
    />
  );
};
```

**2. Access map instance with `onReady`**

Use `onReady` when you want to run imperative map logic (add layers, subscribe to events, routes, search) after initialization.

```tsx
import { YarrowMapView } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  return (
    <YarrowMapView
      config={{ center: [69.2401, 41.2995], zoom: 12 }}
      onReady={(map) => {
        map.changeStyles('hybrid');
        map.onMapClick((lat, lng) => {
          console.log('Clicked:', lat, lng);
        });
      }}
      style={{ width: '100%', height: '600px' }}
    />
  );
};
```

**3. Advanced composition with `useYarrowMap`**

Use the hook when you need loading/error state, direct access to the map instance, or custom UI around the map container.

```tsx
import { useEffect } from 'react';
import { useYarrowMap } from '@yarrow/yarrow-map-web-sdk/react';

export const MapScreen = () => {
  const { containerRef, map, isReady, error } = useYarrowMap({
    config: {
      center: [69.2401, 41.2995], // [lng, lat]
      zoom: 12,
      theme: 'dark',
      cache: { enabled: true, lifespanDays: 14 },
    },
  });

  useEffect(() => {
    if (!map) return;
    map.onMoveEnd((lat, lng, zoom) => {
      console.log('Map moved:', { lat, lng, zoom });
    });
  }, [map]);

  if (error) return <p>Failed to initialize map: {error.message}</p>;

  return (
    <div>
      <div ref={containerRef} style={{ width: '100%', height: '600px' }} />
      {!isReady && <p>Loading map...</p>}
    </div>
  );
};
```

**4. Re-initialize map intentionally with `configKey`**

`useYarrowMap` re-creates the map when config signature changes. You can explicitly control this behavior with `configKey`.

```tsx
const { containerRef } = useYarrowMap({
  config: {
    center: [69.2401, 41.2995],
    zoom: 12,
  },
  configKey: `city-${cityId}`, // map will reinitialize when cityId changes
});
```

**SSR note:** The React integration initializes only in browser environments (`window`/`document` required).

## Basic Map Manipulation

### Changing the Map Style

You can change the map's visual style. The available styles are `satellite`, `hybrid`, and the default map style.

The map supports up to **85-degree pitch** for 3D perspective views.

```javascript
// Switch to satellite view
yarrowMap.changeStyles('satellite');

// Switch to hybrid view (satellite with labels)
yarrowMap.changeStyles('hybrid');

// Switch back to the default map style
yarrowMap.changeStyles();
```

### Changing the Map Theme

You can set the initial theme in the configuration or switch between light and dark themes dynamically after initialization.

**Setting initial theme:**

```javascript
// Initialize with dark theme
const mapConfig = new YarrowMapConfig(
  'map',
  [69.2401, 41.2995],
  12,
  5,
  18,
  'dark'  // Set initial theme to dark
);
```

**Switching theme dynamically:**

```javascript
// Switch to dark mode
await yarrowMap.changeTheme('dark');

// Switch to light mode (default)
await yarrowMap.changeTheme('light');
```

**Features:**
- Automatically re-fetches appropriate styles from the server
- Updates all map layers to match the theme
- Preserves custom icons and markers
- Seamless theme transition

### Moving the Map View

You can programmatically move the map to a new location or fit it to a specific geographic area.

**Zooming to a specific point:**

```javascript
// Fly to a new location with a specific zoom level
yarrowMap.zoomTo(41.3111, 69.2797, 15); // Latitude, Longitude, Zoom Level
```

**Fitting the map to a set of features:**

This is useful when you want to display a set of points, lines, or polygons and ensure they are all visible.

```javascript
const geojsonData = {
  type: 'FeatureCollection',
  features: [
    // Your GeoJSON features here
  ],
};

yarrowMap.fitBounds(geojsonData);
```

### Changing Background Color

You can change the background color of the map programmatically:

```javascript
// Change the map background to a custom color
yarrowMap.changeBackgroundColor('#f0f0f0'); // Light gray background
```

**Note:** This method waits for the map style to be fully loaded before applying the background color change.

## Handling Events

You can listen for various user interactions with the map.

### Listen for Map Movement

Execute a callback function whenever the map finishes moving.

```javascript
yarrowMap.onMoveEnd((lat, lng, zoom) => {
  console.log(`Map moved to: ${lat}, ${lng} with zoom: ${zoom}`);
});
```

### Listen for Map Clicks

Execute a callback when the user clicks on the map.

```javascript
yarrowMap.onMapClick((lat, lng) => {
  console.log(`Map clicked at: ${lat}, ${lng}`);
});
```

### Listen for Clicks on POIs or Buildings

You can add click listeners to specific groups of features on the map, like points of interest (POIs) or buildings.

```javascript
// Listen for clicks on POIs
yarrowMap.onIconClick('pois', (lat, lng, properties) => {
  console.log('POI clicked:', properties);
});

// Listen for clicks on buildings
yarrowMap.onIconClick('buildings', (lat, lng, properties) => {
  console.log('Building clicked:', properties);
});

// Note: onLayerClick is an alias for onIconClick (they are the same method)
yarrowMap.onLayerClick('pois', (lat, lng, properties) => {
  console.log('Same as onIconClick');
});
```

## Working with Layers and Data

### Adding a GeoJSON Layer

You can add custom data to the map in the form of a GeoJSON layer. This is useful for displaying points, lines, or polygons.

```javascript
const myData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [69.2797, 41.3111],
      },
      properties: {
        name: 'My Point',
      },
    },
  ],
};

yarrowMap.addLayer(
  'my-custom-layer', // A unique name for the layer
  'circle', // The type of layer (e.g., 'circle', 'line', 'fill', 'symbol')
  myData,
  {
    'circle-radius': 10,
    'circle-color': '#ff0000',
  }
);
```

### Advanced Layer Configuration

The `addLayer` method supports advanced configuration options for different layer types:

```javascript
yarrowMap.addLayer(
  layerName,        // string - Unique identifier for the layer
  layerType,        // Layer type: 'symbol', 'fill', 'line', 'background', 'raster', 'circle', 'heatmap', 'fill-extrusion', 'hillshade'
  featureCollection, // GeoJSON FeatureCollection
  paint,            // Paint properties object
  layout,           // Layout properties object
  iconSettings      // Icon configuration (width, height)
);
```

**Symbol layer with custom icons:**

```javascript
const symbolData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [69.2797, 41.3111] },
      properties: { name: 'Custom Point' }
    }
  ]
};

yarrowMap.addLayer(
  'custom-symbols',
  'symbol',
  symbolData,
  {
    'text-halo-color': '#ffffff',
    'text-halo-width': 2
  },
  {
    'icon-image': 'custom-icon',
    'icon-image-data': 'data:image/png;base64,...', // Base64 image data
    'icon-size': 0.8,
    'icon-allow-overlap': true,
    'text-field': ['get', 'name'],
    'text-offset': [0, 1.5],
    'text-anchor': 'top',
    'text-size': 14
  },
  {
    width: 32,  // Icon width
    height: 32  // Icon height
  }
);
```

**Line layer with styling:**

```javascript
const lineData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[69.240, 41.299], [69.280, 41.311]]
      }
    }
  ]
};

yarrowMap.addLayer(
  'custom-line',
  'line',
  lineData,
  {
    'line-color': '#3b82f6',
    'line-width': 4,
    'line-opacity': 0.8
  },
  {
    'line-join': 'round',
    'line-cap': 'round'
  }
);
```

### Adding and Removing Markers

You can add markers to the map to indicate specific locations.

```javascript
// Add a simple red marker (default color)
const marker = yarrowMap.addMarker([41.3111, 69.2797]); // [latitude, longitude]

// Add a marker with all options
const customMarker = yarrowMap.addMarker([41.2995, 69.2401], {
  element: customElement,     // HTMLElement - Custom marker element
  color: '#0000ff',          // string - Marker color (default: '#FF0000')
  draggable: true,           // boolean - Allow dragging (default: false)
  anchor: 'bottom',          // Anchor position: 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
  onClick: () => {           // function - Click event handler
    console.log('Marker clicked!');
  }
});

// Add a marker with custom HTML element
const customElement = document.createElement('div');
customElement.innerHTML = '📍';
customElement.style.fontSize = '24px';

const htmlMarker = yarrowMap.addMarker([41.3050, 69.2500], {
  element: customElement,
  anchor: 'center'
});

// Remove a marker
yarrowMap.removeMarker(marker);
```

**Marker Options:**
- `element`: Custom HTML element for the marker
- `color`: Marker color (default: '#FF0000')
- `draggable`: Whether the marker can be dragged (default: false)
- `anchor`: Anchor point of the marker relative to its coordinates
- `onClick`: Click event handler function

### Removing a Layer

You can remove a layer that you've previously added.

```javascript
yarrowMap.removeLayer('my-custom-layer');
```

## Routing

The SDK provides powerful routing capabilities.

### Building and Displaying a Simple Route

Calculate and display a route between a start and end point.

```javascript
const start = [41.2995, 69.2401]; // [latitude, longitude]
const end = [41.3111, 69.2797];
const profile = 'car'; // 'car', 'bicycle', or 'pedestrian'

yarrowMap.buildRouteWithLabels(start, end, profile).then(({ features, directions }) => {
  console.log('Route built:', features);
  console.log('Directions:', directions);
});
```

### Building and Displaying a Multi-Stop Route

You can also create a route that passes through multiple waypoints.

```javascript
const coordinates = [
  [41.2995, 69.2401], // Start [latitude, longitude]
  [41.3111, 69.2797], // Waypoint 1
  [41.325, 69.285],   // End
];
const profile = 'car';
const language = 'en'; // Optional: 'en', 'ru', etc. (default: 'ru')

yarrowMap.buildMultiSegmentRouteWithLabels(coordinates, profile, language).then(({ features, directions }) => {
  console.log('Multi-segment route built:', features);
  console.log('Directions:', directions);
});
```

**Important Note**: The SDK uses `[latitude, longitude]` format for all user-facing coordinate parameters (routing, markers, etc.), which is then internally converted to MapLibre's `[longitude, latitude]` format where needed.

### Clearing Routes

To remove all route-related layers from the map:

```javascript
yarrowMap.clearAllRoutes();
```

### Rendering Multiple Routes

You can render multiple route features with automatic color coding:

```javascript
// Array of route features (GeoJSON LineString features)
const routes = [
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[69.240, 41.299], [69.280, 41.311], [69.285, 41.315]]
    },
    properties: {
      duration: 15.5,
      distance: 2500
    }
  },
  {
    type: 'Feature',
    geometry: {
      type: 'LineString',
      coordinates: [[69.240, 41.299], [69.275, 41.308], [69.285, 41.315]]
    },
    properties: {
      duration: 18.2,
      distance: 3000
    }
  }
];

// Render routes with default styling
yarrowMap.renderRoutes(routes);

// Render routes with custom base layer name
yarrowMap.renderRoutes(routes, 'my-custom-routes');
```

**Features:**
- Automatically assigns different colors to each route (#3b82f6, #10b981, #f59e0b, #ef4444, #8b5cf6)
- Creates separate layers for each route (`{baseLayerName}-0`, `{baseLayerName}-1`, etc.)
- Default base layer name is 'route' if not specified

## Search

### Highlighting Search Results

You can perform a search and display the results on the map. The search is performed around the current map center.

```javascript
const query = 'Tashkent';

const clearHighlights = yarrowMap.highlightSearchResults(query, {
  zoomToResults: true, // Automatically zoom to fit the results
  onResultsUpdate: (results) => {
    console.log('Search results:', results);
  },
  onLoadingStateChange: (state) => {
    // state can be 'firstRender', 'rerender', or false
    console.log('Loading state:', state);
  }
});

// To remove the search results from the map later
// clearHighlights();
```

### Advanced Search Configuration

The `highlightSearchResults` method accepts comprehensive configuration options:

```javascript
const clearFunction = yarrowMap.highlightSearchResults('Tashkent', {
  layerName: 'my-search-layer',           // Custom layer name (default: 'search-results')
  iconImage: 'custom-search-icon',        // Custom icon image name
  highlightColor: '#ff6b35',              // Custom highlight color
  pulseAnimation: true,                   // Enable pulse animation (default: false)
  zoomToResults: false,                   // Auto-zoom to results (default: true)

  // Event handlers
  onIconClick: (lat, lng, properties) => {
    console.log('Search result clicked:', { lat, lng, properties });
    // Custom click behavior
  },

  onResultsUpdate: (results) => {
    console.log(`Found ${results.length} search results`);
    // Handle results update
  },

  onLoadingStateChange: (state) => {
    // state can be 'firstRender', 'rerender', or false
    if (state === 'firstRender') {
      console.log('Initial search loading...');
    } else if (state === 'rerender') {
      console.log('Updating search results...');
    } else {
      console.log('Search loading complete');
    }
  }
});

// Clear search results when done
clearFunction();
```

**Configuration Options:**
- `layerName`: Custom name for the search results layer
- `iconImage`: Custom icon image to use for search results
- `highlightColor`: Color for highlighting search results
- `pulseAnimation`: Enable/disable pulse animation effect
- `zoomToResults`: Automatically zoom to fit search results
- `onIconClick`: Callback when a search result icon is clicked
- `onResultsUpdate`: Callback when search results are updated
- `onLoadingStateChange`: Callback for loading state changes

**Features:**
- Automatic re-searching when the map is moved (debounced)
- Distance-based filtering (minimum 500m movement triggers re-search)
- Automatic cleanup of previous search results
- Real-time loading state tracking

## Public Transport

### Displaying Real-Time Bus Locations

You can display the real-time locations of buses on the map.

**Show buses for a specific route:**

```javascript
const routeId = 'some-route-id';
yarrowMap.showBusRoute(routeId).then(clearBusRoute => {
  // To stop showing the bus route later
  // clearBusRoute();
});
```

**Show all buses in the current map view:**

If you don't provide a `route_id`, the map will show all buses within the visible area.

```javascript
yarrowMap.showBusRoute().then(clearBusRoutes => {
  // To stop showing all bus routes
  // clearBusRoutes();
});
```

### Clearing Bus Routes

The `showBusRoute` method returns a cleanup function that you can call to stop displaying bus locations and remove all related data:

```javascript
// Store the cleanup function
const clearBuses = await yarrowMap.showBusRoute('route-123');

// Later, clear the bus route display
clearBuses();
```

**What the cleanup function does:**
- Stops the automatic bus location updates (15-second interval)
- Removes all bus markers from the map
- Removes all route layers from the map
- Removes map move event listeners
- Clears internal caches (SVG cache, etc.)

**Advanced Bus Route Features:**

**Smooth Bus Animation:**
Buses animate smoothly between positions, providing a realistic tracking experience:
- 16-second animation duration between position updates
- Uses `requestAnimationFrame` for smooth 60fps interpolation
- Each bus has independent position tracking (`current` vs `target`)
- Animation starts automatically when buses are displayed

```javascript
// Buses will animate smoothly between updates
const clearBuses = await yarrowMap.showBusRoute('route-123');
```

**Performance Optimization:**
- Maximum 100 buses displayed at once (randomly selected if more exist)
- 5km radius filtering for general bus display (no route_id)
- Automatic viewport filtering for subsequent updates
- SVG icon caching for better performance
- Debounced map movement updates (500ms delay)

**Automatic Updates:**
- Bus locations update every 16 seconds
- Map movement triggers bus location refresh (for general display)
- Distance-based filtering (minimum 500m movement)

## Utility Methods

### Calculating Bounding Box

The SDK provides a utility method to calculate the bounding box of GeoJSON data:

```javascript
const geojsonData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [69.2797, 41.3111]
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [[69.240, 41.299], [69.280, 41.311]]
      }
    }
  ]
};

const boundingBox = yarrowMap.getBoundingBox(geojsonData);
console.log(boundingBox);
// Output: { xMin: 69.240, xMax: 69.280, yMin: 41.299, yMax: 41.3111 }
```

**Supported Geometry Types:**
- Point
- LineString
- Polygon

The bounding box contains:
- `xMin`: Minimum longitude
- `xMax`: Maximum longitude
- `yMin`: Minimum latitude
- `yMax`: Maximum latitude

### Clearing Local Cache

You can clear cached map resources programmatically:

```javascript
await yarrowMap.clearCache();
```

## Advanced Features

### Custom Icons and Styling

**Loading Custom Icons:**
The SDK automatically loads and caches icons from the server during initialization. You can reference these icons by name in your layers:

```javascript
// Icons are automatically available after init()
yarrowMap.init().then(() => {
  // Use server-provided icons
  yarrowMap.addLayer(
    'poi-layer',
    'symbol',
    poiData,
    {},
    {
      'icon-image': ['get', 'icon_img'], // References the icon from feature properties
      'icon-size': 0.7
    }
  );
});
```

**Custom Icon Data:**
You can also provide custom icon data directly:

```javascript
yarrowMap.addLayer(
  'custom-icons',
  'symbol',
  symbolData,
  {},
  {
    'icon-image': 'my-custom-icon',
    'icon-image-data': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    'icon-size': 1.0
  },
  {
    width: 48,
    height: 48
  }
);
```

### Performance Optimization

**Layer Management:**
- Layers are automatically cleaned up when re-added with the same name
- Sources are removed along with layers to prevent memory leaks
- Icon images are cached to avoid redundant loading

**Bus Route Optimization:**
- Maximum bus limit prevents performance issues with large datasets
- Viewport-based filtering reduces unnecessary marker creation
- SVG caching improves rendering performance
- Debounced updates prevent excessive API calls

**Memory Management:**
- Automatic cleanup of intervals and event listeners
- Cache clearing on component destruction
- Proper marker removal prevents memory leaks

**Best Practices:**

1. **Always clean up resources:**
```javascript
const clearSearch = yarrowMap.highlightSearchResults('query');
const clearBuses = await yarrowMap.showBusRoute();

// When done, clean up
clearSearch();
clearBuses();
```

2. **Reuse layer names for dynamic content:**
```javascript
// This will automatically clean up the previous layer
yarrowMap.addLayer('dynamic-layer', 'circle', newData, paint);
```

3. **Use meaningful layer names:**
```javascript
// Good: descriptive and unique
yarrowMap.addLayer('user-locations-2024', 'symbol', userData);

// Avoid: generic names that might conflict
yarrowMap.addLayer('layer1', 'symbol', userData);
```

4. **Handle errors appropriately:**
```javascript
try {
  await yarrowMap.buildRouteWithLabels(start, end, 'car');
} catch (error) {
  console.error('Route building failed:', error);
  // Handle error appropriately
}
```

---

## API Reference

### YarrowMapConfig Class

```typescript
constructor(
  container: string | HTMLElement,
  center: [number, number],
  zoom?: number,           // default: 10
  minZoom?: number,        // default: 0
  maxZoom?: number,        // default: 19
  theme?: 'light' | 'dark', // default: 'light'
  cache?: {
    enabled?: boolean;      // default: false
    lifespanDays?: number;  // default: 30 (1 month)
  }
)
```

### YarrowMap Class Methods

| Method | Parameters | Return Type | Description |
|--------|------------|-------------|-------------|
| `init()` | None | `Promise<void>` | Initialize the map with styles and icons |
| `changeStyles(styleType?)` | `styleType?: 'satellite' \| 'hybrid'` | `Promise<any>` | Change map style |
| `changeTheme(theme)` | `theme: 'light' \| 'dark'` | `Promise<any>` | Switch between light and dark themes |
| `zoomTo(lat, lng, zoom)` | `lat: number, lng: number, zoom: number` | `void` | Fly to specific coordinates |
| `fitBounds(data)` | `data: GeoJSON` | `void` | Fit map to show all features |
| `getBoundingBox(data)` | `data: GeoJSON` | `BoundingBox` | Calculate bounding box of features |
| `onMoveEnd(callback)` | `callback: (lat, lng, zoom) => void` | `void` | Listen for map movement end |
| `onMapClick(callback)` | `callback: (lat, lng) => void` | `void` | Listen for map clicks |
| `onIconClick(layerGroup, callback)` | `layerGroup: 'pois' \| 'buildings', callback: Function` | `void` | Listen for icon clicks |
| `onLayerClick(layerGroup, callback)` | `layerGroup: 'pois' \| 'buildings', callback: Function` | `void` | Alias for onIconClick (same method) |
| `changeBackgroundColor(color)` | `color: string` | `void` | Change map background color |
| `addLayer()` | `layerName, layerType, featureCollection, paint?, layout?, iconSettings?` | `void` | Add a layer to the map |
| `removeLayer(layerName)` | `layerName: string` | `void` | Remove a layer from the map |
| `addMarker(coordinates, options?)` | `coordinates: [lat, lng], options?: MarkerOptions` | `Marker \| null` | Add a marker to the map |
| `removeMarker(marker)` | `marker: Marker` | `void` | Remove a marker from the map |
| `renderRoutes(routes, baseLayerName?)` | `routes: Feature[], baseLayerName?: string` | `void` | Render multiple route features |
| `buildRouteWithLabels()` | `start: [lat, lng], end: [lat, lng], profile: string` | `Promise<RouteResult>` | Build and display a route with labels |
| `buildMultiSegmentRouteWithLabels()` | `coordinates: [lat, lng][], profile: string, language?: string` | `Promise<RouteResult>` | Build multi-segment route |
| `clearAllRoutes()` | None | `void` | Clear all route layers and popups |
| `clearCache()` | None | `Promise<void>` | Clear local persistent cache |
| `highlightSearchResults()` | `query: string, options?: SearchOptions` | `() => void` | Highlight search results with cleanup function |
| `showBusRoute(routeId?)` | `routeId?: string` | `Promise<() => void>` | Show bus locations with cleanup function |

### Type Definitions

```typescript
interface BoundingBox {
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
}
```

---

## Version Information

- **Current Version**: 1.0.39
- **Dependencies**: maplibre-gl ^5.5.0, axios ^1.7.9
- **Repository**: https://git.yarrow.uz/yarrow-sdk/frontend/yarrow-map-web-sdk

## Support

For issues, questions, or contributions, please visit the project repository or contact the Yarrow development team.
