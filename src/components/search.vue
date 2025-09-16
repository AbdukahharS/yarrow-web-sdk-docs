<script setup lang="ts">
import Code from './code.vue'

const searchCode = `const query = 'Tashkent';

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
// clearHighlights();`

const advancedSearchCode = `const clearFunction = yarrowMap.highlightSearchResults('Tashkent', {
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
    console.log(\`Found \${results.length} search results\`);
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
clearFunction();`
</script>

<template>
  <div id="search">
    <div class="container">
      <h2>Search</h2>
      <p>
        Search for locations and display the results on your map.
      </p>
    </div>

    <div class="container">
      <h3>Highlighting Search Results</h3>
      <p>
        You can perform a search and display the results on the map. The search is performed around the <span>current map center</span>.
      </p>
    </div>
    <Code
      :code="searchCode"
      language="typescript"
      filename="search.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>Advanced Search Configuration</h3>
      <p>
        The <span>highlightSearchResults</span> method accepts comprehensive configuration options:
      </p>
    </div>
    <Code
      :code="advancedSearchCode"
      language="typescript"
      filename="advanced-search.ts"
      file-type="TS"
    />

    <div class="container">
      <div class="config-options">
        <h4>Configuration Options:</h4>
        <ul>
          <li><span>layerName</span>: Custom name for the search results layer</li>
          <li><span>iconImage</span>: Custom icon image to use for search results</li>
          <li><span>highlightColor</span>: Color for highlighting search results</li>
          <li><span>pulseAnimation</span>: Enable/disable pulse animation effect</li>
          <li><span>zoomToResults</span>: Automatically zoom to fit search results</li>
          <li><span>onIconClick</span>: Callback when a search result icon is clicked</li>
          <li><span>onResultsUpdate</span>: Callback when search results are updated</li>
          <li><span>onLoadingStateChange</span>: Callback for loading state changes</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="features-info">
        <h4>Features:</h4>
        <ul>
          <li>Automatic re-searching when the map is moved (debounced)</li>
          <li>Distance-based filtering (minimum 500m movement triggers re-search)</li>
          <li>Automatic cleanup of previous search results</li>
          <li>Real-time loading state tracking</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
#search {
  padding: 200px 0;

  .container {
    margin: 50px auto;

    h2 {
      font-weight: 600;
      font-size: 32px;
      text-align: center;
      margin-bottom: 20px;
    }

    h3 {
      font-weight: 600;
      font-size: 24px;
      text-align: center;
      margin-bottom: 20px;
    }

    h4 {
      font-weight: 600;
      font-size: 20px;
      text-align: center;
      color: #555;
      margin: 20px 0;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      text-align: center;
      max-width: 600px;
      margin: 20px auto;

      span {
        color: #fe6d00;
        font-weight: 700;
      }
    }

    .config-options, .features-info {
      max-width: 800px;
      margin: 0 auto;
      text-align: left;

      h4 {
        text-align: center;
        margin-bottom: 20px;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          padding: 8px 0;
          font-size: 16px;
          border-bottom: 1px solid #eee;

          span {
            color: #fe6d00;
            font-weight: 700;
            font-family: monospace;
          }
        }
      }
    }

    .features-info ul {
      list-style: disc;
      padding-left: 20px;

      li {
        border-bottom: none;
        line-height: 1.5;
      }
    }
  }
}
</style>