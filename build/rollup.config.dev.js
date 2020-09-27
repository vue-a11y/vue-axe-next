import vue from 'rollup-plugin-vue'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import { eslint } from 'rollup-plugin-eslint'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import defaultConfig from './config'

export default {
  input: defaultConfig.entry,
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    json(),
    resolve(),
    peerDepsExternal(),
    eslint({ include: '../src/' }),
    ...defaultConfig.plugins.alias,
    vue(),
    ...defaultConfig.plugins.postcss,
    babel({
      ...defaultConfig.plugins.babel,
      presets: [
        ['@babel/preset-env']
      ]
    }),
    commonjs()
  ],
  output: [
    {
      compact: true,
      name: 'VueAxe',
      file: 'demo-cli/vue-axe.js',
      format: 'umd',
      exports: 'named',
      globals: {
        vue: 'Vue',
        'axe-core': 'axeCore'
      }
    },
    {
      compact: true,
      name: 'VueAxe',
      file: 'demo-vite/vue-axe.js',
      format: 'es',
      exports: 'named',
      globals: {
        vue: 'Vue',
        'axe-core': 'axeCore'
      }
    }
  ]
}
