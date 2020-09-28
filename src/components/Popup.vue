<template>
  <div
    class="va-popup"
    :dir="dir"
  >
    <transition name="scale">
      <div
        v-show="isOpen"
        id="va-popup-box"
        class="va-popup__box"
      >
        <PopupHeader />
        <PopupBody />
        <PopupFooter />
      </div>
    </transition>
    <PopupButton
      :popup-show="isOpen"
      :notifications="issuesFound"
      @toggle-popup="togglePopup"
    />
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import useDisclosure from '@/composables/useDisclosure'
import { vueAxe } from '@/utils/constants'

import PopupButton from '@/components/PopupButton'
import PopupHeader from '@/components/PopupHeader'
import PopupBody from '@/components/PopupBody'
import PopupFooter from '@/components/PopupFooter'

export default {
  name: 'Popup',

  disableAxeAudit: true,

  components: {
    PopupHeader,
    PopupBody,
    PopupFooter,
    PopupButton
  },

  props: {
    dir: {
      type: String,
      default: 'ltr'
    }
  },

  setup () {
    const { results } = inject(vueAxe)
    const { isOpen, toggle: togglePopup } = useDisclosure()

    const issuesFound = computed(() => {
      if (!results.value.issuesFound) return 0
      return results.value.issuesFound
    })

    return {
      isOpen,
      togglePopup,
      issuesFound
    }
  }
}
</script>

<style>
:root {
  --va-bg: white;
  --padding: 16px;
  --va-color: #333;
  --va-bg-item: #fbfcfc;
  --va-border-color: #dfe8e8;
  --va-outline-color: var(--va-color);
  --va-critical: #D93251;
  --va-serious:#DB006E;
  --va-moderate: #996B00;
  --va-minor: #000;
  --font-family: 'Segoe UI', Roboto, 'Fira Sans', Helvetica, 'Helvetica Neue', sans-serif;
}

.va-popup * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.va-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.va-default-btn {
  background: none;
  border: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  font-family: inherit;
}

.va-flex {
  display: flex;
}

.va-popup {
  font-family: var(--font-family);
  position: fixed;
  z-index: 999;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 420px;
  margin-left: 20px;
  -webkit-font-smoothing: antialiased;
}

.va-popup[dir="ltr"] {
  text-align: left;
}

.va-popup[dir="rtl"] {
  left: 20px;
  right: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.va-popup[dir="rtl"] .va-popup-box {
  transform-origin: bottom left;
}

.va-popup__box {
  width: 100%;
  min-width: 280px;
  transition: transform .3s ease-in-out, opacity .2s, visibility .2s;
  transform-origin: bottom right;
  transform: scale3d(1,1,1);
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 2px 2px 4px #ccc;
  background-color: #fbfbfb;
  border: 1px solid var(--va-border-color);
  overflow: hidden;
}

.va-popup__box.scale-enter-from, .va-popup__box.scale-leave-active {
  transform: scale3d(0,0,0);
}

.va-popup__box ul {
  list-style-type: none;
}

@media screen and (prefers-reduced-motion: reduce), (update: slow) {
  .va-popup * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important; /* Hat tip Nick/cssremedy (https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/#comment-1700170) */
    transition-duration: 0.001ms !important;
  }
}
</style>
