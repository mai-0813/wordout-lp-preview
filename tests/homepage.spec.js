const { test, expect } = require('@playwright/test');

test.describe('WordOut LP preview', () => {
    test('desktop layout renders the main story and CTAs', async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1200 });
        await page.goto('/');

        await expect(page.locator('.hero h1')).toContainText('Wordへ。');
        await expect(page.getByRole('heading', { name: 'WordOutなら' })).toBeVisible();
        await expect(page.getByRole('heading', { name: '料金' })).toBeVisible();
        await expect(page.getByRole('link', { name: '資料を請求する' }).first()).toBeVisible();
    });

    test('mobile layout keeps the page within the viewport', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('/');

        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        await expect(page.locator('.fixed-bottom-cta')).toBeVisible();
        await expect(page.locator('.hero-actions')).toBeVisible();
    });

    test('hero lightbox can open and close', async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.goto('/');

        await page.locator('.hero-visual-card').click();
        await expect(page.locator('#heroLightbox')).toHaveAttribute('aria-hidden', 'false');
        await expect(page.locator('.hero-lightbox-dialog')).toBeVisible();

        await page.locator('.hero-lightbox-close').click();
        await expect(page.locator('#heroLightbox')).toHaveAttribute('aria-hidden', 'true');
    });
});
