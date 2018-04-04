import nodeResolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'build',
    file: 'vega-lite.js',
    format: 'umd',
    sourcemap: true,
    name: 'vl'
  },
  plugins: [
    nodeResolve(),
    typescript({
      tsconfig: "tsconfig.json"
    })
  ]
};
