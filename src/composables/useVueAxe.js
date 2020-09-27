import useAxe from '@/composables/useAxe'
import merge from 'deepmerge'
import VueAxePopup from '@/components/Popup.vue'

import { debounce } from '@/utils'
import { version } from '../../package.json'
import { vueAxe, defaultOptions } from '@/utils/constants'

export default function useVueAxe (options) {
  const axeOptions = merge(defaultOptions, options)

  const { run, results, plugins } = useAxe(axeOptions)

  function registerPlugin (app) {
    app.component('VueAxePopup', VueAxePopup)

    app.provide(vueAxe, {
      run,
      results,
      plugins,
      version
    })

    if (axeOptions.auto) {
      app.mixin({
        updated: debounce(run, 2000)
      })
    }

    run()
  }

  return {
    axeOptions,
    registerPlugin
  }
}
