<template>
  <div class="vue-focus-loop">
    <div
      :tabindex="getTabindex"
      @focus="handleFocusStart"
    />
    <div ref="focusLoopRef">
      <slot />
    </div>
    <div
      :tabindex="getTabindex"
      @focus="handleFocusEnd"
    />
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'

const focusableElementsSelector = [
  ...['input', 'select', 'button', 'textarea'].map(field => `${field}:not([disabled])`),
  'a[href]',
  'video[controls]',
  'audio[controls]',
  '[tabindex]:not([tabindex^="-"])',
  '[contenteditable]:not([contenteditable="false"])'
].join(',')

export default {
  name: 'FocusLoop',

  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: false
    }
  },

  disableAxeAudit: true,

  setup (props) {
    const focusLoopRef = ref(null)
    const alreadyFocused = ref(false)
    const getTabindex = computed(() => props.disabled ? -1 : 0)

    watch(() => props.isVisible, focusFirst)

    onMounted(() => focusFirst(props.isVisible || true))

    function focusFirst (visible) {
      if (visible) {
        const elements = getFocusableElements()
        if (elements.length) setTimeout(() => elements[0].focus(), 200)
      }
    }

    function getFocusableElements () {
      const focusableElements = focusLoopRef.value.querySelectorAll(focusableElementsSelector)
      if (focusableElements && focusableElements.length) return focusableElements
      return []
    }

    function handleFocusStart () {
      const elements = getFocusableElements()
      if (elements.length) {
        const index = alreadyFocused.value ? elements.length - 1 : 0
        alreadyFocused.value = true
        elements[index].focus()
      }
    }

    function handleFocusEnd () {
      const elements = getFocusableElements()
      elements.length && elements[0].focus()
    }

    return {
      focusLoopRef,
      getTabindex,
      handleFocusEnd,
      handleFocusStart
    }
  }
}
</script>
