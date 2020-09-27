<template>
  <div class="va-popup__body" v-if="results.issuesFound">
    <div class="va-popup__body-info">
      <span>{{ results.issuesFound }} issue{{ results.issuesFound > 1 ? 's' : '' }} found</span>
      <span>{{ results.lastAudition }}</span>
    </div>
    <ul class="va-popup-list">
      <li
        class="va-popup-item"
        v-for="(result, key) in results.impacts"
        :key="key"
      >
        <template v-if="result.length">
          <div class="va-popup-item__header">
            <span :class="`va-popup-item__header--${key}`">{{ key }}</span>
            <span>{{ result.length }} issues</span>
          </div>
          <ul class="va-popup-sublist">
            <li class="va-popup-subitem">
              <!-- violations -->
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
  <div class="va-popup__body" v-if="!results.issuesFound">
    WITHOUT ERRORS
  </div>
</template>

<script>
import { inject } from 'vue'
import { vueAxe } from '../utils/constants'

export default {
  name: 'PopupBody',

  setup () {
    const { results } = inject(vueAxe)

    return {
      results
    }
  }
}
</script>

<style scoped>
.va-popup__body {
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
</style>
