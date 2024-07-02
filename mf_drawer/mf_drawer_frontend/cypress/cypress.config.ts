import { defineConfig } from 'cypress';
const webpack = require('@cypress/webpack-preprocessor');
const webpackOptions = require('../../webpack.config.js');

const options = {
  webpackOptions,
  watchOptions: {},
  tsconfig: 'cypress/tsconfig.cypress.json'
};

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', webpack(options));
      return config;
    },
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/integration/**/*.spec.ts',
    video: false,
  },
});