const { test, expect } = require('@playwright/test');

test.describe('Mobile Responsiveness', () => {
  test.use({
    viewport: { width: 375, height: 667 },
    hasTouch: true
  });

  test('QR page should be responsive on mobile', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Check main elements are visible
    await expect(page.locator('.logo')).toBeVisible();
    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.qr-container')).toBeVisible();

    // Check QR container fits viewport
    const qrContainer = page.locator('.qr-container');
    const boundingBox = await qrContainer.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);
  });

  test('Landing page hero should adapt to mobile', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check hero elements are visible
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.hero-subtitle')).toBeVisible();

    // Check stats layout wraps properly
    const statsContainer = page.locator('.hero-stats');
    await expect(statsContainer).toBeVisible();

    const stats = page.locator('.stat');
    await expect(stats).toHaveCount(3);

    // All stats should be visible
    for (let i = 0; i < 3; i++) {
      await expect(stats.nth(i)).toBeVisible();
    }
  });

  test('Navigation should hide links on mobile', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Nav links should be hidden (display: none in CSS)
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).not.toBeVisible();

    // Logo should still be visible
    await expect(page.locator('.logo')).toBeVisible();
  });

  test('Registration form should be responsive', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Form container should fit viewport
    const formContainer = page.locator('.form-container');
    await expect(formContainer).toBeVisible();

    const boundingBox = await formContainer.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);

    // All form fields should be visible and full width
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="tel"]')).toBeVisible();
    await expect(page.locator('select')).toBeVisible();

    // Submit button should be full width
    const submitBtn = page.locator('.submit-btn');
    await expect(submitBtn).toBeVisible();
  });

  test('Feature cards should stack on mobile', async ({ page }) => {
    await page.goto('/landing-page.html#features');

    const featuresGrid = page.locator('.features-grid');
    await expect(featuresGrid).toBeVisible();

    // All feature cards should be visible
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(6);

    // Cards should be visible one at a time (stacked)
    for (let i = 0; i < 3; i++) {
      await featureCards.nth(i).scrollIntoViewIfNeeded();
      await expect(featureCards.nth(i)).toBeVisible();
    }
  });

  test('Testimonials should stack on mobile', async ({ page }) => {
    await page.goto('/landing-page.html#testimonials');

    const testimonials = page.locator('.testimonial');
    await expect(testimonials).toHaveCount(3);

    // Each testimonial should be visible when scrolled to
    for (let i = 0; i < 3; i++) {
      await testimonials.nth(i).scrollIntoViewIfNeeded();
      await expect(testimonials.nth(i)).toBeVisible();
    }
  });

  test('Countdown banner should adapt to mobile', async ({ page }) => {
    await page.goto('/landing-page.html');

    const banner = page.locator('.countdown-banner');
    await expect(banner).toBeVisible();

    // Banner should not overflow viewport
    const boundingBox = await banner.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);

    // Countdown elements should be visible
    await expect(banner.locator('.countdown-text')).toBeVisible();
    await expect(banner.locator('.countdown-timer')).toBeVisible();
  });

  test('Success modal should fit mobile screen', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Fill and submit form
    await page.locator('input[type="text"]').fill('Mobile User');
    await page.locator('input[type="email"]').fill('mobile@example.com');
    await page.locator('input[type="tel"]').fill('+1 555 000 0000');
    await page.locator('select').selectOption('career');
    await page.locator('#terms').check();
    await page.locator('.submit-btn').click();

    // Modal should be visible
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    // Modal should fit within viewport
    const boundingBox = await modal.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);

    // Modal content should be readable
    await expect(modal.locator('h2')).toBeVisible();
    await expect(modal.locator('.modal-btn')).toBeVisible();
  });

  test('CTA button should be responsive', async ({ page }) => {
    await page.goto('/landing-page.html');

    const ctaBtn = page.locator('.cta-btn');
    await expect(ctaBtn).toBeVisible();

    // Button should fit viewport
    const boundingBox = await ctaBtn.boundingBox();
    expect(boundingBox.width).toBeLessThanOrEqual(375);

    // Button text should be visible
    await expect(ctaBtn).toContainText('Claim Free Implant');
  });

  test('Text should be readable on mobile', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check main heading
    const heading = page.locator('.hero h1');
    await expect(heading).toBeVisible();

    const fontSize = await heading.evaluate((el) =>
      window.getComputedStyle(el).fontSize
    );

    // Font size should be reasonable on mobile (using clamp in CSS)
    const fontSizeValue = parseInt(fontSize);
    expect(fontSizeValue).toBeGreaterThan(30); // Should be readable
    expect(fontSizeValue).toBeLessThan(100); // Should not be too large
  });

  test('Footer should be responsive on mobile', async ({ page }) => {
    await page.goto('/landing-page.html');

    await page.locator('footer').scrollIntoViewIfNeeded();

    // Footer should be visible
    await expect(page.locator('footer')).toBeVisible();

    // Footer links should wrap properly
    const footerLinks = page.locator('.footer-links');
    await expect(footerLinks).toBeVisible();

    // Links should be clickable
    const links = page.locator('.footer-links a');
    for (let i = 0; i < Math.min(3, await links.count()); i++) {
      await expect(links.nth(i)).toBeVisible();
    }
  });

  test('QR code particles should be visible on mobile', async ({ page }) => {
    await page.goto('/optima-qr-code.html');

    // Background elements should exist
    await expect(page.locator('.bg-grid')).toBeVisible();

    const particles = page.locator('.particle');
    await expect(particles.first()).toBeVisible();
  });

  test('Touch interactions should work on mobile', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Tap CTA button
    await page.locator('.cta-btn').tap();
    await page.waitForTimeout(500);

    // Should scroll to registration
    const registerSection = page.locator('#register');
    await expect(registerSection).toBeInViewport();

    // Tap form field
    await page.locator('input[type="text"]').tap();

    // Field should be focused
    const isFocused = await page.locator('input[type="text"]').evaluate((el) =>
      el === document.activeElement
    );
    expect(isFocused).toBeTruthy();
  });
});
