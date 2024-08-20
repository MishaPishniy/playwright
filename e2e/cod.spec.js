const { test, expect } = require('@playwright/test');

test('Search for gooogle and open DOU.UA', async ({ page }) => {
    await page.goto('https://www.google.com/');
    await page.fill('textarea[name="q"]', 'DOU.UA');
    await page.keyboard.press('Enter');
    await page.waitForSelector('#search');
    const firstResult = await page.locator('#search .g a').first();
    await page.waitForLoadState('networkidle')
});