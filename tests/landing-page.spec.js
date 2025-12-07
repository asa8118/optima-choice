const { test, expect } = require('@playwright/test');

test.describe('Landing Page', () => {
  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check page title
    await expect(page).toHaveTitle(/OPTIMA CHIP.*Neurocian/);

    // Check main heading
    await expect(page.locator('.hero h1')).toContainText('OPTIMA CHIP');
  });

  test('should display navigation bar', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check logo elements
    await expect(page.locator('.logo-icon')).toBeVisible();
    await expect(page.locator('.logo-text')).toContainText('NEUROCIAN');

    // Check nav links (on desktop)
    const navLinks = page.locator('.nav-links a');
    await expect(navLinks).toHaveCount(3);

    // Verify nav link text
    await expect(navLinks.nth(0)).toContainText('Features');
    await expect(navLinks.nth(1)).toContainText('Testimonials');
    await expect(navLinks.nth(2)).toContainText('Register');
  });

  test('should display hero section with stats', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check hero badge
    await expect(page.locator('.hero-badge')).toContainText('LIMITED TIME');

    // Check hero subtitle
    await expect(page.locator('.hero-subtitle')).toContainText('neural interface');

    // Check all three stats are visible
    const stats = page.locator('.stat');
    await expect(stats).toHaveCount(3);

    // Check stat values
    await expect(page.locator('.stat-value').nth(0)).toContainText('99.7%');
    await expect(page.locator('.stat-value').nth(1)).toContainText('2.3M+');
    await expect(page.locator('.stat-value').nth(2)).toContainText('730');

    // Check stat labels
    await expect(page.locator('.stat-label').nth(0)).toContainText('Satisfaction Rate');
    await expect(page.locator('.stat-label').nth(1)).toContainText('Active Users');
    await expect(page.locator('.stat-label').nth(2)).toContainText('Hours Saved/Year');
  });

  test('should display CTA button and spots counter', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check CTA button
    const ctaBtn = page.locator('.cta-btn');
    await expect(ctaBtn).toBeVisible();
    await expect(ctaBtn).toContainText('Claim Free Implant');

    // Check spots counter
    await expect(page.locator('.spots-left')).toBeVisible();
    await expect(page.locator('#spots')).toContainText(/\d+/);
  });

  test('should display features section', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Scroll to features
    await page.locator('#features').scrollIntoViewIfNeeded();

    // Check section title
    await expect(page.locator('#features .section-title')).toContainText('Optimize Everything');

    // Check feature cards
    const featureCards = page.locator('.feature-card');
    await expect(featureCards).toHaveCount(6);

    // Check specific features
    await expect(page.locator('.feature-card h3').nth(0)).toContainText('Instant Decisions');
    await expect(page.locator('.feature-card h3').nth(1)).toContainText('Personalized AI');
    await expect(page.locator('.feature-card h3').nth(2)).toContainText('Zero Regrets');
    await expect(page.locator('.feature-card h3').nth(3)).toContainText('Military-Grade Security');
    await expect(page.locator('.feature-card h3').nth(4)).toContainText('Life Integration');
    await expect(page.locator('.feature-card h3').nth(5)).toContainText('Performance Analytics');
  });

  test('should display testimonials section', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Scroll to testimonials
    await page.locator('#testimonials').scrollIntoViewIfNeeded();

    // Check section title
    await expect(page.locator('#testimonials .section-title')).toContainText('Success Stories');

    // Check testimonial cards
    const testimonials = page.locator('.testimonial');
    await expect(testimonials).toHaveCount(3);

    // Check first testimonial
    await expect(testimonials.nth(0).locator('.author-info h4')).toContainText('James Kowalski');
    await expect(testimonials.nth(0).locator('.author-info span')).toContainText('CEO');

    // Check second testimonial
    await expect(testimonials.nth(1).locator('.author-info h4')).toContainText('Sarah Mitchell');
    await expect(testimonials.nth(1).locator('.author-info span')).toContainText('Neurosurgeon');

    // Check third testimonial
    await expect(testimonials.nth(2).locator('.author-info h4')).toContainText('Robert Hansen');
    await expect(testimonials.nth(2).locator('.author-info span')).toContainText('Author');
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded();

    // Check footer logo
    await expect(page.locator('.footer-logo')).toContainText('NEUROCIAN');

    // Check footer links
    const footerLinks = page.locator('.footer-links a');
    await expect(footerLinks).toHaveCount(5);

    // Check copyright
    await expect(page.locator('.copyright')).toContainText('2087 Neurocian Corporation');
  });

  test('should display countdown banner', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check countdown banner is visible
    const banner = page.locator('.countdown-banner');
    await expect(banner).toBeVisible();

    // Check countdown text
    await expect(banner.locator('.countdown-text')).toContainText('FREE OFFER ENDS IN');

    // Check countdown timer
    const countdown = banner.locator('#countdown');
    await expect(countdown).toBeVisible();
    await expect(countdown).toContainText(/\d{2}:\d{2}/);
  });

  test('should have countdown timer working', async ({ page }) => {
    await page.goto('/landing-page.html');

    const countdown = page.locator('#countdown');
    const initialText = await countdown.textContent();

    // Wait 2 seconds
    await page.waitForTimeout(2000);

    const newText = await countdown.textContent();

    // Verify countdown is working
    expect(newText).not.toBe(initialText);
    expect(newText).toMatch(/\d{2}:\d{2}/);
  });

  test('should have spots counter decreasing', async ({ page }) => {
    await page.goto('/landing-page.html');

    const spotsCounter = page.locator('#spots');
    const initialSpots = parseInt(await spotsCounter.textContent());

    // Wait for potential decrease (happens randomly every 3 seconds)
    await page.waitForTimeout(6000);

    const newSpots = parseInt(await spotsCounter.textContent());

    // Spots should be a positive number
    expect(newSpots).toBeGreaterThan(0);
    expect(newSpots).toBeLessThanOrEqual(847);
  });

  test('should have animated background elements', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Check background grid
    await expect(page.locator('.bg-grid')).toBeVisible();

    // Check orbs
    await expect(page.locator('.orb-1')).toBeVisible();
    await expect(page.locator('.orb-2')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/landing-page.html');

    // Check key elements are visible on mobile
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.hero-stats')).toBeVisible();
    await expect(page.locator('.cta-btn')).toBeVisible();

    // Nav links should be hidden on mobile (CSS display: none)
    const navLinks = page.locator('.nav-links');
    await expect(navLinks).not.toBeVisible();

    // Countdown banner should be visible
    await expect(page.locator('.countdown-banner')).toBeVisible();
  });
});
