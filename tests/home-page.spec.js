// @ts-check
import { test, expect } from '@playwright/test';

test('Page has correct title', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Testowy Sklep – Strona główna');
});