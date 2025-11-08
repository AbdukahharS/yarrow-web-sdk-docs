# YarrowInstance Documentation

## 🚀 Installation & Authentication

### Authentication (GitLab)

The Yarrow iOS SDK is hosted on GitLab at `https://git.yarrow.uz/ios-sdk`. To access it, you must authenticate using your GitLab credentials (username/email + personal access token).

**Steps to authenticate:**

1. Log in to GitLab at: `https://git.yarrow.uz`
2. Create a Personal Access Token (PAT) under **User Settings → Access Tokens**
   - Give it appropriate permissions (e.g., `read_repository`, `read_package_registry`)
3. When prompted during installation, use:
   - **Username:** your GitLab username or email
   - **Password:** the PAT token you created

### Installing the SDK via Swift Package Manager

#### Option A: Using Xcode

1. Open Xcode and navigate to **File → Add Packages…**
2. Paste the repository URL:
   ```
   https://git.yarrow.uz/ios-sdk.git
   ```
3. If the repository is private, Xcode will prompt for credentials:
   - Enter your GitLab username/email
   - Enter your PAT token as the password
4. Select the version/branch of the SDK you need, and add it to your target

#### Option B: Using Swift Package Manager from Command Line

Add the dependency to your `Package.swift`:

```swift
.package(
    url: "https://git.yarrow.uz/ios-sdk.git", 
    from: "1.0.0"
),
```

**Note:** Ensure your authentication is configured so SPM can pull from the private registry with your GitLab credentials.

### Environment Variables (Recommended)

Avoid hard-coding credentials by using environment variables:

```bash
export GITLAB_USERNAME="your_username_or_email"
export GITLAB_PAT_TOKEN="your_personal_access_token"
```

Then use these variables when prompted for authentication.

### Authentication Summary

| Field | Value |
|-------|-------|
| Repository URL | `https://git.yarrow.uz/ios-sdk.git` |
| Username | GitLab username or email |
| Password | Personal Access Token (PAT) |
| Token Scope | `read_repository`, `read_package_registry` |

### Importing the SDK

Once installation is complete, import the SDK module in your Swift code:

```swift
import YarrowSDK
```

---

## Overview

The `YarrowInstance` class serves as the primary interface for interacting with the Yarrow Map SDK. It provides a comprehensive set of tools for managing map interactions, including markers, routes, camera controls, and user location tracking. This class acts as a bridge between your application and the underlying map view controller, offering an intuitive API for common mapping operations.

## Initialization

The `YarrowInstance` is initialized internally by the SDK when the map becomes ready. You'll receive an instance through the callback provided in the `YarrowMap` initializer:

```swift
YarrowMap(lang: "en") { instance in
    // Use the instance here
    instance.zoomIn()
}
```

## Core Functionality

### Map Settings

#### `resetNorth()`
Resets the map's orientation to point north. This is particularly useful when users have rotated the map and need to return to the default orientation.

```swift
instance.resetNorth()
```

#### `reloadStyle()`
Forces a reload of the current map style. Use this when you need to refresh the map's appearance or apply style changes.

```swift
instance.reloadStyle()
```

---

### Zoom Controls

The SDK provides fine-grained control over the map's zoom level, allowing you to create smooth navigation experiences.

#### `zoomIn()`
Increases the zoom level by one step with animation. The map smoothly transitions to show more detail.

```swift
instance.zoomIn()
```

#### `zoomOut()`
Decreases the zoom level by one step with animation, revealing a wider area of the map.

```swift
instance.zoomOut()
```

#### `setZoomLevel(_ zoom: Double)`
Sets the map to a specific zoom level. Zoom levels typically range from 4 (minimum) to 19 (maximum), with higher values showing more detail.

```swift
// Set to street-level detail
instance.setZoomLevel(16.0)
```

**Parameters:**
- `zoom`: The desired zoom level (4.0 to 19.0)

---

### Marker Management

Markers allow you to highlight specific locations on the map with custom imagery. The SDK handles all the complexity of layer and source management for you.

#### `addMarker(marker: CustomMarker)`
Places a single custom marker on the map. Each marker requires a unique identifier, an image, and coordinates.

```swift
let marker = CustomMarker(
    id: "restaurant-1",
    image: restaurantIcon,
    coordinates: CLLocationCoordinate2D(latitude: 41.3037, longitude: 69.2479),
    anchor: .center
)
instance.addMarker(marker: marker)
```

**Parameters:**
- `marker`: A `CustomMarker` object containing the marker's configuration

