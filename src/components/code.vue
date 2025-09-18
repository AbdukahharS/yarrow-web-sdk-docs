<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css' // Light theme
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import clipboard from '../assets/clipboard.svg'

const { t } = useI18n()

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
  color: black;
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
  background: rgba(255, 255, 255, 0.25);
  border-radius: 50px;
  border: 1px solid #ffffff;
}

.code .head {
  position: relative;
  z-index: 3;
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
      color: #000; /* Darker text for better contrast on light bg */
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
