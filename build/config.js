import path from 'path'
import alias from '@rollup/plugin-alias'
import PostCSS from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'

export default {
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
        modules: { generateScopedName: '[local]___[hash:base64:5]' },
        include: /&module=.*\.css$/
      }),
      PostCSS({ include: /(?<!&module=.*)\.css$/ })
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled'
    }
  }
}
