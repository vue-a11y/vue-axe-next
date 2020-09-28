<template>
  <div
    class="va-p"
    :dir="dir"
  >
    <transition name="scale">
      <div
        v-show="isOpen"
        id="va-p-box"
        class="va-p__box"
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
@import '../styles/vars.css';
@import '../styles/utility.css';

.va-p * {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.va-p {
  font-family: var(--va-font-family);
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

  &__box {
    width: 100%;
    min-width: 280px;
    transition: transform .3s ease-in-out, opacity .2s, visibility .2s;
    transform-origin: bottom right;
    transform: scale3d(1,1,1);
    border-radius: 10px;
    margin-bottom: 10px;
    box-shadow: 2px 2px 4px #ccc;
    background-color: var(--va-bg);
    border: 1px solid var(--va-border-color);
    overflow: hidden;
  }

  &[dir="ltr"] {
    text-align: left;
  }

  &[dir="rtl"] {
    left: 20px;
    right: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
}

.va-p[dir="rtl"] .va-p-box {
  transform-origin: bottom left;
}

.va-p__box {
  &.scale-enter-from, &.scale-leave-active {
    transform: scale3d(0,0,0);
  }

  ul {
    list-style-type: none;
  }

  @media (min-width: 420px) {
    width: 420px;
  }
}

@media screen and (prefers-reduced-motion: reduce), (update: slow) {
  .va-p * {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important; /* Hat tip Nick/cssremedy (https://css-tricks.com/revisiting-prefers-reduced-motion-the-reduced-motion-media-query/#comment-1700170) */
    transition-duration: 0.001ms !important;
  }
}
</style>
