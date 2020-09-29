<template>
  <div class="va-violations">
    <PopupLoading v-show="loading" />
    <div class="va-violations-info">
      <span>{{ results.issuesFound }} issue{{ results.issuesFound > 1 ? 's' : '' }} found</span>
      <span>{{ results.lastAudition }}</span>
    </div>
    <ul class="va-p-list">
      <li
        v-for="(result, key) in results.impacts"
        :key="key"
        class="va-p-item"
      >
        <template v-if="result.length">
          <div class="va-p-item__header">
            <span :class="`va-p-item__header--${key}`">{{ key }}</span>
            <span>{{ result.length }} issues</span>
          </div>
          <ul class="va-p-sublist">
            <WrapperCard
              v-for="violation in result"
              :key="`subitem-${violation.id}`"
              tag="li"
              class="va-p-subitem"
              @trigger="$emit('show-details', violation)"
            >
              <div class="va-flex">
                <span :class="`va-p-subitem__disc va-p-subitem__disc--${violation.impact}`">●</span>
                <span :id="`violation-${violation.id}`">
                  {{ violation.description }}.
                  <em v-show="violation.nodes.length > 1">
                    ({{ `${violation.nodes.length}` }} elements)
                  </em>
                </span>
              </div>
              <button
                type="button"
                class="va-btn va-p-subitem__button"
                :aria-labelledby="`see-more-${violation.id} violation-${violation.id}`"
                @click="$emit('show-details', violation)"
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
</template>

<script>
import { inject } from 'vue'
import { vueAxe } from '@/utils/constants'

import WrapperCard from '@/components/WrapperCard'
import PopupLoading from '@/components/PopupLoading'

export default {
  name: 'PopupBodyViolations',

  components: {
    WrapperCard,
    PopupLoading
  },

  emits: ['show-details'],

  disableAxeAudit: true,

  setup () {
    const { loading, results } = inject(vueAxe)

    return {
      loading,
      results
    }
  }
}
</script>

<style scoped>
.va-violations {
  background-color: var(--va-bg);
}

.va-violations-info {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
}

.va-p-list {
  margin-top: 26px;
}

.va-p-item {
  margin-bottom: 20px;
}

.va-p-item__header {
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  padding: 10px;
  background-color: var(--va-bg-item);
  border: 1px solid var(--va-border-color);
  border-radius: 8px 8px 0 0 ;
}

.va-p-item__header > span:first-child {
  text-transform: capitalize;
}

.va-p-item__header--critical {
  color: var(--va-critical);
}
.va-p-item__header--serious {
  color: var(--va-serious);
}
.va-p-item__header--moderate {
  color: var(--va-moderate);
}
.va-p-item__header--minor {
  color: var(--va-minor);
}

.va-p-sublist {
  margin-top: 8px;
}

.va-p-subitem {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 14px 4px;
  font-size: 1rem;
}

.va-p-subitem:not(:last-child) {
  border-bottom: 1px solid var(--va-border-color);
}

.va-p-subitem:hover, .va-p-subitem:focus-within {
  background-color: var(--va-bg-item);
  border-radius: 4px;
}

.va-p-subitem__disc {
  padding-left: 4px;
  padding-right: 8px;
}

.va-p-subitem__disc--critical {
  color: var(--va-critical);
}

.va-p-subitem__disc--serious {
  color: var(--va-serious);
}

.va-p-subitem__disc--moderate {
  color: var(--va-moderate);
}

.va-p-subitem__disc--minor {
  color: var(--va-minor);
}

.va-p-subitem__button {
  position: relative;
  top: -2px;
  margin-left: 4px;
  padding: 4px 10px;
}
</style>
