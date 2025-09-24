<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDarkMode } from '../composables/useDarkMode'

const { t, locale } = useI18n()
const { isDarkMode, toggleDarkMode } = useDarkMode()

const isLanguageDropdownOpen = ref(false)

const changeLocale = (newLocale: string) => {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  isLanguageDropdownOpen.value = false
}

const toggleLanguageDropdown = () => {
  isLanguageDropdownOpen.value = !isLanguageDropdownOpen.value
}

// Close dropdown when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('.language-switcher')) {
    isLanguageDropdownOpen.value = false
  }
}

// Add event listener when dropdown is open
const setupClickOutside = () => {
  if (isLanguageDropdownOpen.value) {
    document.addEventListener('click', handleClickOutside)
  } else {
    document.removeEventListener('click', handleClickOutside)
  }
}

// Watch for dropdown state changes
import { watch } from 'vue'
watch(isLanguageDropdownOpen, setupClickOutside)
</script>

<template>
  <div class="floating-controls">
    <!-- Language Switcher with Globe Icon -->
    <div class="language-switcher">
      <button
        @click="toggleLanguageDropdown"
        class="control-btn language-btn"
        :class="{ active: isLanguageDropdownOpen }"
        :aria-label="t('ui.language')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
        </svg>
      </button>

      <!-- Language Dropdown -->
      <div
        v-if="isLanguageDropdownOpen"
        class="language-dropdown"
      >
        <button
          @click="changeLocale('en')"
          :class="{ active: locale === 'en' }"
          class="lang-option"
        >
          EN
        </button>
        <button
          @click="changeLocale('uz')"
          :class="{ active: locale === 'uz' }"
          class="lang-option"
        >
          UZ
        </button>
        <button
          @click="changeLocale('ru')"
          :class="{ active: locale === 'ru' }"
          class="lang-option"
        >
          RU
        </button>
      </div>
    </div>

    <!-- Theme Switcher -->
    <button
      @click="toggleDarkMode"
      class="control-btn theme-btn"
      :aria-label="isDarkMode ? t('ui.switchToLight') : t('ui.switchToDark')"
    >
      <span class="theme-icon" :class="{ 'dark-active': isDarkMode }">
        <svg v-if="!isDarkMode" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor"/>
          <path d="M12 6V3M12 21V18M6 12H3M21 12H18M7.05 7.05L4.93 4.93M19.07 4.93L16.95 7.05M7.05 16.95L4.93 19.07M19.07 19.07L16.95 16.95" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor"/>
        </svg>
      </span>
    </button>
  </div>
</template>

<style scoped>
.floating-controls {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.control-btn {
  background: var(--bg-secondary);
  border: 1px solid var(--text-muted);
  color: var(--text-muted);
  padding: 12px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  box-shadow: 0 2px 8px var(--shadow-color);
  backdrop-filter: blur(10px);
}

.control-btn:hover {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background: rgba(254, 109, 0, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-color);
}

.language-switcher {
  position: relative;
}

.language-btn.active {
  border-color: var(--accent-color);
  color: var(--accent-color);
  background: rgba(254, 109, 0, 0.1);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 50%;
  transform: translateX(50%);
  background: var(--bg-secondary);
  border: 1px solid var(--text-muted);
  border-radius: 12px;
  padding: 8px;
  min-width: 80px;
  box-shadow: 0 4px 16px var(--shadow-color);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.lang-option {
  background: transparent;
  border: none;
  color: var(--text-muted);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.lang-option:hover {
  background: rgba(254, 109, 0, 0.1);
  color: var(--accent-color);
}

.lang-option.active {
  background: var(--accent-color);
  color: #ffffff;
}

.theme-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
}

.theme-icon svg {
  transition: all 0.3s ease;
}

.theme-icon.dark-active {
  transform: rotate(360deg);
}

/* Mobile responsive */
@media (max-width: 767px) {
  .floating-controls {
    top: 15px;
    right: 15px;
    gap: 8px;
  }

  .control-btn {
    width: 42px;
    height: 42px;
    padding: 10px;
  }

  .language-dropdown {
    min-width: 70px;
  }
}
</style>