#### `addMarkers(markers: [CustomMarker])`
Efficiently adds multiple markers to the map in a single operation.

```swift
let markers = [marker1, marker2, marker3]
instance.addMarkers(markers: markers)
```

**Parameters:**
- `markers`: An array of `CustomMarker` objects

#### `removeMarker(markerId: String)`
Removes a specific marker from the map using its identifier. The SDK automatically cleans up both the layer and source associated with the marker.

```swift
instance.removeMarker(markerId: "restaurant-1")
```

**Parameters:**
- `markerId`: The unique identifier of the marker to remove

---

### Route Management

The route functionality enables you to display navigation paths between multiple points with support for alternative routes and custom styling.

#### `addRoute(targetLocations:profile:selectedRouteID:otherColor:callback:)`
Calculates and displays routes between multiple locations. The SDK automatically handles route calculation, marker placement at waypoints, and visual representation of alternative paths.

```swift
let waypoints = [startLocation, endLocation]
instance.addRoute(
    targetLocations: waypoints,
    profile: "driving",
    selectedRouteID: 0,
    otherColor: "#B2A5FF"
) { state, response, selectedFeature in
    switch state {
    case .Positive:
        print("Route successfully calculated")
        print("Distance: \(selectedFeature?.properties.distance ?? 0) meters")
    case .Negative:
        print("Route calculation failed")
    default:
        break
    }
}
```

**Parameters:**
- `targetLocations`: Array of coordinates representing waypoints (minimum 2 required)
- `profile`: Routing profile ("driving", "walking", "cycling")
- `selectedRouteID`: Optional ID to highlight a specific route variant
- `otherColor`: Optional hex color for alternative routes (default colors will be used if nil)
- `callback`: Closure called with the routing result

**Callback Parameters:**
- `state`: Current state of the operation (Loading, Positive, Negative)
- `response`: Complete route response containing all calculated routes
- `selectedFeature`: The highlighted route feature

#### `updateSelectedRoute(route:otherColor:)`
Updates the visual representation of routes to highlight a different variant without recalculating. This is useful when presenting route alternatives to users.

```swift
instance.updateSelectedRoute(
    route: alternativeRoute,
    otherColor: "#9FB3DF"
)
```

**Parameters:**
- `route`: The `RouteFeature` to highlight
- `otherColor`: Optional hex color for non-selected routes

#### `addRoute<T>(index:feature:)`
Adds a custom route feature to the map with full control over styling. This method is designed for advanced use cases where you're managing route data externally.

```swift
instance.addRoute(index: 0, feature: customRouteFeature)
```

**Parameters:**
- `index`: Layer index for the route
- `feature`: A `RouteFeature` conforming to `YarrowTypeAlias`

#### `removeRoute(withData: Bool = true)`
Removes the currently displayed route from the map. Optionally clears all associated data including waypoint markers.

```swift
// Remove route and all markers
instance.removeRoute()

// Remove only visual elements, keep data
instance.removeRoute(withData: false)
```

**Parameters:**
- `withData`: Whether to clear internal route data and waypoint markers (default: true)

---

### Camera Control

Camera methods provide smooth, animated transitions to different map views.

#### `animateCamera(target:zoom:)`
Smoothly animates the camera to focus on a specific location with a defined zoom level.

```swift
let tashkent = CLLocationCoordinate2D(latitude: 41.3037, longitude: 69.2479)
instance.animateCamera(target: tashkent, zoom: 14.0)
```

**Parameters:**
- `target`: The coordinate to center on
- `zoom`: The zoom level to use

---

### Gesture Handling

The gesture system allows you to respond to user interactions with different types of map features.

#### `addOnTapGesture(action:)`
Registers a callback for general map taps that don't hit any specific features.

```swift
instance.addOnTapGesture { coordinate in
    print("Map tapped at: \(coordinate.latitude), \(coordinate.longitude)")
}
```

**Parameters:**
- `action`: Closure called with the tapped coordinate

#### `addOnPointTapGesture(action:)`
Handles taps on point features like markers or POIs. The callback receives both the coordinate and parsed properties of the tapped feature.

```swift
instance.addOnPointTapGesture { coordinate, properties in
    if let properties = properties {
        print("Tapped on: \(properties.name ?? "Unknown")")
    }
}
```

**Parameters:**
- `action`: Closure called with coordinate and optional `PointProperties`

#### `addOnRouteTapGesture(action:)`
Responds to taps on route lines, enabling interactive route selection or information display.

