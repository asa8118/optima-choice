# Optima Choice QR - Testing Guide

## Overview

This project includes a comprehensive Playwright test suite with 57 tests covering all aspects of the Optima Choice QR code and landing page website.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

This will run all 57 tests in headless mode against the live site at https://optima-qr-code.netlify.app/

## Test Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with visible browser |
| `npm run test:ui` | Open interactive Playwright UI |
| `npm run test:report` | View last test report in browser |

## Test Suite Breakdown

### 1. QR Code Page Tests (9 tests)
**File:** `tests/qr-page.spec.js`

Tests the QR code display page functionality:
- Page loading and title verification
- QR code image generation and display
- Decorative elements (corners, scan line, glow effects)
- Countdown timer functionality
- Mobile responsiveness
- Correct URL embedded in QR code

**Run only these tests:**
```bash
npx playwright test qr-page.spec.js
```

### 2. Landing Page Tests (12 tests)
**File:** `tests/landing-page.spec.js`

Tests the main landing page:
- Navigation bar and logo
- Hero section with statistics
- Features section (6 features)
- Testimonials section (3 testimonials)
- Footer and copyright
- Countdown banner
- Animated backgrounds
- Mobile layout

**Run only these tests:**
```bash
npx playwright test landing-page.spec.js
```

### 3. Registration Form Tests (13 tests)
**File:** `tests/registration-form.spec.js`

Tests the complete registration flow:
- Form display and structure
- All input fields (name, email, phone, goal)
- Input validation (required fields, email format)
- Checkbox requirements (terms, marketing)
- Form submission
- Success modal display
- Unique optimization ID generation

**Run only these tests:**
```bash
npx playwright test registration-form.spec.js
```

### 4. Navigation Tests (9 tests)
**File:** `tests/navigation.spec.js`

Tests navigation and linking:
- QR code to landing page navigation
- Nav menu anchor links (Features, Testimonials, Register)
- CTA button functionality
- Smooth scroll behavior
- Footer links
- Hash navigation (#features, etc.)
- Fixed navigation bar behavior

**Run only these tests:**
```bash
npx playwright test navigation.spec.js
```

### 5. Mobile Responsiveness Tests (14 tests)
**File:** `tests/mobile-responsive.spec.js`

Tests mobile layout at 375x667 (iPhone SE):
- QR page mobile layout
- Landing page mobile adaptation
- Hidden navigation on mobile
- Form responsiveness
- Card stacking behavior
- Modal fit on mobile screen
- Touch interactions
- Text readability

**Run only these tests:**
```bash
npx playwright test mobile-responsive.spec.js
```

## Test Results Interpretation

### Passing Test Example:
```
✓ [chromium] › tests/landing-page.spec.js:4:3 › Landing Page › should load landing page successfully (2.3s)
```

### Failing Test Example:
```
✗ [chromium] › tests/registration-form.spec.js:114:3 › Registration Form › should submit form successfully
  Error: expect(locator).toBeVisible()
  Expected: visible
  Received: hidden
```

## Viewing Test Reports

After running tests, view the HTML report:

```bash
npm run test:report
```

This opens an interactive browser report showing:
- Pass/fail status for each test
- Screenshots of failures
- Execution time
- Detailed error messages
- Test traces

## Common Issues and Solutions

### Issue: "Executable doesn't exist"
**Solution:**
```bash
npx playwright install chromium
```

### Issue: Tests timing out
**Solution:** Increase timeout in `playwright.config.js`:
```javascript
timeout: 60000 // 60 seconds
```

### Issue: Element not found
**Solution:** Check if element selector changed in the HTML. Update test selectors accordingly.

### Issue: Flaky countdown tests
**Solution:** Countdown tests wait 2 seconds to verify timer changes. Network latency may cause occasional failures. Re-run the test.

## Writing New Tests

### Basic Test Structure:
```javascript
const { test, expect } = require('@playwright/test');

test.describe('My Feature', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/my-page.html');
    await expect(page.locator('.my-element')).toBeVisible();
  });
});
```

### Add test to appropriate file:
- QR page features → `tests/qr-page.spec.js`
- Landing page features → `tests/landing-page.spec.js`
- Form features → `tests/registration-form.spec.js`
- Navigation features → `tests/navigation.spec.js`
- Mobile features → `tests/mobile-responsive.spec.js`

## Test Coverage

### Current Coverage: 57 tests

| Category | Tests | Status |
|----------|-------|--------|
| QR Code Display | 9 | ✓ Complete |
| Landing Page | 12 | ✓ Complete |
| Registration Form | 13 | ✓ Complete |
| Navigation | 9 | ✓ Complete |
| Mobile Responsive | 14 | ✓ Complete |

### What's Tested:
✓ Page loading and titles
✓ All visible elements
✓ Form inputs and validation
✓ Form submission flow
✓ Success modal
✓ Countdown timers
✓ Navigation links
✓ Smooth scrolling
✓ Mobile layout (375x667)
✓ Touch interactions
✓ Animated backgrounds
✓ QR code generation

### What's Not Tested (Future Additions):
- Cross-browser testing (Firefox, Safari)
- Different mobile viewports
- Form data persistence
- Actual backend submission (currently frontend only)
- Performance metrics
- Accessibility (WCAG compliance)

## CI/CD Integration

To run tests in CI/CD pipeline:

```yaml
# Example GitHub Actions
- name: Install dependencies
  run: npm ci

- name: Install Playwright Browsers
  run: npx playwright install --with-deps chromium

- name: Run Playwright tests
  run: npm test

- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## Debug Mode

Run tests in debug mode to step through:

```bash
npx playwright test --debug
```

This opens Playwright Inspector where you can:
- Step through each test action
- Inspect elements
- View console logs
- Take screenshots manually

## Performance

Test execution times (approximate):
- Full suite: ~2-3 minutes
- Single test file: ~20-40 seconds
- Individual test: ~2-10 seconds

Tests run in parallel (4 workers) for faster execution.

## Support

For issues or questions about the test suite:
1. Check TEST-SUMMARY.md for test descriptions
2. Review test output and screenshots
3. Run failing test in headed mode: `npm run test:headed`
4. Use debug mode: `npx playwright test --debug`

---

**Test Suite Version:** 1.0
**Created:** December 7, 2025
**Playwright Version:** 1.57.0
**Target Site:** https://optima-qr-code.netlify.app/
