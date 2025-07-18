import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  reporter: 'line',
  testDir: './test/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 1000,
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'pnpm dev:ui',
      url: 'http://localhost:5173',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm dev:api', // Command to start your API server
      url: 'http://localhost:3000/health', // Health check endpoint to verify API is running
      reuseExistingServer: !process.env.CI,
      timeout: 5000, // Timeout in milliseconds for the server to start
    }
  ],
})
