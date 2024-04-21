/* eslint-disable */
const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    VITE_PUBLIC_DEV_URL: process.env.VITE_PUBLIC_DEV_URL,
  },

  e2e: {
    setupNodeEvents(on, config) {},
  },

  reporter: "mochawesome",
  reporterOptions: {
    charts: true,
    overwrite: false,
    html: false,
    json: true,
    reportDir: "cypress/report/mochawesome-report",
  },
});
