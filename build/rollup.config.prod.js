import vue from 'rollup-plugin-vue'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import defaultConfig from './config'

export default commandLineArgs => {
  return {
    input: defaultConfig.entry,
    plugins: [
      replace({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      json(),
      resolve(),
      peerDepsExternal(),
      ...defaultConfig.plugins.alias,
      vue(),
      ...defaultConfig.plugins.postcss,
      babel({
        ...defaultConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 1%, last 2 versions, not dead'
            }
          ]
        ]
      }),
      commonjs(),
      commandLineArgs.format === 'iife' && terser({
        output: {
          ecma: 5
        }
      })
    ],
    output: {
      compact: true,
      name: 'VueAxe',
      exports: 'named',
      globals: {
        vue: 'Vue',
        'axe-core': 'axeCore'
      }
    }
  }
}
