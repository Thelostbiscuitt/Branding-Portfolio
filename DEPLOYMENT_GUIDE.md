# Deployment Guide — Git & Vercel Setup

## Current Status

You've successfully completed the codebase implementation:
- ✅ Homepage fully implemented with all 7 sections
- ✅ All components configured correctly
- ✅ Design system and tokens in place
- ✅ Image paths fixed and verified

**Issue**: Neither Git nor npm are recognized as commands on your system.

---

## Problem Diagnosis

Both errors indicate the same root cause:
- `'npm' is not recognized` → Node.js installed but not in PATH
- `'git' is not recognized` → Git not installed or not in PATH

This means your system's PATH environment variable doesn't include the directories where these tools are installed.

---

## Solution: Install Git & Fix PATH

### Step 1: Install Git for Windows

1. Download Git installer: https://git-scm.com/download/win
2. Run the installer with these settings:
   - **Important**: Choose "Git from the command line and also from 3rd-party software"
   - This adds Git to your PATH automatically
3. Complete the installation
4. **Restart your terminal** (critical!)

### Step 2: Verify Git Installation

After restarting terminal, run:
```bash
git --version
```

Should output something like: `git version 2.x.x.windows.x`

### Step 3: Fix Node.js/npm PATH

Since Node.js v24.14.1 is installed but npm isn't found:

#### Option A: Reinstall Node.js (Recommended)

1. Uninstall current Node.js
   - Go to Settings → Apps → Installed Apps
   - Find "Node.js" and uninstall

2. Download fresh installer: https://nodejs.org/
3. Run installer with **"Add to PATH"** option enabled
4. Restart terminal

#### Option B: Manually Add to PATH

If reinstalling isn't an option:

1. Find Node.js installation location:
   - Check these common paths:
     - `C:\Program Files\nodejs\`
     - `C:\Users\YourUsername\AppData\Roaming\npm\`
     - `C:\Users\YourUsername\AppData\Local\Programs\nodejs\`

2. Open Environment Variables:
   - Press `Win + R`
   - Type `sysdm.cpl` and press Enter
   - Go to "Advanced" tab → "Environment Variables"

3. Edit System PATH:
   - Under "System variables", find "Path" and click "Edit"
   - Click "New" and add Node.js path (whichever exists above)
   - Click OK on all dialogs

4. Restart terminal

### Step 4: Verify Both Tools

After restarting terminal, run:

**Windows Command Prompt (cmd.exe):**
```
git --version
node --version
npm --version
```

**PowerShell:**
```powershell
git --version
node --version
npm --version
```

All three should display version numbers.

---

## Step 5: Initialize Git Repository

Once Git and npm are working:

**Windows Command Prompt (cmd.exe):**
```
git init
```

**PowerShell:**
```powershell
git init
```

This creates a `.git` folder in your project directory.

---

## Step 6: Add Files to Git

**Windows Command Prompt (cmd.exe):**
```
git add .
```

**PowerShell:**
```powershell
git add .
```

This stages all files for commit (excluding those in `.gitignore`).

---

## Step 7: Create Initial Commit

**Windows Command Prompt (cmd.exe):**
```
git commit -m "Implement new portfolio design with patch_2 codebase - Replace codebase with patch_2/src structure - Fix image URL encoding issues (spaces in filenames) - Implement all homepage sections (Nav, Hero, Stats, Ticker, Work, About, Contact, Footer) - Configure 6 project pages with correct image paths - Add Resend API integration for contact form - Update .gitignore to exclude backup folders"
```

**PowerShell:**
```powershell
git commit -m "Implement new portfolio design with patch_2 codebase

- Replace codebase with patch_2/src structure
- Fix image URL encoding issues (spaces in filenames)
- Implement all homepage sections (Nav, Hero, Stats, Ticker, Work, About, Contact, Footer)
- Configure 6 project pages with correct image paths
- Add Resend API integration for contact form
- Update .gitignore to exclude backup folders"
```

---

## Step 8: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `michael-portfolio` (or your preferred name)
3. Make it **Public** (recommended for portfolio)
4. Don't initialize with README (you already have one)
5. Click "Create repository"

---

## Step 9: Push to GitHub

After creating repository, GitHub will show you commands. Run:

**Windows Command Prompt (cmd.exe):**
```
git remote add origin https://github.com/YOUR_USERNAME/michael-portfolio.git
git branch -M main
git push -u origin main
```

**PowerShell:**
```powershell
git remote add origin https://github.com/YOUR_USERNAME/michael-portfolio.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

