# Yarrow Map Flutter SDK Documentation

This document is for package consumers integrating `yarrow_map_flutter_sdk` into their Flutter app.

## 1. What this package provides

`yarrow_map_flutter_sdk` wraps a `MapLibreMap` and adds Yarrow-specific behavior:

- style/theme switching against a Yarrow backend
- map overlays
- a higher-level map API (`YarrowMap`) for layers, markers, routes, search, and bus tracking
- event callbacks for map movement, map taps, and feature taps
- optional response caching

## 2. Requirements

- Flutter `>=3.19.0`
- Dart `^3.11.0`

From package dependencies:

- `maplibre_gl`
- `dio`
- `flutter_cache_manager`
- `flutter_svg`

## 3. Installation

Contact our team for installation guides and access.

### 3.1 Import

```dart
import 'package:yarrow_map_flutter_sdk/yarrow_map_flutter_sdk.dart';
```

## 4. Quick start

```dart
import 'package:flutter/material.dart';
import 'package:yarrow_map_flutter_sdk/yarrow_map_flutter_sdk.dart';

class MapScreen extends StatefulWidget {
  const MapScreen({super.key});

  @override
  State<MapScreen> createState() => _MapScreenState();
}

class _MapScreenState extends State<MapScreen> {
  late final YarrowMapController _controller;

  @override
  void initState() {
    super.initState();
    _controller = YarrowMapController();
  }

  @override
  Widget build(BuildContext context) {
    return YarrowMapView(
      controller: _controller,
      config: const YarrowMapConfig(
        center: (lng: 69.2401, lat: 41.2995),
        zoom: 12,
        controls: YarrowControlsConfig(enabled: true),
      ),
      onReady: (map) async {
        await map.changeStyles('hybrid');

        map.onMapClick((lat, lng) {
          debugPrint('tap: $lat, $lng');
        });
      },
    );
  }
}
```

## 5. Core objects and lifecycle

### 5.1 `YarrowMapView`

Flutter widget that renders the map and initializes style/icon loading.

Key constructor args:

- `config` (required): `YarrowMapConfig`
- `controller` (optional): `YarrowMapController`
- `onReady` (optional): called once style is loaded and map is ready

### 5.2 `YarrowMapController`

Holds a reference to `YarrowMap` once attached by `YarrowMapView`.

Useful members:

- `map`: nullable current map instance
- `mapListenable`: `ValueListenable<YarrowMap?>`
- `requireMap()`: throws if map is not ready
- `fromConfig(config)`: creates controller with prebuilt map instance

### 5.3 Readiness rules

- Prefer calling map APIs inside `onReady`.
- For button handlers and external code paths, use `controller.requireMap()`.
- If you call APIs before readiness, expect `StateError` from guarded operations.

### 5.4 Disposal rules

- `YarrowMapView` manages internal map lifecycle.
- If you start long-running features (`highlightSearchResults`, `showBusRoute`), keep returned `YarrowCancelable` and cancel in widget `dispose`.

## 6. Configuration (`YarrowMapConfig`)

Constructor:

```dart
const YarrowMapConfig({
  required ({double lng, double lat}) center,
  double zoom = 10,
  double minZoom = 0,
  double maxZoom = 19,
  YarrowTheme theme = YarrowTheme.light,
  YarrowCacheConfig cache = const YarrowCacheConfig(),
  BrandBadgePosition brandBadgePosition = BrandBadgePosition.bottomLeft,
  YarrowControlsConfig controls = const YarrowControlsConfig(),
  String baseUrl = 'https://gis.yarrow.uz',
})
```

### 6.1 Field details

- `center`: initial camera center using named fields `(lng, lat)`.
- `zoom`: initial zoom.
- `minZoom` / `maxZoom`: camera zoom limits.
- `theme`: affects initial style endpoint (`light` or `dark`).
- `cache`: enables and configures SDK-level request cache.
- `brandBadgePosition`: placement of Yarrow badge overlay.
- `controls`: visibility and placement of built-in zoom/compass controls.
- `baseUrl`: root URL for style, icon, route, search, and bus API requests.

### 6.2 Theme enum

- `YarrowTheme.light`
- `YarrowTheme.dark`

### 6.3 Badge position enum

- `BrandBadgePosition.topLeft`
- `BrandBadgePosition.topRight`
- `BrandBadgePosition.bottomLeft`
- `BrandBadgePosition.bottomRight`

### 6.4 Controls config

`YarrowControlsConfig`:

