<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="hero">
    <h1><span>Yarrow Map</span> {{ t('hero.title') }}</h1>
    <p>
      {{ t('hero.subtitle') }}
    </p>
    <a href="#getting-started" class="btn-animate">{{ t('hero.cta') }}</a>
  </div>
</template>

<style scoped>
.hero {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 2em;
  color: var(--text-primary);

  h1 {
    font-weight: 600;
    font-size: 36px;
    text-align: center;
    color: var(--text-primary);

    span {
      color: var(--accent-color);
      font-weight: 700;
    }
  }

  p {
    font-weight: 500;
    font-size: 20px;
    max-width: 680px;
    margin-top: 24px;
    text-align: center;
    color: var(--text-secondary);
  }

  a {
    display: block;
    background: linear-gradient(180deg, var(--accent-color) -72%, var(--bg-secondary) 311%);
    color: #ffffff;
    text-decoration: none;
    font-weight: 700;
    font-size: 18px;
    padding: 14px 52px;
    border-radius: 20px;
    margin-top: 50px;
    transition: all 0.3s ease;
  }
}
</style>
