import useAxe from '@/composables/useAxe'
import merge from 'deepmerge'
import VueAxePopup from '@/components/Popup'

import { debounce } from '@/utils'
import { version } from '../../package.json'
import { vueAxe, defaultOptions } from '@/utils/constants'

export default function useVueAxe (options) {
  const axeOptions = merge(defaultOptions, options)
  const axe = useAxe(axeOptions)

  function registerPlugin (app) {
    app.component('VueAxePopup', VueAxePopup)

    app.provide(vueAxe, {
      ...axe,
      version
    })

    if (axeOptions.auto) {
      app.mixin({
        updated () {
          if (this.$.type.disableAxeAudit || this.$.type.name.toLowerCase().indexOf('transition') !== -1) return
          axe.loading.value = true
          const run = debounce(axe.run, 2500)
          run()
        }
      })
    }

    axe.run()
  }

  return {
    axeOptions,
    registerPlugin
  }
}
