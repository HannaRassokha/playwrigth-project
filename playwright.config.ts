import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30 * 1000,
  retries: 1,
  use: {
    baseURL: "https://practicetestautomation.com/",
    headless: true,
    viewport: { width: 1280, height: 720 },
    video: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  workers: 4,
  projects: [
    {
      name: "API-Tests",
      testMatch: /.*api\/.*\.spec\.ts/,
    },

    {
      name: "Android-Appium",
      testMatch: /.*mobile\/.*\.spec\.ts/,
      use: {
        headless: false,
      },
    },
  ],
  reporter: [
    ["html", { outputFolder: "my-reports/html-report", open: "never" }],
  ],
});
