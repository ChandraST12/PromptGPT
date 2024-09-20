import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import babel from '@rollup/plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), babel({
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env', '@babel/preset-react'],
    extensions: ['.js', '.ts', '.jsx', '.tsx'], // Add extensions for TypeScript and JSX
    exclude: 'node_modules/**',
  }),
],
})
