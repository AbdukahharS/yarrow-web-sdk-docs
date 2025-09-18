<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from './code.vue'

const { t } = useI18n()

const searchCode = computed(() => `const query = 'Tashkent';

const clearHighlights = yarrowMap.highlightSearchResults(query, {
  zoomToResults: true, // ${t('search.codeComments.autoZoomToResults')}
  onResultsUpdate: (results) => {
    console.log('${t('search.codeComments.searchResults')}', results);
  },
  onLoadingStateChange: (state) => {
    // ${t('search.codeComments.stateCanBe')}
    console.log('${t('search.codeComments.loadingState')}', state);
  }
});

// ${t('search.codeComments.removeResults')}
// clearHighlights();`)

const advancedSearchCode = computed(() => `const clearFunction = yarrowMap.highlightSearchResults('Tashkent', {
  layerName: 'my-search-layer',           // ${t('search.codeComments.customLayerName')}
  iconImage: 'custom-search-icon',        // ${t('search.codeComments.customIconImageName')}
  highlightColor: '#ff6b35',              // ${t('search.codeComments.customHighlightColor')}
  pulseAnimation: true,                   // ${t('search.codeComments.enablePulseAnimation')}
  zoomToResults: false,                   // ${t('search.codeComments.autoZoomToResultsDefault')}

  // ${t('search.codeComments.eventHandlers')}
  onIconClick: (lat, lng, properties) => {
    console.log('${t('search.codeComments.searchResultClicked')}', { lat, lng, properties });
    // ${t('search.codeComments.customClickBehavior')}
  },

  onResultsUpdate: (results) => {
    console.log(\`${t('search.codeComments.foundResults', { count: '${results.length}' })}\`);
    // ${t('search.codeComments.handleResults')}
  },

  onLoadingStateChange: (state) => {
    // ${t('search.codeComments.stateCanBe')}
    if (state === 'firstRender') {
      console.log('${t('search.codeComments.initialLoading')}');
    } else if (state === 'rerender') {
      console.log('${t('search.codeComments.updatingResults')}');
    } else {
      console.log('${t('search.codeComments.loadingComplete')}');
    }
  }
});

// ${t('search.codeComments.clearFunction')}
clearFunction();`)
</script>

<template>
  <div id="search">
    <div class="container">
      <h2>{{ t('search.title') }}</h2>
      <p>
        {{ t('search.description') }}
      </p>
    </div>

    <div class="container">
      <h3>{{ t('search.highlighting.title') }}</h3>
      <p>
        {{ t('search.highlighting.description', { currentMapCenter: 'current map center' }) }}
      </p>
    </div>
    <Code
      :code="searchCode"
      language="typescript"
      filename="search.ts"
      file-type="TS"
    />

    <div class="container">
      <h3>{{ t('search.advancedConfig.title') }}</h3>
      <p>
        {{ t('search.advancedConfig.description', { highlightSearchResults: 'highlightSearchResults' }) }}
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
        <h4>{{ t('search.configOptions.title') }}</h4>
        <ul>
          <li><span>layerName</span>: {{ t('search.configOptions.layerName') }}</li>
          <li><span>iconImage</span>: {{ t('search.configOptions.iconImage') }}</li>
          <li><span>highlightColor</span>: {{ t('search.configOptions.highlightColor') }}</li>
          <li><span>pulseAnimation</span>: {{ t('search.configOptions.pulseAnimation') }}</li>
          <li><span>zoomToResults</span>: {{ t('search.configOptions.zoomToResults') }}</li>
          <li><span>onIconClick</span>: {{ t('search.configOptions.onIconClick') }}</li>
          <li><span>onResultsUpdate</span>: {{ t('search.configOptions.onResultsUpdate') }}</li>
          <li><span>onLoadingStateChange</span>: {{ t('search.configOptions.onLoadingStateChange') }}</li>
        </ul>
      </div>
    </div>

    <div class="container">
      <div class="features-info">
        <h4>{{ t('search.features.title') }}</h4>
        <ul>
          <li>{{ t('search.features.autoResearch') }}</li>
          <li>{{ t('search.features.distanceFiltering') }}</li>
          <li>{{ t('search.features.autoCleanup') }}</li>
          <li>{{ t('search.features.realTimeLoading') }}</li>
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