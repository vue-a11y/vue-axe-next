import path from 'path'
import alias from '@rollup/plugin-alias'
import PostCSS from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'

const purgeConfig = {
  safelist: {
    deep: [/^va-/]
  },
  content: [path.resolve(__dirname, '../src/**/*.vue')],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
}

export default {
  entry: path.resolve(__dirname, '../src/index.js'),
  plugins: {
    alias: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(__dirname, '../src')}`
          }
        ],
        customResolver: resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue']
        })
      })
    ],
    postcss: [
      PostCSS({
        include: /(?<!&module=.*)\.css$/,
        plugins: [
          require('postcss-import'),
          require('postcss-nested'),
          require('autoprefixer'),
          require('tailwindcss'),
          process.env.NODE_ENV === 'production' && require('@fullhuman/postcss-purgecss')(purgeConfig)
        ]
      })
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
}