```dart
const YarrowControlsConfig({
  bool enabled = false,
  YarrowControlsPosition position = YarrowControlsPosition.right,
  bool zoom = true,
  bool compass = true,
})
```

`YarrowControlsPosition` values:

- `left`
- `right`

## 7. `YarrowMap` API reference

You receive `YarrowMap` from `onReady` or from `controller.requireMap()`.

### 7.1 Style/theme

- `Future<Map<String, dynamic>> changeStyles(String? styleType)`
- `Future<Map<String, dynamic>> changeTheme(YarrowTheme theme)`

`changeStyles` behavior:

- `styleType == 'satellite'` -> `/styles/satellite/`
- `styleType == 'hybrid'` -> `/styles/hybrid/`
- otherwise -> `/styles/`
- if config theme is dark, appends `dark=true`

### 7.2 Camera

- `Future<void> zoomTo(double lat, double lng, double zoom)`
- `Future<void> fitBounds(Map<String, dynamic> featureCollection)`
- `YarrowBoundingBox getBoundingBox(Map<String, dynamic> featureCollection)`
- `Future<void> zoomIn()`
- `Future<void> zoomOut()`
- `Future<void> resetNorth()`

### 7.3 Global map events

- `void onMoveEnd(YarrowMoveEndCallback callback)`
- `void onMapClick(YarrowMapClickCallback callback)`
- `Stream<YarrowMoveEndEvent> get onMoveEndStream`
- `Stream<YarrowMapTapEvent> get onMapClickStream`

Callback signatures:

- `YarrowMoveEndCallback`: `(double lat, double lng, double zoom)`
- `YarrowMapClickCallback`: `(double lat, double lng)`

### 7.4 Feature click events

- `void onIconClick(YarrowLayerGroup layerGroup, YarrowFeatureClickCallback callback)`
- `void onLayerClick(YarrowBaseLayerName layerName, YarrowFeatureClickCallback callback)`
- `void onCustomLayerClick(String layerId, YarrowFeatureClickCallback callback)`

Callback signature:

- `YarrowFeatureClickCallback`: `(double lat, double lng, Map<String, dynamic> properties)`

Enums:

- `YarrowLayerGroup`: `pois`, `buildings`
- `YarrowBaseLayerName`: `buildings`, `pois`

### 7.5 Layers

- `Future<void> addLayer(...)`
- `Future<void> removeLayer(String layerName)`
- `Future<void> changeBackgroundColor(Color color)`

`addLayer` signature:

```dart
Future<void> addLayer({
  required String layerName,
  required String layerType,
  required Map<String, dynamic> featureCollection,
  Map<String, dynamic> paint = const {},
  Map<String, dynamic> layout = const {},
  Map<String, dynamic> iconSettings = const {},
  bool cluster = false,
  double? clusterRadius,
  double? clusterMaxZoom,
  Object? clusterProperties,
})
```

Notes:

- Re-adding the same `layerName` replaces previous source/layer.
- GeoJSON source ID is managed internally.
- `layout['icon-image-data']` is supported for inlined data-uri icon registration.
- `iconSettings` is currently reserved for parity and not used for runtime rendering behavior.

Supported `layerType` values map to MapLibre layer properties:

- `line`
- `fill`
- `circle`
- `raster`
- `symbol`
- `fill-extrusion`
- `heatmap`
- `hillshade`

### 7.6 Markers

- `Future<YarrowMarkerHandle?> addMarker(List<double> coordinates, {YarrowMapMarkerOptions options})`
- `Future<void> removeMarker(YarrowMarkerHandle? marker)`

`YarrowMapMarkerOptions`:

```dart
const YarrowMapMarkerOptions({
  Color color = const Color(0xFFFF0000),
  bool draggable = false,
  VoidCallback? onClick,
})
```

Notes:

- Marker input coordinates are `[lat, lng]`.
- `draggable` exists in API but is not currently implemented in behavior.
- Remove markers with returned `YarrowMarkerHandle`.

### 7.7 Routing

- `Future<YarrowRouteBuildResult> buildRouteWithLabels(List<double> startCoordinates, List<double> endCoordinates, String profile)`
- `Future<YarrowMultiSegmentRouteBuildResult> buildMultiSegmentRouteWithLabels(List<List<double>> coordinates, String profile, {String language = 'ru'})`
- `Future<void> renderRoutes(List<Map<String, dynamic>> routes, {String baseLayerName = 'route'})`
- `Future<void> clearAllRoutes()`

Notes:

