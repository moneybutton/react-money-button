import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    replace(getReplacements()),
    external(),
    postcss({
      modules: true
    }),
    url(),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: {
              node: '8'
            }
          }
        ]
      ],
      plugins: getBabelPlugins(),
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs()
  ]
}

function getBabelPlugins (options = {}) {
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread'
  ]
  if (options.includeTransformRuntime) {
    plugins.push('@babel/plugin-transform-runtime')
  }
  return plugins
}

function getReplacements () {
  const replacements = {}
  for (const key in process.env) {
    replacements[`process.env.${key}`] = JSON.stringify(process.env[key])
  }
  return replacements
}
