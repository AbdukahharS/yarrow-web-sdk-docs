<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Code from '../components/code.vue'
import flutterDocsEnRaw from '../../FLUTTER_DOCS.md?raw'
import flutterDocsRuRaw from '../../FLUTTER_DOCS_RU.md?raw'
import flutterDocsUzRaw from '../../FLUTTER_DOCS_UZ.md?raw'

type DocBlock =
  | { type: 'heading'; level: number; text: string; id: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'code'; language: string; content: string }

const toHeadingId = (value: string) =>
  value
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const renderInlineMarkdown = (value: string) => {
  const escaped = escapeHtml(value)
  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

const { locale } = useI18n()

const docsRaw = computed(() => {
  if (locale.value === 'ru') return flutterDocsRuRaw
  if (locale.value === 'uz') return flutterDocsUzRaw
  return flutterDocsEnRaw
})

const canonicalHeadingIds = computed(() =>
  flutterDocsEnRaw
    .split('\n')
    .filter((line) => /^(#{1,6})\s+(.+)$/.test(line))
    .map((line) => {
      const match = line.match(/^(#{1,6})\s+(.+)$/)
      return toHeadingId(match?.[2]?.trim() ?? line)
    })
)

const fileTypeFromLanguage = (language: string) => {
  const normalized = language.toLowerCase()
  if (normalized === 'dart') return 'DART'
  if (normalized === 'bash') return 'BASH'
  if (normalized === 'json') return 'JSON'
  if (normalized === 'yaml') return 'YAML'
  return normalized.toUpperCase()
}

const filenameFromLanguage = (language: string, index: number) => {
  const normalized = language.toLowerCase()
  if (normalized === 'dart') return `example-${index + 1}.dart`
  if (normalized === 'bash') return `example-${index + 1}.sh`
  if (normalized === 'json') return `example-${index + 1}.json`
  if (normalized === 'yaml') return `example-${index + 1}.yaml`
  return `example-${index + 1}.txt`
}

const blocks = computed<DocBlock[]>(() => {
  const lines = docsRaw.value.split('\n')
  const parsed: DocBlock[] = []

  let inCode = false
  let codeLanguage = 'text'
  let codeLines: string[] = []
  let paragraphLines: string[] = []
  let listItems: string[] = []
  let headingIndex = 0

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      parsed.push({ type: 'paragraph', text: paragraphLines.join(' ').trim() })
      paragraphLines = []
    }
  }

  const flushList = () => {
    if (listItems.length > 0) {
      parsed.push({ type: 'list', items: [...listItems] })
      listItems = []
    }
  }

  const flushCode = () => {
    if (codeLines.length > 0) {
      parsed.push({
        type: 'code',
        language: codeLanguage,
        content: codeLines.join('\n')
      })
      codeLines = []
    }
  }

  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        flushCode()
        inCode = false
        codeLanguage = 'text'
      } else {
        flushParagraph()
        flushList()
        inCode = true
        codeLanguage = line.replace('```', '').trim() || 'text'
      }
      continue
    }

    if (inCode) {
      codeLines.push(line)
      continue
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      flushList()
      const text = headingMatch[2].trim()
      parsed.push({
        type: 'heading',
        level: headingMatch[1].length,
        text,
        id: canonicalHeadingIds.value[headingIndex] ?? toHeadingId(text)
      })
      headingIndex += 1
      continue
    }

    if (line.startsWith('- ')) {
      flushParagraph()
      listItems.push(line.slice(2).trim())
      continue
    }

    if (line.trim() === '') {
      flushParagraph()
      flushList()
      continue
    }

    flushList()
    paragraphLines.push(line.trim())
  }

  flushParagraph()
  flushList()
  flushCode()

  return parsed
})
</script>

<template>
  <div class="sdk-page flutter-page">
    <article id="flutter-hero" class="flutter-docs">
      <template v-for="(block, index) in blocks" :key="index">
        <component
          :is="`h${block.level}`"
          v-if="block.type === 'heading'"
          class="doc-heading"
          :id="block.id"
          v-html="renderInlineMarkdown(block.text)"
        />

        <p
          v-else-if="block.type === 'paragraph'"
          class="doc-paragraph"
          v-html="renderInlineMarkdown(block.text)"
        />

        <ul v-else-if="block.type === 'list'" class="doc-list">
          <li
            v-for="(item, itemIndex) in block.items"
            :key="itemIndex"
            v-html="renderInlineMarkdown(item)"
          />
        </ul>

        <Code
          v-else-if="block.type === 'code'"
          :code="block.content"
          :language="block.language"
          :filename="filenameFromLanguage(block.language, index)"
          :file-type="fileTypeFromLanguage(block.language)"
        />
      </template>
    </article>
  </div>
</template>

<style scoped>
.sdk-page {
  width: 100%;
}

.flutter-page {
  padding: 170px 0 120px;
}

.flutter-docs {
  max-width: 900px;
  margin: 0 auto;
  color: var(--text-primary);
}

.flutter-docs :deep(.doc-heading) {
  margin: 0;
  color: var(--text-primary);
  text-align: center;
}

.flutter-docs :deep(h1.doc-heading) {
  font-weight: 700;
  font-size: 46px;
  margin-bottom: 22px;
}

.flutter-docs :deep(h2.doc-heading) {
  font-weight: 600;
  font-size: 28px;
  margin-top: 78px;
  margin-bottom: 18px;
}

.flutter-docs :deep(h3.doc-heading) {
  font-weight: 600;
  font-size: 22px;
  margin-top: 58px;
  margin-bottom: 12px;
}

.flutter-docs :deep(.doc-paragraph),
.flutter-docs :deep(.doc-list li) {
  font-weight: 500;
  font-size: 20px;
  line-height: 1.6;
  color: var(--text-secondary);
  text-align: center;
}

.flutter-docs :deep(.doc-paragraph) {
  max-width: 860px;
  margin: 0 auto 16px;
}

.flutter-docs :deep(.doc-list) {
  max-width: 860px;
  margin: 0 auto 18px;
  padding-left: 24px;
  text-align: left;
}

.flutter-docs :deep(.doc-list li) {
  text-align: left;
  margin-bottom: 8px;
}

.flutter-docs :deep(code) {
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.95em;
  color: #fe6d00;
}

@media screen and (max-width: 768px) {
  .flutter-page {
    padding: 145px 0 80px;
  }

  .flutter-docs :deep(h1.doc-heading) {
    font-size: 34px;
    margin-bottom: 20px;
  }

  .flutter-docs :deep(h2.doc-heading) {
    font-size: 24px;
    margin-top: 52px;
  }

  .flutter-docs :deep(h3.doc-heading) {
    font-size: 20px;
    margin-top: 42px;
  }

  .flutter-docs :deep(.doc-paragraph),
  .flutter-docs :deep(.doc-list li) {
    font-size: 17px;
  }
}
</style>
