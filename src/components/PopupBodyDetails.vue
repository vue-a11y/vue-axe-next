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
        <IconArrowNarrow />
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
      v-for="(failure, index) in details.failureSummary"
      :key="`failure-section-${index}`"
      class="va-flex va-flex-wrap va-px-3 va-mb-8"
    >
      <div class="va-w-full va-flex va-items-center va-justify-between">
        <h2 class="va-font-medium va-text-base">
          Element source
        </h2>
        <div class="va-flex va-items-center">
          <span class="va-mx-1 va-font-medium va-text-sm">
            {{ index + 1 }} / {{ details.failureSummary.length }}
          </span>
        </div>
      </div>
      <div class="va-code-block va-w-full va-my-3 va-p-4 va-rounded-md va-bg-gray-900">
        <pre class="va-whitespace-pre-wrap"><code
          class="va-w-full va-bg-gray-900 va-text-gray-100"
          v-html="getCodeBlock(failure.source)"
        /></pre>
      </div>
      <div class="va-w-full va-mt-2">
        <h3 class="va-font-medium va-text-base">
          {{ failure.errors.length > 1 ? 'Fix any of the following' : 'Fix the following' }}:
        </h3>
        <ul class="va-mt-2">
          <li
            v-for="error in failure.errors"
            :key="`error-item-${error.id}`"
            class="va-flex va-items-start va-mt-3"
          >
            <span :class="`va-text-2xl va-font-bold va-leading-4 va-mr-2 va-text-${error.impact}`">&#8226;</span>
            <p>{{ error.message }}</p>
          </li>
        </ul>
      </div>
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
      <ul class="va-p-3 va-pt-2">
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
import prismjs from 'prismjs'

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

    function getCodeBlock (source) {
      return prismjs.highlight(source, prismjs.languages.markup, 'markup')
    }

    return {
      references,
      getCodeBlock
    }
  }
}
</script>

<style>
.va-code-block {
  .token.property, .token.tag, .token.constant, .token.symbol, .token.deleted {
    color: #ffa07a;
  }

  .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted {
    color: #abe338;
  }

  .token.atrule, .token.attr-value, .token.function {
    color: #ffd700;
  }
}
</style>
