import fs from 'fs'
import git from 'git-rev-sync'
import replace from 'rollup-plugin-replace'
// import nodeResolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

const packageJson = JSON.parse(fs.readFileSync('./package.json'))
const license = fs.readFileSync('./license.txt')

export default {
  entry: 'src/jsts.js',
  format: 'umd',
  moduleName: 'jsts',
  banner: license,
  sourceMap: true,
  plugins: [
    replace({
      npm_package_version: packageJson.version,
      git_hash: git.short()
    }),
    /*
    nodeResolve({}),
    commonjs({
      include: 'node_modules/**'
    }),
    */
    babel({
      exclude: 'node_modules/**',
      presets: ['es2015-rollup'],
      babelrc: false
    })
  ]
}
