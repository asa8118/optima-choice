# Deploy for Class Use (20 Students)

Choose ONE of these options. **Option 1 is fastest** (5 minutes).

---

## Option 1: GitHub Pages (Recommended - FREE & PERMANENT)

**Best for: Reliable, works for months, no time limit**

### Step 1: Create GitHub Repository
1. Go to [github.com](https://github.com) and sign in (or create free account)
2. Click the **+** icon (top right) → **New repository**
3. Name it: `optima-choice`
4. Make it **Public**
5. Click **Create repository**

### Step 2: Upload Files
**Method A: Via Web (Easiest)**
1. On your new repo page, click **uploading an existing file**
2. Drag these files into the browser:
   - `landing-page.html`
   - `optima-qr-code.html`
   - `optima-qr-print.html`
   - `optima-qr.svg`
3. Click **Commit changes**

**Method B: Via Command Line**
```bash
cd /Users/abdullaalmameri/optima-choice-qr
git init
git add .
git commit -m "Add Optima Choice files"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/optima-choice.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. In your repo, click **Settings** (top menu)
2. Click **Pages** (left sidebar)
3. Under "Source", select **main** branch
4. Click **Save**
5. Wait 1-2 minutes

### Step 4: Get Your URL
Your site will be at: `https://YOUR-USERNAME.github.io/optima-choice/`

**Test it:** Open that URL in your browser. You should see the landing page!

### Step 5: Update QR Code
1. Edit `optima-qr-code.html` on GitHub (click the file, then pencil icon)
2. Find line 354: `const LANDING_PAGE_URL = ...`
3. Change it to:
   ```javascript
   const LANDING_PAGE_URL = 'https://YOUR-USERNAME.github.io/optima-choice/landing-page.html';
   ```
4. Click **Commit changes**
5. Wait 1 minute for deployment

### Step 6: Use in Class
Open: `https://YOUR-USERNAME.github.io/optima-choice/optima-qr-code.html`

Students can scan it from anywhere! ✅

---

## Option 2: Netlify Drop (FASTEST - 2 Minutes)

**Best for: Immediate deployment, zero setup**

### Steps:
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. **Drag the entire folder** `/Users/abdullaalmameri/optima-choice-qr/` onto the page
3. Wait 30 seconds
4. Netlify gives you a URL like: `https://random-name-123.netlify.app`

### Update QR Code:
1. Download `optima-qr-code.html` from the Netlify site
2. Edit line 354 to:
   ```javascript
   const LANDING_PAGE_URL = 'https://YOUR-SITE.netlify.app/landing-page.html';
   ```
3. Re-upload the file to Netlify by dragging again

**Done!** Use `https://YOUR-SITE.netlify.app/optima-qr-code.html`

---

## Option 3: Vercel (FREE, Fast)

1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **Add New** → **Project**
3. Import your GitHub repo (or drag files)
4. Click **Deploy**
5. Get URL like: `https://optima-choice.vercel.app`
6. Update `optima-qr-code.html` with your Vercel URL

---

## Option 4: ngrok (Temporary - Good for Testing)

**Good for: Quick test before class, expires after 8 hours**

### Steps:
```bash
# Install ngrok
brew install ngrok

# Start server
cd /Users/abdullaalmameri/optima-choice-qr
python3 -m http.server 8000

# In NEW terminal window:
ngrok http 8000
```

Copy the `https://` URL from ngrok (e.g., `https://abc123.ngrok.io`)

**Important:** This URL changes every time you restart ngrok!

---

## Quick Comparison

| Option | Time | Permanent? | Best For |
|--------|------|------------|----------|
| **GitHub Pages** | 5 min | ✅ Yes | Best overall - keeps working |
| **Netlify Drop** | 2 min | ✅ Yes (stays online) | Fastest deployment |
| **Vercel** | 5 min | ✅ Yes | Developer-friendly |
| **ngrok** | 1 min | ❌ No (8 hrs) | Testing only |

---

## After Deployment

### Test Before Class:
1. Open your QR code URL on a computer/projector
2. Scan it with your phone (use different WiFi to simulate students)
3. Verify landing page loads
4. Try submitting the form

### During Performance:
1. Display QR code on screen: `https://YOUR-URL/optima-qr-code.html`
2. Students can scan from their seats
3. They'll see the full Neurocian experience!

---

## Troubleshooting

### QR Code Not Working After Deploy?
Open the QR code page and check the browser console (F12):
- Look for the logged URL
- Make sure it matches your deployed landing page URL

### "404 Not Found"
- Wait 2 minutes after enabling GitHub Pages
- Check that you updated the URL in `optima-qr-code.html`
- Verify all files are in the root folder (not in a subfolder)

### Students Can't Scan
- Make sure you're showing the deployed version (not localhost)
- Check classroom lighting (QR codes need good light)
- Make QR code larger if needed (zoom browser to 150%)

---

## Need Help?

**GitHub Pages not working?**
Check: Settings → Pages → Make sure branch is set to "main"

**Want to change the URL later?**
Just edit `optima-qr-code.html` line 354 and commit. Pages updates in ~1 minute.

**Running out of time?**
Use Netlify Drop - it's literally drag and drop!
