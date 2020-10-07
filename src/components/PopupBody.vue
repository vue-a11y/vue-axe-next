<template>
  <div class="va-popup__body va-relative va-z-10 va-p-5 va-overflow-y-auto va-overflow-x-hidden">
    <PopupBodyViolations
      v-if="results.issuesFound && !details"
      @show-details="toogleDetails"
    />
    <PopupBodyDetails
      v-if="details"
      :details="details"
      @hide-details="toogleDetails(null)"
    />
    <PopupBodyNoIssues v-if="!results.issuesFound && !details" />
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import { vueAxe } from '@/utils/constants'

import PopupBodyDetails from '@/components/PopupBodyDetails'
import PopupBodyNoIssues from '@/components/PopupBodyNoIssues'
import PopupBodyViolations from '@/components/PopupBodyViolations'

export default {
  name: 'PopupBody',

  disableAxeAudit: true,

  components: {
    PopupBodyDetails,
    PopupBodyNoIssues,
    PopupBodyViolations
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

<style>
.va-popup__body {
  min-height: 300px;
  max-height: 55vh;
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
