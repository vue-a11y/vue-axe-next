<template>
  <div class="va-popup__footer">
    <button
      class="va-popup__btn-run va-nostyle-button"
      type="button"
      aria-labelledby="va-btn-run-label"
      @click="run({ force: true })"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12.4"
        height="14.2"
        focusable="false"
        aria-hidden="true"
      >
        <path d="M.9 0a.9.9 0 01.9.9v1.9A6.2 6.2 0 0112 5a.9.9 0 11-1.7.6 4.4 4.4 0 00-7.7-1.2h2.6a.9.9 0 110 1.8H1a.9.9 0 01-.9-.9V1A.9.9 0 01.9 0zm0 8a.9.9 0 011.1.6 4.4 4.4 0 007.8 1.2H7a.9.9 0 010-1.8h4.4a.9.9 0 011 .9v4.4a.9.9 0 11-1.8 0v-1.8A6.2 6.2 0 01.4 9.2.9.9 0 01.9 8z" fill-rule="evenodd"/>
      </svg>
      <span id="va-btn-run-label">Run again</span>
    </button>
  </div>
</template>

<script>
import { inject } from 'vue'
import { vueAxe } from '../utils/constants'

export default {
  name: 'PopupFooter',

  setup () {
    const { run } = inject(vueAxe)

    return {
      run
    }
  }
}
</script>

<style scoped>
.va-popup__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--va-border-color);
  background-color: var(--va-bg);
  color: var(--va-color);
}

.va-popup__btn-run {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  font-family: inherit;
  padding: 14px 20px;
  border-right: 1px solid var(--va-border-color);
}

.va-popup__btn-run > span {
  margin-left: 8px;
  font-size: 1rem;
  font-weight: 500;
}
</style>
