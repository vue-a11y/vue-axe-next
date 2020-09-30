<template>
  <div class="va-bg-main">
    <PopupLoading v-show="loading" />
    <div class="va-flex va-justify-between va-font-medium">
      <span>{{ results.issuesFound }} issue{{ results.issuesFound > 1 ? 's' : '' }} found</span>
      <span>{{ results.lastAudition }}</span>
    </div>
    <ul class="va-mt-6">
      <li
        v-for="(result, key) in results.impacts"
        :key="key"
        class="va-mb-4"
      >
        <template v-if="result.length">
          <div class="va-p-item__header va-bg-primary va-flex va-justify-between va-font-medium va-p-3 va-border va-border-solid va-border-gray-300">
            <span :class="`va-capitalize va-text-${key}`">{{ key }}</span>
            <span>{{ result.length }} issues</span>
          </div>
          <ul class="va-mt-2">
            <WrapperCard
              v-for="violation in result"
              :key="`subitem-${violation.id}`"
              tag="li"
              class="va-p-subitem va-px-2 va-py-3 va-flex va-justify-between va-items-start hover:va-bg-primary"
              @trigger="$emit('show-details', violation)"
            >
              <div class="va-flex va-items-start">
                <span :class="`va-text-${violation.impact} va-text-2xl va-font-bold va-leading-4 va-mr-2`">&#8226;</span>
                <span :id="`violation-${violation.id}`">
                  {{ violation.description }}.
                  <em v-show="violation.nodes.length > 1">
                    ({{ `${violation.nodes.length}` }} elements)
                  </em>
                </span>
              </div>
              <button
                type="button"
                class="va-btn va-relative va-ml-2 va-pt-1 va-pb-2 va-px-3"
                style="top: -2px"
                :aria-labelledby="`see-more-${violation.id} violation-${violation.id}`"
                @click="$emit('show-details', violation)"
              >
                <span
                  :id="`see-more-${violation.id}`"
                  class="va-sr-only"
                >See more</span>
                <IconArrowNarrow />
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
import IconArrowNarrow from '@/components/IconArrowNarrow'

export default {
  name: 'PopupBodyViolations',

  components: {
    WrapperCard,
    PopupLoading,
    IconArrowNarrow
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

<style>
.va-p-item__header {
  border-radius: 8px 8px 0 0 ;
}

.va-p-subitem:not(:last-child) {
  border-bottom: 1px solid var(--va-border-color);
}

.va-p-subitem:focus-within {
  background-color: var(--va-primary);
}
</style>
