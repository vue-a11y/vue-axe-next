<template>
  <div class="va-details">
    <div class="va-flex va-justify-between">
      <button
        type="button"
        class="va-btn"
        @click="$emit('hide-details')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.2"
          height="6.7"
          focusable="false"
          aria-hidden="true"
          style="transform: rotate(180deg)"
        >
          <path
            d="M9.8.7l2.7 2.7m0 0L9.8 6m2.7-2.6H.5"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Back</span>
      </button>
      <span :class="`va-font-medium va-capitalize va-${details.impact}`">
        {{ details.impact }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PopupBodyDetails',

  props: {
    details: {
      type: Object,
      default: null
    }
  },

  emits: ['hide-details'],

  disableAxeAudit: true
}
</script>

<style scoped>
.va-details {
  background-color: var(--va-bg);
}
</style>
