import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: 'http://localhost:3002',
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
})
