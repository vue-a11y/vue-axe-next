<template>
  <div class="va-details">
    <div
      class="va-flex va-justify-between va-items-center va-relative"
      style="top: -0.75rem;"
    >
      <button
        type="button"
        class="va-btn va-flex va-items-center va-px-2 va-py-3 va-relative"
        style="left: -0.5rem;"
        @click="$emit('hide-details')"
      >
        <IconArrowNarrow class="va-transform va-rotate-180" />
        <span class="va-ml-2 va-text-base va-font-medium va-leading-3">Back</span>
      </button>
      <span :class="`va-font-medium va-capitalize va-text-${details.impact}`">
        {{ details.impact }}
      </span>
    </div>
    <section :aria-labelledby="`issue-desc-${details.id}`">
      <h2
        :id="`issue-desc-${details.id}`"
        class="va-p-item__header va-bg-primary va-flex va-justify-between va-font-medium va-p-3 va-border va-border-solid va-border-gray-300 va-text-base"
      >
        Issue description
      </h2>
      <p class="va-p-3">
        {{ details.description }}
        <br>
        <ExternalLink
          :href="details.helpUrl"
          :aria-labelledby="`more-${details.id} issue-desc-${details.id}`"
          style="margin-left: -0.25rem;"
        >
          <span :id="`more-${details.id}`">Learn more</span>
        </ExternalLink>
      </p>
    </section>
    <section
      v-show="references.length"
      :aria-labelledby="`references-${details.id}`"
    >
      <h2
        :id="`references-${details.id}`"
        class="va-p-item__header va-bg-primary va-flex va-justify-between va-font-medium va-p-3 va-border va-border-solid va-border-gray-300 va-text-base"
      >
        More links
      </h2>
      <ul class="va-p-3">
        <li
          v-for="(reference, index) in references"
          :key="`reference-item-${index}`"
          class="va-flex"
        >
          <span class="va-text-blue-700 va-text-xl va-font-bold va-inline-block va-w-3 va-mt-1">&#8226;</span>
          <ExternalLink :href="reference.link">
            {{ reference.title }}
          </ExternalLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ExternalLink from '@/components/ExternalLink'
import IconArrowNarrow from '@/components/IconArrowNarrow'
import referencesLinks from '@/utils/references'

import { computed } from 'vue'

export default {
  name: 'PopupBodyDetails',

  components: {
    ExternalLink,
    IconArrowNarrow
  },

  props: {
    details: {
      type: Object,
      required: true
    }
  },

  emits: ['hide-details'],

  disableAxeAudit: true,

  setup (props) {
    const references = computed(() => referencesLinks[props.details.id])

    return {
      references
    }
  }
}
</script>
