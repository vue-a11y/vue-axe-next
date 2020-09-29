<template>
  <div class="va-popup__body">
    <PopupBodyViolations
      v-if="results.issuesFound && !details"
      @show-details="toogleDetails"
    />
    <PopupBodyDetails
      v-if="details"
      :details="details"
      @hide-details="toogleDetails(null)"
    />
    <PopupBodyNoIssues v-show="!results.issuesFound" />
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import { vueAxe } from '@/utils/constants'

import PopupBodyViolations from '@/components/PopupBodyViolations'
import PopupBodyDetails from '@/components/PopupBodyDetails'
import PopupBodyNoIssues from '@/components/PopupBodyNoIssues'

export default {
  name: 'PopupBody',

  disableAxeAudit: true,

  components: {
    PopupBodyViolations,
    PopupBodyDetails,
    PopupBodyNoIssues
  },

  setup () {
    const { results } = inject(vueAxe)
    const details = ref(null)

    function toogleDetails (violation) {
      details.value = violation
    }

    return {
      details,
      results,
      toogleDetails
    }
  }
}
</script>

<style scoped>
.va-popup__body {
  position: relative;
  z-index: 1;
  padding: var(--padding);
  min-height: 300px;
  max-height: 55vh;
  overflow-y: auto;
  overflow-x: hidden;
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
</style>
