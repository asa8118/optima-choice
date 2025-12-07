# The Optima Choice - QR Code Props

Futuristic QR code and landing page for the theatrical production "The Optima Choice"

## Quick Start (Scannable QR Code)

**To make the QR code scannable by phones, you need to run a local server:**

### Option 1: Python (Easiest)
```bash
cd /Users/abdullaalmameri/optima-choice-qr
python3 -m http.server 8000
```
Then open: `http://localhost:8000/optima-qr-code.html`

### Option 2: Node.js
```bash
cd /Users/abdullaalmameri/optima-choice-qr
npx serve .
```

### Option 3: VS Code Live Server
Right-click `optima-qr-code.html` → "Open with Live Server"

---

## Files Included

### `optima-qr-code.html` - Main QR Display
**Best for: On-screen display during performance**

- **Real scannable QR code** (dynamically generated)
- Animated scan line effect
- Glowing neon gradient (cyan to magenta)
- Floating particle background
- Live 59:59 countdown timer
- Pulsing "FIRST 1,000 FREE" badge
- Center chip logo in QR code

**The QR code automatically links to `landing-page.html` in the same folder.**

---

### `landing-page.html` - Registration Page
**The page users see when they scan the QR code**

Features:
- Full Neurocian company branding
- Hero section with stats (99.7% satisfaction, 2.3M+ users)
- Feature cards explaining the chip
- Testimonials section
- Registration form (collects name, email, phone, goals)
- Success modal on form submission
- Countdown banner at bottom
- Mobile responsive

---

### `optima-qr-print.html` - Print Version
**For printed props or static displays**

- Clean, static design
- No animations
- Print-friendly

---

### `optima-qr.svg` - Vector File
**For video editing, presentations, design software**

- Infinitely scalable
- Import into PowerPoint, Premiere, After Effects, etc.

---

## For Performance Night

### Setup Steps:

1. **Start the server** (see Quick Start above)

2. **Display the QR code** - Open `http://localhost:8000/optima-qr-code.html` on your TV/projector

3. **Ensure devices are on same network** - For audience members to scan, their phones must be on the same WiFi as the server

4. **Test beforehand** - Scan the QR code to verify it loads the landing page

### If You Need External Access (Audience Phones)

For phones outside your local network, you have several options:

#### Option A: Use ngrok (Free, Temporary)
```bash
# Install ngrok
brew install ngrok

# Start your server
python3 -m http.server 8000

# In another terminal, expose it
ngrok http 8000
```
ngrok gives you a public URL like `https://abc123.ngrok.io` that anyone can access.

#### Option B: Host on GitHub Pages (Free, Permanent)
1. Create a GitHub repository
2. Upload all files
3. Enable GitHub Pages in Settings
4. Use the GitHub Pages URL in your QR code

#### Option C: Use Netlify Drop (Free, Quick)
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the `optima-choice-qr` folder
3. Get a public URL instantly

---

## Scene Integration

### Act 2 - TV Show Scene

When the HOST says:
> "Tell you what John, the first 1,000 people who register now will receive free implants!"

**Display `optima-qr-code.html` on the TV screen.**

When HOST says:
> "Well you can count me in! (QR code appears on the screen)"

**The QR code is now on screen. If your audience scans it, they'll see the full Neurocian registration page!**

### Act 4 - The Choice Under Pressure

The countdown timer (starting at 59:59) creates real urgency as characters debate whether to scan.

---

## Customization

### Change QR Code URL
In `optima-qr-code.html`, edit line ~354:
```javascript
const LANDING_PAGE_URL = 'https://your-hosted-url.com/landing-page.html';
```

### Change Countdown Time
In both `optima-qr-code.html` and `landing-page.html`:
```javascript
let time = 3599; // 59:59 in seconds
```
Change to desired seconds (e.g., `1800` for 30:00).

### Change Colors
Search and replace these hex values:
- `#00ffff` - Cyan (primary)
- `#ff00ff` - Magenta/Pink (accent)
- `#0a0a15` / `#0d0d15` - Dark backgrounds

---

## Technical Notes

- QR codes are generated using [qrcode.js](https://github.com/soldair/node-qrcode) library
- High error correction level (H) - works even with center logo
- Fonts load from Google Fonts (need internet)
- All animations are CSS-based, no external dependencies
- Landing page form doesn't submit anywhere (it's a prop!)

---

## Troubleshooting

### QR Code Not Scanning
1. Make sure you're running a local server (not opening the file directly)
2. Check that phones are on the same WiFi network
3. Ensure good lighting on the display
4. Try making the QR code display larger

### Landing Page Not Loading
1. Verify `landing-page.html` is in the same folder as `optima-qr-code.html`
2. Check browser console for errors (F12 → Console)
3. Ensure server is still running

### Animations Laggy
- Close other browser tabs
- Use Chrome or Firefox for best performance
- Disable other animations on the computer

---

## Credits

Created for **"The Optima Choice"**
By: Chloe, Deborah, Eleanor, Ritz, Abdulla

A play about decision-making, cognitive biases, and the future of human choice.
