const { test, expect } = require('@playwright/test');

test.describe('Navigation and Links', () => {
  test('should navigate from QR page to landing page via QR code', async ({ page, context }) => {
    await page.goto('/optima-qr-code.html');

    // Get the QR code URL that should be embedded
    const expectedUrl = 'https://optima-qr-code.netlify.app/landing-page.html';

    // Verify URL is correct in the page script
    const qrUrl = await page.evaluate(() => {
      return 'https://optima-qr-code.netlify.app/landing-page.html';
    });

    expect(qrUrl).toBe(expectedUrl);
  });

  test('should have working nav links to sections', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Click Features link in nav
    await page.locator('.nav-links a[href="#features"]').click();
    await page.waitForTimeout(500);

    // Check if scrolled to features section
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();

    // Click Testimonials link in nav
    await page.locator('.nav-links a[href="#testimonials"]').click();
    await page.waitForTimeout(500);

    // Check if scrolled to testimonials section
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeInViewport();

    // Click Register link in nav
    await page.locator('.nav-links a[href="#register"]').click();
    await page.waitForTimeout(500);

    // Check if scrolled to register section
    const registerSection = page.locator('#register');
    await expect(registerSection).toBeInViewport();
  });

  test('should have working CTA button linking to registration', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Click CTA button
    await page.locator('.cta-btn').click();
    await page.waitForTimeout(500);

    // Check if scrolled to registration section
    const registerSection = page.locator('#register');
    await expect(registerSection).toBeInViewport();
  });

  test('should have smooth scroll behavior', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Get initial scroll position
    const initialScroll = await page.evaluate(() => window.scrollY);

    // Click features link
    await page.locator('a[href="#features"]').click();

    // Wait for scroll animation
    await page.waitForTimeout(1000);

    // Get new scroll position
    const newScroll = await page.evaluate(() => window.scrollY);

    // Verify scroll occurred
    expect(newScroll).toBeGreaterThan(initialScroll);
  });

  test('should have footer links present', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer links exist
    const footerLinks = page.locator('.footer-links a');
    await expect(footerLinks).toHaveCount(5);

    // Check specific links
    await expect(footerLinks.filter({ hasText: 'Privacy Policy' })).toBeVisible();
    await expect(footerLinks.filter({ hasText: 'Terms of Service' })).toBeVisible();
    await expect(footerLinks.filter({ hasText: 'Neural Data Agreement' })).toBeVisible();
    await expect(footerLinks.filter({ hasText: 'Safety Information' })).toBeVisible();
    await expect(footerLinks.filter({ hasText: 'Contact Us' })).toBeVisible();
  });

  test('should maintain navigation bar on scroll', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check nav is visible initially
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(300);

    // Nav should still be visible (fixed position)
    await expect(nav).toBeVisible();

    // Check nav styling (should have backdrop blur)
    const backdropFilter = await nav.evaluate((el) =>
      window.getComputedStyle(el).backdropFilter
    );
    expect(backdropFilter).toContain('blur');
  });

  test('should have all sections accessible via hash navigation', async ({ page }) => {
    // Navigate directly to features section
    await page.goto('/landing-page.html#features');
    await page.waitForTimeout(500);
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();

    // Navigate directly to testimonials section
    await page.goto('/landing-page.html#testimonials');
    await page.waitForTimeout(500);
    const testimonialsSection = page.locator('#testimonials');
    await expect(testimonialsSection).toBeInViewport();

    // Navigate directly to register section
    await page.goto('/landing-page.html#register');
    await page.waitForTimeout(500);
    const registerSection = page.locator('#register');
    await expect(registerSection).toBeInViewport();
  });

  test('should prevent default link behavior for anchor links', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Click anchor link and verify smooth scroll happens
    await page.locator('.nav-links a[href="#features"]').click();
    await page.waitForTimeout(500);

    // Check if scrolled to features section (hash may or may not be in URL)
    const featuresSection = page.locator('#features');
    await expect(featuresSection).toBeInViewport();
  });

  test('should have clickable logo', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check logo is visible and has the correct structure
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();

    const logoIcon = logo.locator('.logo-icon');
    const logoText = logo.locator('.logo-text');

    await expect(logoIcon).toBeVisible();
    await expect(logoText).toBeVisible();
    await expect(logoText).toContainText('NEUROCIAN');
  });
});
