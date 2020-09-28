<template>
  <div
    v-if="results.issuesFound"
    class="va-popup__body"
  >
    <PopupLoading v-show="loading" />
    <div class="va-popup__body-info">
      <span>{{ results.issuesFound }} issue{{ results.issuesFound > 1 ? 's' : '' }} found</span>
      <span>{{ results.lastAudition }}</span>
    </div>
    <ul class="va-popup-list">
      <li
        v-for="(result, key) in results.impacts"
        :key="key"
        class="va-popup-item"
      >
        <template v-if="result.length">
          <div class="va-popup-item__header">
            <span :class="`va-popup-item__header--${key}`">{{ key }}</span>
            <span>{{ result.length }} issues</span>
          </div>
          <ul class="va-popup-sublist">
            <WrapperCard
              v-for="(violation, index) in result"
              :key="`subitem-${violation.impact}-${index}`"
              tag="li"
              class="va-popup-subitem"
              @trigger="goViolationDetails"
            >
              <div class="va-flex">
                <span :class="`va-popup-subitem__disc va-popup-subitem__disc--${violation.impact}`">●</span>
                <span :id="`violation-${violation.id}`">
                  {{ violation.description }}
                </span>
              </div>
              <button
                type="button"
                class="va-default-btn va-popup-subitem__button"
                :aria-labelledby="`see-more-${violation.id} violation-${violation.id}`"
                @click="goViolationDetails"
              >
                <span
                  :id="`see-more-${violation.id}`"
                  class="va-sr-only"
                >See more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13.2"
                  height="6.7"
                  focusable="false"
                  aria-hidden="true"
                >
                  <path
                    d="M9.8.7l2.7 2.7m0 0L9.8 6m2.7-2.6H.5"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </WrapperCard>
          </ul>
        </template>
      </li>
    </ul>
  </div>
  <div
    v-show="!results.issuesFound"
    class="va-popup__body"
  >
    WITHOUT ERRORS
  </div>
</template>

<script>
import { inject } from 'vue'
import { vueAxe } from '@/utils/constants'

import PopupLoading from '@/components/PopupLoading'
import WrapperCard from '@/components/WrapperCard'

export default {
  name: 'PopupBody',

  disableAxeAudit: true,

  components: {
    WrapperCard,
    PopupLoading
  },

  setup () {
    const { loading, results } = inject(vueAxe)

    function goViolationDetails () {
      console.log('yes')
    }

    return {
      loading,
      results,
      goViolationDetails
    }
  }
}
</script>

<style scoped>
.va-popup__body {
  position: relative;
  z-index: 1;
  padding: var(--padding);
  background-color: white;
  min-height: 300px;
  max-height: 55vh;
  overflow: auto;
}

@media (min-height: 569px) {
  .va-popup__body {
    max-height: 60vh;
  }
}

.va-popup__body::-webkit-scrollbar {
  width: 10px;
}

.va-popup__body::-webkit-scrollbar-thumb {
  background: #DFE8E8;
  border-radius: 20px;
}

.va-popup__body::-webkit-scrollbar-track {
  background: #F2F8F8;
  border-radius: 20px;
}

.va-popup__body-info {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

.va-popup-list {
  margin-top: 26px;
}

.va-popup-item {
  margin-bottom: 20px;
}

.va-popup-item__header {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 10px;
  background-color: var(--va-bg-item);
  border: 1px solid var(--va-border-color);
  border-radius: 8px 8px 0 0 ;
}

.va-popup-item__header > span:first-child {
  text-transform: capitalize;
}

.va-popup-item__header--critical {
  color: var(--va-critical);
}
.va-popup-item__header--serious {
  color: var(--va-serious);
}
.va-popup-item__header--moderate {
  color: var(--va-moderate);
}
.va-popup-item__header--minor {
  color: var(--va-minor);
}

.va-popup-sublist {
  margin-top: 8px;
}

.va-popup-subitem {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 14px 4px;
  font-size: 1rem;
}

.va-popup-subitem:not(:last-child) {
  border-bottom: 1px solid var(--va-border-color);
}

.va-popup-subitem:hover, .va-popup-subitem:focus-within {
  background-color: var(--va-bg-item);
  border-radius: 4px;
}

.va-popup-subitem__disc {
  padding-left: 4px;
  padding-right: 8px;
}

.va-popup-subitem__disc--critical {
  color: var(--va-critical);
}

.va-popup-subitem__disc--serious {
  color: var(--va-serious);
}

.va-popup-subitem__disc--moderate {
  color: var(--va-moderate);
}

.va-popup-subitem__disc--minor {
  color: var(--va-minor);
}

.va-popup-subitem__button {
  position: relative;
  top: -2px;
  margin-left: 4px;
  padding: 4px 10px;
}

</style>
