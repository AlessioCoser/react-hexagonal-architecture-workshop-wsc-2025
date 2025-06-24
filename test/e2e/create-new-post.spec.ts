import { expect, test } from '@playwright/test'
import { randomUUID } from 'crypto'

test.setTimeout(5000);

test.describe('Create New Post', () => {
  test.beforeEach(async ({ page }) => {
    await page.unroute('**/api/posts');
  });

  test('should create a new post and see it', async ({ page }) => {
    await page.goto('/')
    const newPostBtn = page.getByRole('button', { name: 'New Post' })
    await newPostBtn.click()
    const title = generateText('title');
    await page.getByRole('textbox', { name: 'Title' }).fill(title)
    const tags = generateText('tags');
    await page.getByRole('textbox', { name: 'Tags' }).fill(tags)
    const text = generateText('title');
    await page.getByRole('textbox', { name: 'Text' }).fill(text)

    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByRole('dialog')).not.toBeInViewport();
    await expect(page.getByText(title)).toBeVisible()
    await expect(page.getByText(tags)).toBeVisible()
    await expect(page.getByText(text)).toBeVisible()
  })

  test('should show an error when something goes wrong', async ({ page }) => {
    await page.route('**/api/posts', route => route.fulfill({ status: 401 }));
    await page.goto('/')
    const newPostBtn = page.getByRole('button', { name: 'New Post' })
    await newPostBtn.click()

    await page.getByRole('textbox', { name: 'Title' }).fill(generateText('title'))
    await page.getByRole('textbox', { name: 'Tags' }).fill(generateText('tags'))
    await page.getByRole('textbox', { name: 'Text' }).fill(generateText('text'))
    await page.getByRole('button', { name: 'Create' }).click()

    await expect(page.getByText('User not found')).toBeVisible()
  })
})

function generateText(key: string): string {
  return `${key}-${randomUUID()}`
}
