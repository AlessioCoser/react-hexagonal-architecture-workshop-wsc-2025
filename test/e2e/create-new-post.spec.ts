import { expect, test } from '@playwright/test'

test.setTimeout(2000);

test.describe('Create New Post', () => {
  test('should create a new post and see it', async ({ page }) => {
    await page.goto('/')
    const newPostBtn = page.getByRole('button', { name: 'New Post' })
    await newPostBtn.click()

    await page.getByRole('textbox', { name: 'Title' }).fill('An interesting title')
    await page.getByRole('textbox', { name: 'Tags' }).fill('one, two, three')
    await page.getByRole('textbox', { name: 'Text' }).fill('some cool text')
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByRole('dialog')).not.toBeInViewport({ timeout: 1000 });
    await expect(page.getByText('An interesting title')).toBeVisible()
  })

  test('should show an error when something goes wrong', async ({ page }) => {
    // TODO: make this api break
    await page.goto('/')
    const newPostBtn = page.getByRole('button', { name: 'New Post' })
    await newPostBtn.click()

    await page.getByRole('textbox', { name: 'Title' }).fill('An interesting title')
    await page.getByRole('textbox', { name: 'Tags' }).fill('one, two, three')
    await page.getByRole('textbox', { name: 'Text' }).fill('I love waterfall')
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByText('Generic Error. Try again later.')).toBeVisible()
  })
})
