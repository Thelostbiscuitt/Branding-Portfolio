# Quick Start — Deploy to Vercel

Since you have Git and Node.js installed, here are the exact commands to run:

## Step 1: Navigate to Project Directory

First, make sure you're in the project directory:

```
cd c:\Users\The Lost Biscuit\Desktop\Creations\michael-portfolio
```

**Important**: Run all Git commands from this directory only.

## Step 2: Initialize Git Repository

```
git init
```

**If you get error "fatal: not a git repository"**: This means a `.git` folder already exists. Run:
```
git status
```
If it shows files, you're already initialized. Skip to Step 3.

## Step 3: Add All Files

```
git add .
```

## Step 3: Create Initial Commit

```
git commit -m "Implement new portfolio design with patch_2 codebase - Replace codebase with patch_2/src structure - Fix image URL encoding issues - Implement all homepage sections - Configure 6 project pages - Add Resend API integration - Update .gitignore to exclude backup folders"
```

## Step 4: Create GitHub Repository

1. Go to: https://github.com/new
2. Repository name: `michael-portfolio`
3. Make it **Public**
4. Click "Create repository"

## Step 5: Add Remote Repository

Replace `YOUR_USERNAME` with your actual GitHub username:

```
git remote add origin https://github.com/YOUR_USERNAME/michael-portfolio.git
```

## Step 6: Push to GitHub

```
git branch -M main
git push -u origin main
```

You'll be prompted for GitHub username and password/token.

## Step 7: Deploy to Vercel

### Option A: Easiest (Dashboard)

1. Go to: https://vercel.com/new
2. Click "Continue with GitHub"
3. Authorize Vercel to access your GitHub
4. Select `michael-portfolio` repository
5. Click "Deploy"

### Option B: Command Line

```
npm install -g vercel
vercel login
vercel
```

Follow the prompts to deploy.

## Step 8: Configure Environment Variable

1. Go to: https://vercel.com/dashboard
2. Select your `michael-portfolio` project
3. Go to "Settings" → "Environment Variables"
4. Add:
   - Name: `RESEND_API_KEY`
   - Value: Your Resend API key
   - Environment: Production, Preview, Development (check all)
5. Click "Save"

Get your Resend API key from: https://resend.com/api-keys

## Step 9: Test Live Site

1. Visit your Vercel URL (e.g., `https://michael-portfolio.vercel.app`)
2. Test all sections work correctly
3. Test contact form submits email

---

## Summary

Run these commands in order:

1. `git init`
2. `git add .`
3. `git commit -m "message"`
4. Create GitHub repo at https://github.com/new
5. `git remote add origin https://github.com/YOUR_USERNAME/michael-portfolio.git`
6. `git push -u origin main`
7. Deploy at https://vercel.com/new
8. Add `RESEND_API_KEY` in Vercel dashboard

That's it! Your portfolio will be live on Vercel.
