import { test, expect } from '@playwright/test'

test.describe('App', () => {
  test('should display the home page correctly', async ({ page }) => {
    await page.goto('/')

    const heading = page.getByRole('heading', { name: 'Hexagonal Architecture' })
    await expect(heading).toBeVisible()

    const counterButton = page.getByRole('button', { name: /count is \d+/i })
    await expect(counterButton).toContainText('count is 0')

    await counterButton.click()
    await expect(counterButton).toContainText('count is 1')
  })
})
