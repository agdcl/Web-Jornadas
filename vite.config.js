import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Auto-configure base for GitHub Pages project sites
const repo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : ''
export default defineConfig({
  plugins: [react()],
  base: repo ? `/${repo}/` : '/',
})