```swift
instance.addOnRouteTapGesture { coordinate, feature in
    if let feature = feature {
        print("Route tapped at: \(coordinate)")
    }
}
```

**Parameters:**
- `action`: Closure called with coordinate and optional `MLNPolylineFeature`

#### `addOnBuildingTapGesture(action:)`
Handles taps on building polygons, useful for displaying building information or selection.

```swift
instance.addOnBuildingTapGesture { coordinate, feature in
    if let feature = feature {
        print("Building selected")
    }
}
```

**Parameters:**
- `action`: Closure called with coordinate and optional `MLNPolygonFeature`

---

### User Location

These methods help you work with the user's current location and create location-aware experiences.

#### `showUserLocation(animate: Bool = true)`
Enables the display of the user's location on the map with heading indicators. Optionally animates the camera to center on the user's position.

```swift
// Show location and animate to it
instance.showUserLocation()

// Show location without moving camera
instance.showUserLocation(animate: false)
```

**Parameters:**
- `animate`: Whether to animate the camera to the user's location (default: true)

#### `getUserLocation(animate:action:)`
Retrieves the user's current location asynchronously and optionally centers the camera on it.

```swift
instance.getUserLocation(animate: true) { state, coordinate in
    switch state {
    case .Loading:
        print("Getting location...")
    case .Positive:
        if let coordinate = coordinate {
            print("User at: \(coordinate)")
        }
    case .Negative:
        print("Could not get user location")
    }
}
```

**Parameters:**
- `animate`: Whether to animate the camera to the location
- `action`: Closure called with state and optional coordinate

#### `animateToCurrentLocation()`
Immediately animates the camera to the user's current location with a street-level zoom (17.0).

```swift
instance.animateToCurrentLocation()
```

#### `lastLocation()`
Returns the most recently known user location without triggering any updates or animations.

```swift
if let location = instance.lastLocation() {
    print("Last known position: \(location)")
}
```

**Returns:** Optional `CLLocationCoordinate2D`

#### `trackUser(mode: MLNUserTrackingMode)`
Enables continuous user tracking with a specified mode. The camera will automatically follow the user's movements.

```swift
// Follow user with heading
instance.trackUser(mode: .followWithHeading)

// Simple follow mode
instance.trackUser(mode: .follow)
```

**Parameters:**
- `mode`: The tracking mode to use (`none`, `follow`, `followWithHeading`, `followWithCourse`)

#### `stopTrackingUser()`
Disables user tracking, allowing free camera movement again.

```swift
instance.stopTrackingUser()
```

---

### Camera Change Listener

#### `addOnCameraChangeListener(action:)`
Registers a callback that fires whenever the map's camera position changes, whether from user interaction or programmatic control.

```swift
instance.addOnCameraChangeListener { coordinate in
    print("Camera moved to: \(coordinate.latitude), \(coordinate.longitude)")
}
```

**Parameters:**
- `action`: Closure called with the new center coordinate

---

### Weather Integration

#### `fetchWeather(callback:)`
Retrieves weather forecast data for the current map center. The SDK caches weather data to minimize unnecessary network requests.

```swift
instance.fetchWeather { state, forecast in
    switch state {
    case .Positive:
        if let forecast = forecast {
            print("Temperature: \(forecast.current.temperature)")
        }
    case .Negative:
        print("Failed to fetch weather")
    default:
        break
    }
}
```

**Parameters:**
- `callback`: Closure called with state and optional `ForecastResponse`

---

### Geocoding

#### `fetchGeoCoding(target:callback:)`
Converts coordinates into human-readable address information (reverse geocoding).

```swift
let location = CLLocationCoordinate2D(latitude: 41.3037, longitude: 69.2479)
instance.fetchGeoCoding(target: location) { state, data in
    switch state {
    case .Positive:
        if let data = data {
            print("Address: \(data.displayName)")
        }
    case .Negative:
        print("Geocoding failed")
    default:
        break
    }
}
```

**Parameters:**
- `target`: The coordinate to reverse geocode
- `callback`: Closure called with state and optional `GeoData`

---

### Layer Management

Map layers control the visual style of the base map (streets, satellite, terrain, etc.).

#### `currentLayerMode()`
Returns the currently active map layer style.

```swift
let currentMode = instance.currentLayerMode()
print("Current layer: \(currentMode)")
```

**Returns:** `LayerMode` enum value

#### `setLayerMode(mode: LayerMode)`
Changes the map's base layer style. This triggers a complete style reload with the new visual theme.

