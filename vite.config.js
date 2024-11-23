import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias: {
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@services': `${path.resolve(__dirname, './src/services/')}`,
      '@layouts': `${path.resolve(__dirname, './src/layouts/')}`,
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@data': `${path.resolve(__dirname, './src/data/')}`,
    }
  },
  plugins: [react()],
})