- Route methods call `/route/` and render route alternatives automatically.
- Route methods auto-fit map bounds to the primary route if features exist.
- Coordinates used by route endpoints should follow backend expectations (examples in this doc use `[lat, lng]` as used by SDK methods).

### 7.8 Search highlight

- `YarrowCancelable highlightSearchResults(String query, {YarrowHighlightOptions options = const YarrowHighlightOptions()})`

`YarrowHighlightOptions`:

```dart
const YarrowHighlightOptions({
  String layerName = 'search-results',
  String? iconImage,
  Color? highlightColor,
  bool pulseAnimation = false,
  bool zoomToResults = true,
  YarrowFeatureClickCallback? onIconClick,
  void Function(List<Map<String, dynamic>> results)? onResultsUpdate,
  void Function(YarrowSearchLoadingState? state)? onLoadingStateChange,
})
```

`YarrowSearchLoadingState` values:

- `firstRender`
- `rerender`

Behavior summary:

- Immediately fetches and renders.
- Subscribes to move-end and re-fetches with a debounce.
- Calling `cancel()` removes generated layers and stops updates.

### 7.9 Bus tracking

- `Future<YarrowCancelable> showBusRoute({String? routeId})`

Behavior summary:

- Creates/upserts a dynamic bus symbol layer.
- Polls backend every 16 seconds.
- Animates interpolation every 80ms between updates.
- If `routeId` is provided, route geometry for that route is rendered.
- If `routeId` is omitted, updates are also triggered on move-end.

### 7.10 Cache

- `Future<void> clearCache()`

## 8. Endpoint contract expected by SDK

The SDK requests these backend paths relative to `YarrowMapConfig.baseUrl`:

- `GET /styles/` (or `/styles/satellite/`, `/styles/hybrid/`, with optional `dark=true`)
- `GET /icons-image`
- `POST /route/`
- `GET /search/` with query params `q`, `lat`, `lon`
- `GET /api/get-all-bus/`
- `GET /api/get-route/?route_id=<id>`

If you host your own backend, these endpoints and response formats must be compatible with SDK parsing logic.

## 9. Usage examples by feature

### 9.1 Initialize with dark theme, left controls, cache

```dart
const config = YarrowMapConfig(
  center: (lng: 69.2401, lat: 41.2995),
  zoom: 12,
  theme: YarrowTheme.dark,
  controls: YarrowControlsConfig(
    enabled: true,
    position: YarrowControlsPosition.left,
  ),
  cache: YarrowCacheConfig(enabled: true, lifespanDays: 14),
);
```

### 9.2 Safe access from UI handlers

```dart
ElevatedButton(
  onPressed: () async {
    final map = _controller.requireMap();
    await map.zoomTo(41.2995, 69.2401, 15);
  },
  child: const Text('Go to center'),
)
```

### 9.3 Add a custom symbol layer and click handling

```dart
await map.addLayer(
  layerName: 'shops-layer',
  layerType: 'symbol',
  featureCollection: {
    'type': 'FeatureCollection',
    'features': [
      {
        'type': 'Feature',
        'geometry': {
          'type': 'Point',
          'coordinates': [69.2401, 41.2995],
        },
        'properties': {'name': 'Shop 1'},
      },
    ],
  },
  layout: {
    'text-field': ['get', 'name'],
    'text-size': 12,
    'text-anchor': 'top',
  },
);

map.onCustomLayerClick('shops-layer', (lat, lng, props) {
  debugPrint('custom click: $props');
});
```

### 9.4 Add clustered points

```dart
await map.addLayer(
  layerName: 'clustered-points',
  layerType: 'circle',
  featureCollection: pointsGeoJson,
  cluster: true,
  clusterRadius: 60,
  clusterMaxZoom: 14,
  clusterProperties: {
    'sum': ['+', ['get', 'value']],
  },
  paint: {
    'circle-color': '#2563eb',
    'circle-radius': 8,
  },
);
```

### 9.5 Build route with labels

```dart
final result = await map.buildRouteWithLabels(
  [41.2995, 69.2401],
  [41.3150, 69.2800],
  'driving',
);

debugPrint('route alternatives: ${result.features.length}');
debugPrint('directions count: ${result.directions.length}');
```

### 9.6 Multi-segment route with language

```dart
final result = await map.buildMultiSegmentRouteWithLabels(
  [
    [41.2995, 69.2401],
    [41.3050, 69.2500],
    [41.3150, 69.2800],
  ],
  'driving',
  language: 'en',
);

debugPrint('segments: ${result.features.length}');
```

### 9.7 Search lifecycle with cancellation