```swift
// Switch to satellite view
instance.setLayerMode(mode: .satellite)

// Switch to streets view
instance.setLayerMode(mode: .streets)
```

**Parameters:**
- `mode`: The `LayerMode` to activate

---

### Icon Scaling

These advanced methods allow you to dynamically emphasize specific POI icons on the map based on zoom level.

#### `scaleIcon(_ nodeType: String, withText: Bool = false)`
Scales icons matching a specific node type across all zoom levels. This creates a visual hierarchy by making certain categories of POIs more prominent.

```swift
// Emphasize all restaurant icons
instance.scaleIcon("restaurant")
```

**Parameters:**
- `nodeType`: The type identifier for icons to scale
- `withText`: Reserved for future text scaling functionality

#### `scaleIcon(_ nodeId: Int, withText: Bool = false)`
Scales a single icon identified by its unique node ID. Perfect for highlighting a specific selected location.

```swift
// Highlight a specific POI
instance.scaleIcon(12345)
```

**Parameters:**
- `nodeId`: The unique identifier of the icon to scale
- `withText`: Reserved for future text scaling functionality

#### `resetIconScale()`
Returns all icon scales to their default values, removing any custom scaling previously applied.

```swift
instance.resetIconScale()
```

---

### 3D View

#### `angeledView(isEnabled: Bool)`
Toggles the map's pitch to create a 3D perspective view. When enabled, the map tilts to a 60-degree angle, providing a more immersive view of the terrain and buildings.

```swift
// Enable 3D perspective
instance.angeledView(isEnabled: true)

// Return to flat view
instance.angeledView(isEnabled: false)
```

**Parameters:**
- `isEnabled`: Whether to enable the angled (3D) view

---

### Debugging

#### `logLayers()`
Outputs information about all map style layers to the console. This is useful during development to understand the layer structure and troubleshoot styling issues.

```swift
instance.logLayers()
```

## Best Practices

### Memory Management
The `YarrowInstance` is decorated with `@MainActor`, ensuring all operations occur on the main thread. This prevents common concurrency issues when updating UI elements.

### Coordinate Systems
All coordinates use the standard `CLLocationCoordinate2D` format with latitude and longitude in decimal degrees.

### Error Handling
Many methods use a callback pattern with a `ViewModelState` enum:
- `.Loading`: Operation in progress
- `.Positive`: Operation succeeded
- `.Negative`: Operation failed

Always handle all cases to provide a robust user experience.

### Route Colors
The SDK provides default colors for alternative routes: `#C68EFD`, `#9FB3DF`, and `#B2A5FF`, with the selected route highlighted in `#FE6D00` (orange). You can override these with custom hex colors.

### Performance Considerations
- Remove markers and routes when they're no longer needed to maintain optimal performance
- The weather and geocoding data are cached automatically
- Icon scaling operations modify map style directly and should be used judiciously

## Example: Complete Integration

Here's a comprehensive example showing how to integrate multiple features:

```swift
YarrowMap(lang: "en") { instance in
    // Setup user location
    instance.showUserLocation()
    
    // Add tap gesture handler
    instance.addOnPointTapGesture { coordinate, properties in
        if let properties = properties {
            // Show POI details
            showPOIDetails(properties)
        }
    }
    
    // Add camera change listener
    instance.addOnCameraChangeListener { coordinate in
        updateLocationInfo(coordinate)
    }
    
    // Calculate and display a route
    let waypoints = [startPoint, endPoint]
    instance.addRoute(
        targetLocations: waypoints,
        profile: "driving"
    ) { state, response, feature in
        if state == .Positive, let feature = feature {
            let distance = feature.properties.distance
            let duration = feature.properties.duration
            showRouteInfo(distance: distance, duration: duration)
        }
    }
    
    // Fetch weather for current location
    instance.fetchWeather { state, forecast in
        if state == .Positive, let forecast = forecast {
            updateWeatherUI(forecast)
        }
    }
}
```

## Thread Safety

All `YarrowInstance` methods must be called from the main thread due to the `@MainActor` annotation. The SDK handles this automatically for callbacks, ensuring UI updates are safe.

## Logging

The SDK uses Apple's unified logging system (`os_log`) for debugging. All log messages are prefixed with "Yarrow-SDK | Instance:" for easy filtering in Console.app or Xcode's debug console.

---

**Last Updated:** November 2025  
**Version:** Compatible with Yarrow SDK 1.x