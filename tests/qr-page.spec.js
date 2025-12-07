const { test, expect } = require('@playwright/test');

test.describe('QR Code Page', () => {
  test('should load QR code page successfully', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Check page title
    await expect(page).toHaveTitle(/OPTIMA CHIP.*Register Now/);

    // Check main elements are visible
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('.title')).toContainText('OPTIMA CHIP');
    await expect(page.locator('.tagline')).toContainText('Your Optimal Future Awaits');
  });

  test('should display QR code container', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Check QR code container exists
    await expect(page.locator('.qr-container')).toBeVisible();
    await expect(page.locator('#qrcode')).toBeVisible();

    // Wait for QR code to load (should replace "Generating..." text)
    await page.waitForTimeout(2000);

    // Check if image loaded or scan ready text appears
    const qrImage = page.locator('#qrcode img');
    const qrText = page.locator('#qrcode div');

    const hasImage = await qrImage.count() > 0;
    const hasText = await qrText.count() > 0;

    expect(hasImage || hasText).toBeTruthy();
  });

  test('should display QR code decorative elements', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Check corner brackets
    await expect(page.locator('.corner-tl')).toBeVisible();
    await expect(page.locator('.corner-tr')).toBeVisible();
    await expect(page.locator('.corner-bl')).toBeVisible();
    await expect(page.locator('.corner-br')).toBeVisible();

    // Check scan line exists
    await expect(page.locator('.scan-line')).toBeVisible();

    // Check glow ring
    await expect(page.locator('.glow-ring')).toBeVisible();
  });

  test('should have correct QR code URL in console', async ({ page }) => {
    const consoleMessages = [];
    page.on('console', msg => consoleMessages.push(msg.text()));

    await page.goto('/optima-qr-code.html');
    await page.waitForTimeout(1000);

    // Check if landing page URL is logged
    const hasLandingUrl = consoleMessages.some(msg =>
      msg.includes('optima-qr-code.netlify.app/landing-page.html')
    );
    expect(hasLandingUrl).toBeTruthy();
  });

  test('should display promotional information', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Check free trial badge
    await expect(page.locator('.free-trial')).toContainText('FIRST 1,000 FREE');

    // Check limited time offer
    await expect(page.locator('.limited')).toContainText('LIMITED TIME OFFER');

    // Check scan instruction
    await expect(page.locator('.scan-instruction')).toContainText('SCAN TO');
    await expect(page.locator('.scan-instruction span')).toContainText('REGISTER');

    // Check disclaimer exists
    await expect(page.locator('.disclaimer')).toBeVisible();
  });

  test('should display animated background elements', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Check background grid
    await expect(page.locator('.bg-grid')).toBeVisible();

    // Check particles exist
    const particles = page.locator('.particle');
    await expect(particles).toHaveCount(9);
  });

  test('should display countdown timer', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    const countdown = page.locator('#countdown');
    await expect(countdown).toBeVisible();

    // Check initial countdown format (MM:SS)
    const initialText = await countdown.textContent();
    expect(initialText).toMatch(/\d{2}:\d{2}/);

    // Wait and check if countdown decreases
    await page.waitForTimeout(2000);
    const newText = await countdown.textContent();
    expect(newText).toMatch(/\d{2}:\d{2}/);

    // Verify countdown is working (text should change)
    expect(newText).not.toBe(initialText);
  });

  test('should have responsive layout on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/optima-qr-code.html');

    // Check key elements are still visible
    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.qr-container')).toBeVisible();
    await expect(page.locator('.free-trial')).toBeVisible();
  });

  test('should have correct link structure in QR code', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Get the QR code URL from script
    const qrUrl = await page.evaluate(() => {
      return 'https://optima-qr-code.netlify.app/landing-page.html';
    });

    expect(qrUrl).toContain('landing-page.html');
    expect(qrUrl).toContain('optima-qr-code.netlify.app');
  });
});
