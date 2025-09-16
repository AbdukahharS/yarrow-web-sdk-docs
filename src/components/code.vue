<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css' // Light theme
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import clipboard from '../assets/clipboard.svg'

interface Props {
  code: string
  language?: string
  filename?: string
  fileType?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
  filename: 'code.ts',
  fileType: 'TS'
})

const highlightedCode = ref('')
const copied = ref(false)

const prismLanguage = computed(() => {
  return Prism.languages[props.language] || Prism.languages.typescript
})

onMounted(() => {
  highlightedCode.value = Prism.highlight(
    props.code,
    prismLanguage.value,
    props.language
  )
})

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code: ', err)
  }
}
</script>

<template>
  <div class="code">
    <div class="head">
      <div class="file-info">
        <span>{{ props.fileType }}</span>
        <p>{{ props.filename }}</p>
      </div>
      <button class="copy-button icon-animate" @click="copyToClipboard">
        <img v-if="!copied" :src="clipboard" alt="copy" />
        <span v-if="copied" class="copied-text">Copied!</span>
      </button>
    </div>
    <div class="body">
      <pre><code class="language-typescript" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<style scoped>
.code {
  max-width: 837px;
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ffffff;
  background: #72727205;
  border-radius: 50px;

  .head {
    background: #ffffff;
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    padding: 17px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .file-info {
      display: flex;
      align-items: center;
      gap: 15px;

      span {
        background: #f8ae76;
        border-radius: 12px;
        padding: 6px 18px;
        font-size: 20px;
        font-weight: 600;
        color: #fff;
      }

      p {
        font-size: 20px;
        font-weight: 500;
        color: #fe6d00;
      }
    }

    .copy-button {
      background: none;
      border: none;
      cursor: pointer;

      .copied-text {
        color: #fe6d00;
        font-weight: 600;
        font-size: 14px;
      }
    }
  }

  .body {
    padding: 34px 42px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;

    pre {
      margin: 0;
      padding: 0;
      background: transparent;
      overflow-x: auto;

      code {
        font-family: 'Inter', 'Fira Code', 'Consolas', 'Monaco', monospace;
        font-size: 20px;
        line-height: 1.5;
        font-weight: 500;
        color: #000; /* Darker text for better contrast on light bg */
      }
    }
  }
}

/* Custom syntax highlighting colors for light background */
:deep(.token.comment) {
  color: #a0a2c0;
}

:deep(.token.string) {
  color: #898fff;
}

:deep(.token.number) {
  color: #8db390;
}

:deep(.token.keyword) {
  color: #0ba115;
}

:deep(.token.function) {
  color: #898fff;
}

:deep(.token.punctuation) {
  color: #24292e;
}

:deep(.token.property) {
  color: #005cc5;
}
</style>
