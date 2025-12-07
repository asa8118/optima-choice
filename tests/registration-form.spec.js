const { test, expect } = require('@playwright/test');

test.describe('Registration Form', () => {
  test('should display registration form', async ({ page }) => {
    await page.goto('/landing-page.html');

    // Scroll to registration section
    await page.locator('#register').scrollIntoViewIfNeeded();

    // Check form container
    await expect(page.locator('.form-container')).toBeVisible();

    // Check form title
    await expect(page.locator('.form-title')).toContainText('Claim Your Free Chip');
    await expect(page.locator('.form-subtitle')).toContainText('Join the cognitive revolution');

    // Check form exists
    await expect(page.locator('#registrationForm')).toBeVisible();
  });

  test('should have all form fields', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    const form = page.locator('#registrationForm');

    // Check all input fields exist
    await expect(form.locator('input[type="text"]')).toBeVisible(); // Name
    await expect(form.locator('input[type="email"]')).toBeVisible(); // Email
    await expect(form.locator('input[type="tel"]')).toBeVisible(); // Phone
    await expect(form.locator('select')).toBeVisible(); // Goal select
    await expect(form.locator('input[type="checkbox"]#terms')).toBeVisible(); // Terms
    await expect(form.locator('input[type="checkbox"]#marketing')).toBeVisible(); // Marketing
    await expect(form.locator('.submit-btn')).toBeVisible(); // Submit button
  });

  test('should accept valid input in all fields', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Fill name
    await page.locator('input[type="text"]').fill('John Doe');
    await expect(page.locator('input[type="text"]')).toHaveValue('John Doe');

    // Fill email
    await page.locator('input[type="email"]').fill('john.doe@example.com');
    await expect(page.locator('input[type="email"]')).toHaveValue('john.doe@example.com');

    // Fill phone
    await page.locator('input[type="tel"]').fill('+1 (555) 123-4567');
    await expect(page.locator('input[type="tel"]')).toHaveValue('+1 (555) 123-4567');

    // Select goal
    await page.locator('select').selectOption('career');
    await expect(page.locator('select')).toHaveValue('career');

    // Check terms checkbox
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();

    // Check marketing checkbox (optional)
    await page.locator('#marketing').check();
    await expect(page.locator('#marketing')).toBeChecked();
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Try to submit empty form
    await page.locator('.submit-btn').click();

    // Form should not submit (HTML5 validation will prevent it)
    // Modal should not appear
    const modal = page.locator('#successModal');
    await expect(modal).not.toHaveClass(/active/);
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    const emailInput = page.locator('input[type="email"]');

    // Try invalid email
    await emailInput.fill('invalid-email');
    await page.locator('.submit-btn').click();

    // Form should not submit
    const modal = page.locator('#successModal');
    await expect(modal).not.toHaveClass(/active/);

    // Try valid email
    await emailInput.fill('valid@email.com');
    const value = await emailInput.inputValue();
    expect(value).toBe('valid@email.com');
  });

  test('should require terms checkbox to be checked', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Fill all fields except terms
    await page.locator('input[type="text"]').fill('John Doe');
    await page.locator('input[type="email"]').fill('john@example.com');
    await page.locator('input[type="tel"]').fill('+1 555 123 4567');
    await page.locator('select').selectOption('career');

    // Don't check terms checkbox

    // Try to submit
    await page.locator('.submit-btn').click();

    // Modal should not appear
    const modal = page.locator('#successModal');
    await expect(modal).not.toHaveClass(/active/);
  });

  test('should submit form successfully with valid data', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Fill all required fields
    await page.locator('input[type="text"]').fill('John Doe');
    await page.locator('input[type="email"]').fill('john.doe@example.com');
    await page.locator('input[type="tel"]').fill('+1 (555) 123-4567');
    await page.locator('select').selectOption('career');
    await page.locator('#terms').check();

    // Submit form
    await page.locator('.submit-btn').click();

    // Success modal should appear
    const modal = page.locator('#successModal');
    await expect(modal).toHaveClass(/active/);
  });

  test('should display success modal after form submission', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Fill and submit form
    await page.locator('input[type="text"]').fill('Jane Smith');
    await page.locator('input[type="email"]').fill('jane@example.com');
    await page.locator('input[type="tel"]').fill('+1 555 987 6543');
    await page.locator('select').selectOption('health');
    await page.locator('#terms').check();
    await page.locator('.submit-btn').click();

    // Check modal content
    const modal = page.locator('.modal');
    await expect(modal).toBeVisible();

    // Check modal elements
    await expect(modal.locator('h2')).toContainText('Registration Complete!');
    await expect(modal.locator('p').first()).toContainText('Congratulations');

    // Check optimization ID is generated
    const optId = modal.locator('#optId');
    await expect(optId).toBeVisible();
    const idText = await optId.textContent();
    expect(idText.length).toBeGreaterThan(0);

    // Check modal button
    await expect(modal.locator('.modal-btn')).toContainText('Begin My Journey');
  });

  test('should close success modal when button clicked', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Fill and submit form
    await page.locator('input[type="text"]').fill('Test User');
    await page.locator('input[type="email"]').fill('test@example.com');
    await page.locator('input[type="tel"]').fill('+1 555 000 0000');
    await page.locator('select').selectOption('all');
    await page.locator('#terms').check();
    await page.locator('.submit-btn').click();

    // Modal should be visible
    const modalOverlay = page.locator('#successModal');
    await expect(modalOverlay).toHaveClass(/active/);

    // Click close button
    await page.locator('.modal-btn').click();

    // Modal should be closed
    await expect(modalOverlay).not.toHaveClass(/active/);
  });

  test('should have dropdown with all goal options', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    const select = page.locator('select');

    // Check all options exist
    const options = await select.locator('option').all();
    expect(options.length).toBe(6); // Including the placeholder

    // Check option values exist (options are not visible until dropdown is opened)
    expect(await select.locator('option[value="career"]').count()).toBe(1);
    expect(await select.locator('option[value="finance"]').count()).toBe(1);
    expect(await select.locator('option[value="health"]').count()).toBe(1);
    expect(await select.locator('option[value="relationships"]').count()).toBe(1);
    expect(await select.locator('option[value="all"]').count()).toBe(1);
  });

  test('should show proper field labels', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    const form = page.locator('#registrationForm');

    // Check all labels are present
    await expect(form.locator('label').filter({ hasText: 'Full Name' })).toBeVisible();
    await expect(form.locator('label').filter({ hasText: 'Email Address' })).toBeVisible();
    await expect(form.locator('label').filter({ hasText: 'Phone Number' })).toBeVisible();
    await expect(form.locator('label').filter({ hasText: 'Primary Optimization Goal' })).toBeVisible();
  });

  test('should have proper placeholders', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // Check placeholders
    await expect(page.locator('input[type="text"]')).toHaveAttribute('placeholder', 'Enter your full name');
    await expect(page.locator('input[type="email"]')).toHaveAttribute('placeholder', 'your@email.com');
    await expect(page.locator('input[type="tel"]')).toHaveAttribute('placeholder', '+1 (555) 000-0000');
  });

  test('should generate unique optimization ID for each submission', async ({ page }) => {
    await page.goto('/landing-page.html#register');

    // First submission
    await page.locator('input[type="text"]').fill('User One');
    await page.locator('input[type="email"]').fill('user1@example.com');
    await page.locator('input[type="tel"]').fill('+1 555 111 1111');
    await page.locator('select').selectOption('career');
    await page.locator('#terms').check();
    await page.locator('.submit-btn').click();

    const firstId = await page.locator('#optId').textContent();

    // Close modal
    await page.locator('.modal-btn').click();

    // Second submission
    await page.locator('input[type="text"]').fill('User Two');
    await page.locator('input[type="email"]').fill('user2@example.com');
    await page.locator('input[type="tel"]').fill('+1 555 222 2222');
    await page.locator('select').selectOption('finance');
    await page.locator('#terms').check();
    await page.locator('.submit-btn').click();

    const secondId = await page.locator('#optId').textContent();

    // IDs should be different
    expect(firstId).not.toBe(secondId);
  });
});
