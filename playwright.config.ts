import { ReporterDescription } from "@playwright/test";

// @ts-check
const { defineConfig, devices } = require("@playwright/test");
require("dotenv").config();

const reporters: ReporterDescription[] = [["html", { open: "never" }]];
if (process.env.UPLOAD_TEST_RESULT === "YES") {
  reporters.push([
    "monocart-reporter",
    {
      name: "My Test Report",
      outputFile: "./monocart-report/index.html",
    },
  ]);
}

module.exports = defineConfig({
  testDir: "./e2e",
  timeout: 60000,
  retries: 0,
  fullyParallel: false,

  reporter: "./custom-reporter.ts",

  use: {
    baseURL: "http://google.com",
    headless: true,
    trace: "retain-on-failure",
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: "example",
      testMatch: "./spec",
      use: {
        headless: false,
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],
});
