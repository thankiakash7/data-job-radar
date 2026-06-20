# Deploy Data Job Radar: Complete Beginner's Guide

**This guide assumes you've never deployed anything before. We're going to take it one small step at a time.**

---

## Part 1: One-Time Setup (First time only)

These tools stay on your computer forever. You only install them once.

### Step 1: Install Node.js

Node.js is the engine that runs JavaScript on your computer. It also comes with `npm`, which downloads libraries the project needs.

**Windows:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Click the big green button labeled **"LTS"** (Long Term Support).
3. Run the installer. Click Next, Next, Next. Leave all defaults checked.
4. Restart your computer when it finishes.

**Mac:**
1. Go to [nodejs.org](https://nodejs.org/)
2. Click the big green button labeled **"LTS"**.
3. Download the `.pkg` file.
4. Double-click the installer. Click through the prompts and enter your Mac password when asked.
5. Restart your computer.

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install nodejs npm
```

**Check it worked:** Open a terminal/command prompt and type:
```bash
node -v
npm -v
```

You should see version numbers like `v20.15.1` and `10.7.0`. If you see errors, reinstall Node.js.

---

### Step 2: Install Git

Git is version control software. It lets you save your work to GitHub (which is how Vercel deploys your site).

**Windows:**
1. Go to [git-scm.com](https://git-scm.com/)
2. Click **Download for Windows**.
3. Run the installer. Click Next through all screens (leave all defaults).
4. Restart your computer.

**Mac:**
1. Go to [git-scm.com](https://git-scm.com/)
2. Click **Download for macOS**.
3. Run the installer and follow the prompts.

**Linux (Ubuntu/Debian):**
```bash
sudo apt install git
```

**Check it worked:**
```bash
git --version
```

You should see a version number like `git version 2.45.0`.

---

### Step 3: Install VS Code (Optional but recommended)

VS Code is a code editor. It makes editing files easy.

1. Go to [code.visualstudio.com](https://code.visualstudio.com/)
2. Click **Download**. Pick Windows, Mac, or Linux.
3. Run the installer and follow the prompts.

---

### Step 4: Create a GitHub Account

GitHub is where your code lives online. Vercel (which hosts your site) deploys from GitHub automatically.

1. Go to [github.com](https://github.com/)
2. Click **Sign up**.
3. Enter your email, create a password, pick a username (e.g., `akash-thanki-dev`).
4. Verify your email.

Keep your username and password safe. You'll need them soon.

---

## Part 2: Get Your API Keys

The site searches real job listings from two free job APIs. You need API keys from both companies (or just Adzuna if you skip Reed).

### Adzuna (Required)

1. Go to [developer.adzuna.com](https://developer.adzuna.com/)
2. Click **Register**.
3. Sign up with your email. Confirm your email.
4. Log in. You'll see your dashboard with:
   - **Application ID** (a number like `12345`)
   - **Application Key** (a long string)
5. **Copy both values and paste them somewhere safe** (Notepad, a document, whatever).

Adzuna's free tier gives you 250 API calls per day. The site uses way less than that, so you're fine.

### Reed (Optional but recommended)

1. Go to [reed.co.uk/developers/jobseeker](https://www.reed.co.uk/developers/jobseeker)
2. Create an account and get your API key.
3. **Copy it and save it** next to your Adzuna keys.

If you skip this step, the site still works — it just shows Adzuna results only. You can add Reed later.

---

## Part 3: Prepare Your Project Files

### Step 1: Unzip the project

You should have a file called `Archive.zip` or `data-job-radar.zip`.

**Windows:**
1. Right-click the `.zip` file.
2. Click **Extract All**.
3. Pick where to extract it (your Desktop or Documents folder is fine).
4. Finish. You now have a folder called `data-job-radar` or similar.

**Mac/Linux:**
1. Double-click the `.zip` file. It automatically extracts.
2. You now have a folder called `data-job-radar` or similar.

### Step 2: Create your API keys file

Inside the project folder, you should see a file called `.env.local.example`. We're going to copy this and add your real API keys.

**Windows:**
1. Open File Explorer and navigate to your `data-job-radar` folder.
2. Right-click `.env.local.example`.
3. Click **Copy**.
4. Right-click in the same folder and click **Paste**.
5. Rename the new file from `env.local.example (2)` to `.env.local` (remove the `.example` part and the number).
   - This might be tricky if you can't see file extensions. In File Explorer, go to **View → File name extensions** to enable them.
6. Right-click `.env.local` and click **Edit** (or open with Notepad).
7. You'll see:
   ```
   ADZUNA_APP_ID=
   ADZUNA_APP_KEY=
   REED_API_KEY=
   ```
8. Add your API keys:
   ```
   ADZUNA_APP_ID=12345
   ADZUNA_APP_KEY=abcdefghijk
   REED_API_KEY=xyz123
   ```
9. Save the file (Ctrl+S).

**Mac/Linux:**
1. Open Terminal.
2. Navigate to your `data-job-radar` folder:
   ```bash
   cd ~/Desktop/data-job-radar
   ```
   (or wherever you extracted it)
3. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```
4. Edit it with a text editor:
   ```bash
   nano .env.local
   ```
5. Paste your API keys in. Save (Ctrl+X, then Y, then Enter).

---

## Part 4: Run the Site Locally

This tests that everything works before you deploy it.

### Step 1: Open a terminal in your project folder

**Windows (VS Code):**
1. Open VS Code.
2. Go to **File → Open Folder** and pick your `data-job-radar` folder.
3. Go to **Terminal → New Terminal**.

**Windows (Manual):**
1. Open Command Prompt.
2. Type:
   ```bash
   cd Desktop\data-job-radar
   ```
   (adjust the path if your folder is elsewhere)

**Mac/Linux:**
1. Open Terminal.
2. Type:
   ```bash
   cd ~/Desktop/data-job-radar
   ```

### Step 2: Install dependencies

In your terminal, type:
```bash
npm install
```

This downloads all the libraries the project needs (Next.js, React, Tailwind CSS, etc.). It takes 1–2 minutes. You'll see lots of text. That's normal.

When it finishes, you should see a message like `added 200 packages` and no error messages.

### Step 3: Run the site

Type:
```bash
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Step 4: Open it in your browser

1. Open your web browser (Chrome, Firefox, Safari, whatever).
2. Go to [http://localhost:3000](http://localhost:3000)
3. You should see Data Job Radar with live job results.
4. Try searching for different roles and locations to check it works.

### Step 5: Stop the site

When you're done testing, go back to your terminal and press **Ctrl+C** to stop the server.

---

## Part 5: Put Your Project on GitHub

This is how Vercel will automatically deploy your site when you push new code.

### Step 1: Set up Git (one-time)

Open a terminal in your project folder and set your Git username and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

(Use the name and email you signed up to GitHub with.)

### Step 2: Initialize Git in your project

```bash
git init
git add .
git commit -m "Initial commit: Data Job Radar"
git branch -M main
```

### Step 3: Create a repository on GitHub

1. Go to [github.com](https://github.com/) and log in.
2. Click the **+** icon in the top-right corner.
3. Click **New repository**.
4. Name it `data-job-radar`.
5. Keep it **Public** (required for free Vercel tier).
6. Do **NOT** tick "Add a README" (you already have one).
7. Click **Create repository**.
8. GitHub will show you a page with commands. Copy the commands under "…or push an existing repository from the command line":

```bash
git remote add origin https://github.com/YOUR_USERNAME/data-job-radar.git
git push -u origin main
```

### Step 4: Push your code to GitHub

Paste those commands into your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/data-job-radar.git
git push -u origin main
```

(Replace `YOUR_USERNAME` with your actual GitHub username.)

It might ask for your GitHub username and password. Enter them.

When it finishes, refresh your GitHub repository page. You should see all your project files there (but **not** `.env.local` — that's hidden, which is correct).

---

## Part 6: Deploy to Vercel (Free Hosting)

This puts your site on the internet at a URL like `data-job-radar-yourname.vercel.app`.

### Step 1: Sign up to Vercel

1. Go to [vercel.com](https://vercel.com/)
2. Click **Sign Up**.
3. Click **Continue with GitHub**.
4. Authorize Vercel to access your GitHub account. Click **Authorize**.

### Step 2: Import your repository

1. Click **Add New → Project**.
2. Find your `data-job-radar` repository in the list and click **Import**.

### Step 3: Add your API keys

On the configuration screen, scroll down to **Environment Variables**.

Add three variables:

| Name | Value |
|---|---|
| `ADZUNA_APP_ID` | Your Adzuna Application ID |
| `ADZUNA_APP_KEY` | Your Adzuna Application Key |
| `REED_API_KEY` | Your Reed API key (optional — leave blank if you don't have it) |

Click **Add** for each one.

### Step 4: Deploy

Click the **Deploy** button at the bottom.

Vercel will build and deploy your site. This takes 2–5 minutes. You'll see a progress bar.

When it finishes, you'll see a success message and a URL like:
```
https://data-job-radar-yourname.vercel.app
```

Click the URL. Your site is now live on the internet. Share it with friends or add it to your CV.

---

## Part 7: Automatic Deployments

Every time you push new code to GitHub, Vercel automatically rebuilds and deploys your site.

Example: If you want to change the search filters or add a new feature:

1. Edit the code on your computer.
2. Run `npm run dev` to test it locally.
3. When you're happy, commit and push:
   ```bash
   git add .
   git commit -m "Updated search filters"
   git push
   ```
4. Vercel automatically redeploys. Check your site in 2–3 minutes.

---

## Part 8: Troubleshooting

**"npm: command not found"**
- Node.js didn't install properly. Restart your computer and reinstall Node.js.

**`npm install` takes forever or fails**
- Check your internet connection.
- If it still fails, delete the `node_modules` folder and `package-lock.json`, then run `npm install` again.

**"Cannot find module" errors**
- Run `npm install` again.

**No jobs show up on the live site**
- Check that `ADZUNA_APP_ID` and `ADZUNA_APP_KEY` are set in Vercel:
  - Go to your Vercel project → **Settings → Environment Variables**.
  - Make sure the values are correct.
  - Click **Deployments → ⋯ → Redeploy** to rebuild with the new variables.

**You want to try deploying but don't want to break anything**
- Create a new GitHub branch:
  ```bash
  git checkout -b test-deploy
  git push -u origin test-deploy
  ```
- In Vercel, you can create a preview deployment from this branch without touching your live site.

---

## Part 9: Next Steps

**Customize the search filters:**
- Open `lib/searchPresets.js` in your editor.
- Change the `ROLE_PRESETS` and `LOCATION_PRESETS` to match roles and locations you want.
- Test locally with `npm run dev`.
- Commit and push. Vercel redeploys automatically.

**Change the look:**
- Edit colors in `pages/index.js`, `components/Filters.js`, `components/JobCard.js`.
- All colors use Tailwind CSS classes (e.g., `text-blue-600`, `bg-gray-100`).
- Test with `npm run dev`. Push when ready.

**Run the automated tests:**
```bash
npm test
```

All 35 tests should pass (they verify the job API clients work correctly).

---

## You Did It

You've deployed a real website to the internet. That's a solid achievement. Use Data Job Radar to hunt for jobs, show it to employers on your CV, and tweak it whenever you want.

Good luck.
