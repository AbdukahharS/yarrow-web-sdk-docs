<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDarkMode } from '../composables/useDarkMode'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css' // Light theme
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import clipboard from '../assets/clipboard.svg'

const { t } = useI18n()
useDarkMode() // Ensure theme system is active

interface Props {
  code: string
  language?: string
  filename?: string
  fileType?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
  filename: 'code.ts',
  fileType: 'TS',
})

const copied = ref(false)

const prismLanguage = computed(() => {
  return Prism.languages[props.language] || Prism.languages.typescript
})

const highlightedCode = computed(() => {
  return Prism.highlight(props.code, prismLanguage.value, props.language)
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
        <img v-if="!copied" :src="clipboard" :alt="t('code.copy')" />
        <span v-if="copied" class="copied-text">{{ t('code.copied') }}</span>
      </button>
    </div>
    <div class="body">
      <pre><code class="language-typescript" v-html="highlightedCode"></code></pre>
    </div>
  </div>
</template>

<style scoped>
.code {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 837px;
  width: 100%;
  margin: 0 auto;
  border-radius: 50px;
  overflow: hidden;
  color: var(--text-primary);
  font-weight: 600;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
}

.code::before {
  content: '';
  position: absolute;
  z-index: 0;
  inset: 0;
  backdrop-filter: blur(0.5px);
  -webkit-backdrop-filter: blur(0.5px);
  filter: url(#glass-distortion);
  overflow: hidden;
  isolation: isolate;
}

.code::after {
  content: '';
  z-index: 1;
  position: absolute;
  inset: 0;
  background: var(--bg-glass);
  border-radius: 50px;
  border: 1px solid var(--border-color);
}

.code .head {
  position: relative;
  z-index: 3;
  background: var(--bg-secondary);
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
      color: var(--accent-color);
    }
  }

  .copy-button {
    background: none;
    border: none;
    cursor: pointer;

    .copied-text {
      color: var(--accent-color);
      font-weight: 600;
      font-size: 14px;
    }
  }
}

.dark .code .head {
  background: var(--bg-secondary-dark);
  border-bottom: 1px solid var(--border-color);

  span {
    background: #da5c10;
  }
}

.code .body {
  position: relative;
  z-index: 3;
  padding: 34px 42px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;

  pre {
    margin: 0;
    padding: 0;
    padding-bottom: 10px;
    background: transparent;
    overflow-x: auto;

    code {
      font-family: 'Inter', 'Fira Code', 'Consolas', 'Monaco', monospace;
      font-size: 20px;
      line-height: 1.5;
      font-weight: 500;
      color: var(--text-primary);
      text-shadow: none !important;
    }
  }
}

/* Dark mode code background */
:root.dark .code .body {
  background: rgba(26, 26, 26, 0.3);
}


@media screen and (max-width: 768px) {
  .code {
    border-radius: 30px;

    .head {
      padding: 15px 25px;
      border-top-left-radius: 30px;
      border-top-right-radius: 30px;

      .file-info p {
        font-size: 16px;
      }

      .file-info span {
        font-size: 16px;
        padding: 4px 12px;
      }
    }

    .body {
      padding: 20px 25px;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;

      pre code {
        font-size: 16px;
      }
    }

    &::after {
      border-radius: 30px;
    }
  }
}
</style>

<style>
/* Remove PrismJS default backgrounds and reset all tokens */
.token {
  background: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
  border-radius: 0 !important;
}

/* Global syntax highlighting colors - light theme */
.token.comment {
  color: #a0a2c0;
  transition: color 0.15s ease-out;
  background: none !important;
}

.token.string {
  color: #898fff;
  transition: color 0.15s ease-out;
  background: none !important;
}

.token.number {
  color: #8db390;
  transition: color 0.15s ease-out;
  background: none !important;
}

.token.keyword {
  color: #0ba115;
  transition: color 0.15s ease-out;
  background: none !important;
}

.token.function {
  color: #898fff;
  transition: color 0.15s ease-out;
  background: none !important;
}

.token.punctuation {
  color: #24292e;
  transition: color 0.15s ease-out;
  background: none !important;
}

.token.property {
  color: #005cc5;
  transition: color 0.15s ease-out;
  background: none !important;
}

/* Global syntax highlighting colors - dark theme */
:root.dark .token.comment {
  color: #6a9955 !important;
  font-style: italic;
  background: none !important;
}

:root.dark .token.string {
  color: #ce9178 !important;
  background: none !important;
}

:root.dark .token.number {
  color: #b5cea8 !important;
  background: none !important;
}

:root.dark .token.keyword {
  color: #569cd6 !important;
  background: none !important;
}

:root.dark .token.function {
  color: #dcdcaa !important;
  background: none !important;
}

:root.dark .token.punctuation {
  color: #d4d4d4 !important;
  background: none !important;
}

:root.dark .token.property {
  color: #9cdcfe !important;
  background: none !important;
}

:root.dark .token.operator {
  color: #d4d4d4 !important;
  background: none !important;
}

:root.dark .token.boolean {
  color: #569cd6 !important;
  background: none !important;
}

:root.dark .token.constant {
  color: #4fc1ff !important;
  background: none !important;
}

:root.dark .token.class-name {
  color: #4ec9b0 !important;
  background: none !important;
}

:root.dark .token.variable {
  color: #9cdcfe !important;
  background: none !important;
}
</style>