```dart
YarrowCancelable? searchTask;

searchTask = map.highlightSearchResults(
  'coffee',
  options: YarrowHighlightOptions(
    layerName: 'search-coffee',
    zoomToResults: true,
    onLoadingStateChange: (state) {
      debugPrint('loading: $state');
    },
    onResultsUpdate: (results) {
      debugPrint('results: ${results.length}');
    },
  ),
);

// later, for example in dispose:
searchTask?.cancel();
```

### 9.8 Bus lifecycle with cancellation

```dart
YarrowCancelable? busTask;

busTask = await map.showBusRoute();
// or: busTask = await map.showBusRoute(routeId: '12');

// later, for example in dispose:
busTask?.cancel();
```

### 9.9 Marker add/remove

```dart
final handle = await map.addMarker(
  [41.2995, 69.2401],
  options: YarrowMapMarkerOptions(
    color: const Color(0xFFEF4444),
    onClick: () => debugPrint('marker tapped'),
  ),
);

await map.removeMarker(handle);
```

## 10. Coordinate conventions (important)

This SDK intentionally mixes conventions to match web-SDK behavior and GeoJSON standards.

- `YarrowMapConfig.center`: named `(lng, lat)`
- GeoJSON geometry coordinates: `[lng, lat]`
- map callbacks (`onMapClick`, `onMoveEnd`, feature click callbacks): `(lat, lng)`
- `zoomTo(lat, lng, zoom)`: `(lat, lng)`
- `addMarker([lat, lng])`: `(lat, lng)`

If the map appears in the wrong location, verify coordinate ordering first.

## 11. Error handling and defensive patterns

### 11.1 Protect early calls

```dart
YarrowMap? tryGetMap(YarrowMapController controller) {
  return controller.map;
}
```

If nullable map is `null`, wait for `onReady` or guard UI actions.

### 11.2 Catch request failures

Network calls in style/search/route/bus operations can throw. Wrap calls when needed:

```dart
try {
  await map.changeStyles('satellite');
} catch (e) {
  debugPrint('Failed to change style: $e');
}
```

### 11.3 Always cancel long-running tasks

- Cancel search tasks on route/screen changes.
- Cancel bus tasks when leaving the map screen.

## 12. Common pitfalls

- Calling methods before `onReady`.
- Using `[lat, lng]` inside GeoJSON (must be `[lng, lat]`).
- Forgetting to cancel `YarrowCancelable` tasks.
- Registering `onCustomLayerClick` for a layer ID different from `addLayer.layerName`.
- Passing unsupported style keys/types in `paint` / `layout` maps.

## 13. Full screen example

```dart
import 'package:flutter/material.dart';
import 'package:yarrow_map_flutter_sdk/yarrow_map_flutter_sdk.dart';

class FullMapExample extends StatefulWidget {
  const FullMapExample({super.key});

  @override
  State<FullMapExample> createState() => _FullMapExampleState();
}

class _FullMapExampleState extends State<FullMapExample> {
  late final YarrowMapController _controller;
  YarrowCancelable? _searchCancelable;
  YarrowCancelable? _busCancelable;

  @override
  void initState() {
    super.initState();
    _controller = YarrowMapController();
  }

  @override
  void dispose() {
    _searchCancelable?.cancel();
    _busCancelable?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Yarrow Map Example')),
      body: YarrowMapView(
        controller: _controller,
        config: const YarrowMapConfig(
          center: (lng: 69.2401, lat: 41.2995),
          zoom: 12,
          controls: YarrowControlsConfig(enabled: true),
          cache: YarrowCacheConfig(enabled: true, lifespanDays: 7),
        ),
        onReady: (map) async {
          map.onMapClick((lat, lng) {
            debugPrint('tap: $lat, $lng');
          });

          map.onMoveEnd((lat, lng, zoom) {
            debugPrint('move end: $lat, $lng z=$zoom');
          });

          await map.changeStyles('hybrid');

          _searchCancelable = map.highlightSearchResults('hospital');
          _busCancelable = await map.showBusRoute();
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () async {
          final map = _controller.requireMap();
          await map.zoomTo(41.2995, 69.2401, 14);
        },
        child: const Icon(Icons.my_location),
      ),
    );
  }
}
```

## 14. Public exports from package

The package exports:

- `YarrowMapConfig`
- `YarrowMap`
- model/types from `yarrow_types.dart`
- `YarrowMapController`
- `YarrowMapView`

Importing `package:yarrow_map_flutter_sdk/yarrow_map_flutter_sdk.dart` gives access to all of the above.
