<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Option {
  name: string
  value: string
}

interface Props {
  modelValue: string
  options: Option[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLDivElement | null>(null)

const selectedOption = computed(() => {
  return props.options.find(opt => opt.value === props.modelValue)
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="custom-select" ref="dropdownRef">
    <button
      type="button"
      class="select-trigger"
      :class="{ open: isOpen }"
      @click="toggleDropdown"
    >
      <span class="selected-text">{{ selectedOption?.name }}</span>
      <svg
        class="arrow"
        :class="{ rotated: isOpen }"
        width="12"
        height="12"
        viewBox="0 0 12 12"
      >
        <path fill="currentColor" d="M6 9L1 4h10z"/>
      </svg>
    </button>

    <transition name="dropdown">
      <div v-if="isOpen" class="options-container">
        <button
          v-for="option in options"
          :key="option.value"
          type="button"
          class="option"
          :class="{ selected: option.value === modelValue }"
          @click="selectOption(option)"
        >
          <span class="option-text">{{ option.name }}</span>
          <svg
            v-if="option.value === modelValue"
            class="check-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.3333 4L6 11.3333L2.66667 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.custom-select {
  position: relative;
  width: 100%;
}

.select-trigger {
  width: 100%;
  padding: 14px 16px;
  background: var(--bg-primary);
  color: var(--text-primary);
  border: 2px solid rgba(254, 109, 0, 0.15);
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  box-shadow: 0 2px 4px var(--shadow-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  &:hover {
    border-color: rgba(254, 109, 0, 0.4);
    box-shadow: 0 4px 8px var(--shadow-color);
    transform: translateY(-1px);
  }

  &:focus,
  &.open {
    border-color: #FE6D00;
    box-shadow: 0 0 0 3px rgba(254, 109, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
}

.selected-text {
  flex: 1;
}

.arrow {
  color: #FE6D00;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  margin-left: 8px;

  &.rotated {
    transform: rotate(180deg);
  }
}

.options-container {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: var(--bg-secondary);
  border: 2px solid rgba(254, 109, 0, 0.15);
  border-radius: 12px;
  box-shadow: 0 8px 24px var(--shadow-color);
  overflow: hidden;
  z-index: 1000;
}

.option {
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  color: var(--text-primary);
  border: none;
  font-size: 16px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;

  &:hover {
    background: rgba(254, 109, 0, 0.08);
  }

  &.selected {
    background: rgba(254, 109, 0, 0.12);
    color: #FE6D00;
  }

  &:not(:last-child) {
    border-bottom: 1px solid rgba(254, 109, 0, 0.08);
  }
}

.option-text {
  flex: 1;
}

.check-icon {
  color: #FE6D00;
  flex-shrink: 0;
  margin-left: 8px;
}

/* Dropdown animation */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  opacity: 0;
  transform: scaleY(0.9) translateY(-8px);
}

.dropdown-leave-to {
  opacity: 0;
  transform: scaleY(0.9) translateY(-8px);
}

/* Dark mode specific styling */
:global(:root.dark) .select-trigger {
  border-color: rgba(254, 109, 0, 0.25);

  &:hover {
    border-color: rgba(254, 109, 0, 0.5);
  }
}

:global(:root.dark) .options-container {
  border-color: rgba(254, 109, 0, 0.25);
}

:global(:root.dark) .option {
  &:hover {
    background: rgba(254, 109, 0, 0.12);
  }

  &.selected {
    background: rgba(254, 109, 0, 0.18);
  }

  &:not(:last-child) {
    border-bottom-color: rgba(254, 109, 0, 0.12);
  }
}

/* Mobile responsive styles */
@media (max-width: 767px) {
  .select-trigger {
    font-size: 15px;
    padding: 12px 14px;
  }

  .option {
    font-size: 15px;
    padding: 12px 14px;
  }
}
</style>
