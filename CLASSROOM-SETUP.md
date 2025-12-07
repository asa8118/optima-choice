# Setup for Class of 20 Students

## 🎯 Goal
Get your QR code online so all students can scan it during your performance.

---

## ⚡ Fastest Method (5 minutes)

### Use GitHub Pages (Recommended)

**Why?** Free, permanent, reliable for 20+ simultaneous users.

### Quick Steps:

1. **Go to** [github.com](https://github.com) → Sign in (or create free account)

2. **Create new repository:**
   - Click **+** (top right) → **New repository**
   - Name: `optima-choice`
   - Make it **Public**
   - Click **Create repository**

3. **Upload your files:**
   - Click **uploading an existing file**
   - Drag these files from `/Users/abdullaalmameri/optima-choice-qr/`:
     - `landing-page.html`
     - `optima-qr-code.html`
     - `optima-qr-print.html`
   - Click **Commit changes**

4. **Enable GitHub Pages:**
   - Click **Settings** tab
   - Click **Pages** (left sidebar)
   - Under "Branch", select **main**
   - Click **Save**
   - Wait 2 minutes

5. **Your URL will be:**
   ```
   https://YOUR-USERNAME.github.io/optima-choice/
   ```

6. **Update the QR code:**
   - On GitHub, click `optima-qr-code.html`
   - Click pencil icon (✏️ Edit)
   - Find line 354 (press Ctrl+F, search for "LANDING_PAGE_URL")
   - Change it to:
     ```javascript
     const LANDING_PAGE_URL = 'https://YOUR-USERNAME.github.io/optima-choice/landing-page.html';
     ```
     *(Replace YOUR-USERNAME with your actual GitHub username)*
   - Click **Commit changes**
   - Wait 1 minute

7. **TEST IT:**
   - Open: `https://YOUR-USERNAME.github.io/optima-choice/optima-qr-code.html`
   - Scan with your phone
   - Should load the landing page ✅

---

## 📱 On Performance Day

### Before Class Starts:
1. Open the QR code URL on your projector/TV:
   ```
   https://YOUR-USERNAME.github.io/optima-choice/optima-qr-code.html
   ```

2. Test by scanning with your phone

3. Make sure the QR code is large enough (zoom browser if needed)

### During the Play:

**Act 2 - TV Show Scene:**
- When HOST says "QR code appears on the screen"
- Display your deployed URL
- Students can scan it!

**What Students Will See:**
1. Scan QR code
2. Landing page opens on their phone
3. They see the full Neurocian "Optima Chip" registration
4. They can fill out the form
5. Get a fake "Optimization ID"

---

## 🎭 Interactive Ideas

### Make it More Immersive:

1. **Before the show:** Tell students they'll get a "special opportunity" during the performance

2. **During Act 2:** Some students might actually scan it!

3. **During Act 4:** As characters debate, students see the same countdown timer on their phones

4. **After the show:** Ask students:
   - "Who scanned the code?"
   - "Did the urgency/countdown affect your decision?"
   - "What persuasion techniques did you notice?"

This creates a **meta-experience** where the audience experiences the same decision pressure as the characters!

---

## Alternative: 2-Minute Deploy (Netlify)

If GitHub seems complicated:

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the **entire folder** `/Users/abdullaalmameri/optima-choice-qr/`
3. Wait 30 seconds
4. Get URL like: `https://abc123.netlify.app`
5. Download `optima-qr-code.html` from Netlify
6. Edit line 354 with your new Netlify URL
7. Re-upload the file

**Done!** Show `https://abc123.netlify.app/optima-qr-code.html` to class.

---

## Troubleshooting

### "QR code won't scan"
- ✅ Using deployed URL (not localhost)?
- ✅ Good lighting on screen?
- ✅ QR code large enough? (Zoom in!)

### "Landing page won't load"
- ✅ Updated line 354 in `optima-qr-code.html`?
- ✅ Waited 2 minutes after enabling Pages?
- ✅ URL includes `/landing-page.html` at the end?

### "Getting 404 error"
- ✅ Files in repository root (not subfolder)?
- ✅ Branch set to "main" in Settings → Pages?

---

## Capacity Check

**Can GitHub Pages handle 20 students?**
✅ YES! GitHub Pages can handle **thousands** of concurrent users.

**What if we have more students?**
Still fine. GitHub Pages is very reliable for static sites.

**Will it slow down?**
No. The files are simple HTML/CSS/JS - loads instantly.

---

## Day-Of Checklist

- [ ] Deployed to GitHub Pages or Netlify
- [ ] QR code URL updated in `optima-qr-code.html`
- [ ] Tested scanning from a phone
- [ ] Landing page loads correctly
- [ ] Projector/TV can display the QR code page
- [ ] Classroom has decent lighting
- [ ] Students know they can scan during Act 2

---

## Questions?

**When should I deploy?**
Anytime! The site will stay live. Do it a few days before to test.

**Can I change it after deploying?**
Yes! Just edit files on GitHub and commit. Updates in 1-2 minutes.

**What if I mess up?**
You can delete the repository and start over. It's just practice!

**Do students need to install anything?**
Nope! Just their phone camera (built-in QR scanner).

---

## Summary

1. Upload to GitHub → Enable Pages → Get URL
2. Update QR code with your URL
3. Display on screen during performance
4. Students scan and experience the "Optima Choice"

**Time investment:** 5 minutes setup, works forever!