You'll be prompted for GitHub username and password/token.

**Note**: If you have 2FA enabled, use a Personal Access Token instead of password:
- GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` scope
- Use token as password when prompted

---

## Step 10: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub account
4. Select `michael-portfolio` repository
5. Configure project settings:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
6. Click "Deploy"

Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to production
- Provide a live URL (e.g., `https://michael-portfolio.vercel.app`)

### Option B: Deploy via Vercel CLI

If you prefer command line:

**Windows Command Prompt (cmd.exe):**
```
npm install -g vercel
vercel login
vercel
```

**PowerShell:**
```powershell
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

---

## Step 11: Configure Environment Variables on Vercel

Your contact form requires `RESEND_API_KEY` to send emails:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Select your `michael-portfolio` project
3. Go to "Settings" → "Environment Variables"
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key
   - **Environment**: Production, Preview, Development (select all)
5. Click "Save"
6. **Redeploy** project (Vercel will prompt or you can trigger from Deployments tab)

### Getting Resend API Key

If you don't have one:
1. Go to https://resend.com/api-keys
2. Sign up or log in
3. Create new API key
4. Copy the key (you won't see it again!)

---

## Verification

After deployment:

1. **Visit your Vercel URL** (e.g., `https://michael-portfolio.vercel.app`)
2. **Test all sections**:
   - Navigation links work
   - Hero photo displays
   - Stats render correctly
   - Ticker scrolls smoothly
   - Work filter functions
   - Project cards link to pages
   - Contact form submits
   - Footer displays

3. **Test project pages**:
   - All 6 projects load
   - Images display correctly
   - Next project links work

4. **Test contact form**:
   - Fill out form and submit
   - Check email arrives (may take a few seconds)
   - Verify email content is correct

---

## Troubleshooting

### Git Push Fails with "Authentication Failed"

- Use Personal Access Token instead of password
- Generate token with `repo` scope at GitHub Settings
- Re-run `git push` and use token as password

### Vercel Build Fails

- Check `package.json` has correct scripts
- Verify `next.config.mjs` is valid
- Check Vercel build logs for specific errors
- Ensure all dependencies are in `package.json`

### Contact Form Doesn't Send Email

- Verify `RESEND_API_KEY` is set in Vercel environment variables
- Check Resend dashboard for API key status
- Verify email address in [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts:50) is correct
- Check Vercel function logs for errors

### Images Don't Load

- Verify image paths in code match actual filenames in `public/`
- Check filenames don't have spaces (we fixed this for biscuit-ai)
- Ensure images are committed to Git (check GitHub repository)

---

## Summary Checklist

- [ ] Git installed and working
- [ ] npm installed and working
- [ ] Git repository initialized
- [ ] Files added to Git
- [ ] Initial commit created
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Vercel project deployed
- [ ] RESEND_API_KEY configured in Vercel
- [ ] Live site tested and verified

---

## Next Steps After Deployment

Once deployed, you can:
- Share your portfolio URL with clients and employers
- Update `next.config.mjs` to add custom domain (if you own one)
- Add Google Analytics or other tracking
- Set up custom error pages (404, 500)
- Configure Vercel for automatic deployments on git push

---

## Files to Reference

- [`.gitignore`](.gitignore) - Updated to exclude backup folders
- [`package.json`](package.json) - Dependencies and scripts
- [`next.config.mjs`](next.config.mjs) - Next.js configuration
- [`src/app/api/contact/route.ts`](src/app/api/contact/route.ts) - Contact form API
- [`PREVIEW.md`](PREVIEW.md) - Visual preview of homepage

Your portfolio is fully implemented and ready to deploy once Git and npm are properly configured on your system!
