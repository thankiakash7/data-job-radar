# Data Job Radar

I was bored of the job hunt, so I built this instead.

Refreshing five job boards a day, with bad filters and worse duplicates, gets old fast. So I wired together two job APIs, added the filters I actually wanted, and pointed it at the kind of roles I'm after: entry-level **data analyst / data science**, **graduate schemes**, and **internships**, in **London**, **Brighton & Hove**, or **remote UK**.

It searches [Adzuna](https://www.adzuna.co.uk/) and [Reed](https://www.reed.co.uk/), merges the results, and updates every 10 minutes. Built by Akash Thanki.

**Live** at: https://data-job-radar-4s1vzk5da-thanki.vercel.app/

Built with [Next.js](https://nextjs.org/) • Tested with [Vitest](https://vitest.dev/) • Hosted on [Vercel](https://vercel.com/) (free tier)

---

## Features

- **Live job index**: Searches Adzuna and Reed APIs (updated every 10 minutes).
- **Smart filters**: Role type, location, custom keywords.
- **Merge results**: Combines listings from both sources to show everything in one place.
- **No login needed**: Just open the site and search.
- **Your profile**: About section, your CV, contact info.
- **Open source**: Fork it, customise it, improve it.

---

## What's New

This version includes:

- **Profile page** (`/profile`) — Your CV, skills, work experience, and contact details, all in one place.
- **About page** (`/about`) — Your story: why you built this tool and how it solves the job-hunting problem.
- **Navigation header** — Links to Search, About, and Profile pages.
- **Personalized branding** — The site now feels like *your* tool, not a generic job board.
- **Ultra-detailed deployment guide** — See `DEPLOYMENT_GUIDE.md` for step-by-step instructions (assumes zero prior experience).

---

## Quick Start

### For Users (Just Search)

1. Open the live site (get the URL from your Vercel deployment).
2. Pick a role and location from the dropdowns.
3. Add extra keywords if you want (e.g., "Python", "SQL", "time series").
4. Click Search. Results appear instantly.
5. Check the About page to understand why this site exists.
6. Check the Profile page to see who built it.

### For Developers (Deploy Your Own)

**See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions.**

TL;DR:
1. Get API keys from Adzuna (required) and Reed (optional).
2. Install Node.js.
3. `npm install` → `npm run dev` → test locally at `http://localhost:3000`.
4. Create a GitHub account and push your code.
5. Sign up to Vercel, import your GitHub repo, add your API keys as environment variables.
6. Click Deploy. Your site is live.

Every push to `main` on GitHub automatically redeploys.

---

## Project Structure

```
├── pages/
│   ├── index.js            # Homepage: job search
│   ├── about.js            # About page: motivation story
│   ├── profile.js          # Profile page: your CV and contact
│   ├── _app.js             # App wrapper
│   ├── _document.js        # HTML structure
│   └── api/
│       └── jobs.js         # API route: merges Adzuna + Reed results
├── components/
│   ├── Header.js           # Navigation header (new)
│   ├── Filters.js          # Role/location/keyword filters
│   └── JobCard.js          # Individual job listing card
├── lib/
│   ├── adzuna.js           # Adzuna API client
│   ├── reed.js             # Reed API client
│   └── searchPresets.js    # Role and location dropdown options
├── styles/
│   └── globals.css         # Global styles (minimal)
├── __tests__/
│   ├── adzuna.test.js      # Tests for Adzuna client
│   ├── reed.test.js        # Tests for Reed client
│   ├── jobs-api.test.js    # Tests for API route
│   └── searchPresets.test.js
├── package.json            # Dependencies and scripts
├── next.config.js          # Next.js config
├── tailwind.config.js      # Tailwind CSS config
├── vitest.config.js        # Test runner config
├── README.md               # This file
├── DEPLOYMENT_GUIDE.md     # Detailed deployment instructions (NEW)
└── .env.local.example      # Template for API keys
```

---

## Customization

### Change the search filters

Edit `lib/searchPresets.js`:

```javascript
export const ROLE_PRESETS = [
  { id: 'analyst', label: 'Data Analyst', what: 'data analyst' },
  { id: 'scientist', label: 'Data Scientist', what: 'data scientist' },
  // Add your own roles here
];

export const LOCATION_PRESETS = [
  { id: 'london', label: 'London', where: 'london' },
  { id: 'brighton', label: 'Brighton & Hove', where: 'brighton' },
  // Add your own locations here
];
```

### Change the colors

The site uses Tailwind CSS. Edit any of these files and change the `className` values:

- `pages/index.js` — main page colors
- `components/Filters.js` — filter box colors
- `components/JobCard.js` — job listing card colors
- `components/Header.js` — navigation colors

Example:
```javascript
// Before (gray theme)
<button className="bg-gray-100 text-gray-900">

// After (blue theme)
<button className="bg-blue-100 text-blue-900">
```

Any standard Tailwind color class works out of the box (no extra setup needed).

### Update your profile

Edit `pages/profile.js` to change:
- Your contact details (email, phone, LinkedIn, GitHub).
- Your skills and work experience.
- Your education and projects.

### Update the About page

Edit `pages/about.js` to change:
- Your motivation story.
- Why you built the site.
- Any personal details you want to share.

---

## Environment Variables

Create a `.env.local` file in the project root (copy `.env.local.example` and add your keys):

```
ADZUNA_APP_ID=your_adzuna_app_id
ADZUNA_APP_KEY=your_adzuna_app_key
REED_API_KEY=your_reed_api_key
```

- **Adzuna** (required): Sign up at [developer.adzuna.com](https://developer.adzuna.com/). Free tier: 250 API calls/day.
- **Reed** (optional): Sign up at [reed.co.uk/developers/jobseeker](https://www.reed.co.uk/developers/jobseeker). Adds more listings.

`.env.local` is in `.gitignore`, so your keys never leave your computer.

---

## Running Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

Press `Ctrl+C` to stop.

---

## Testing

```bash
npm test
```

Runs 35 automated tests covering:
- Adzuna and Reed API client functions.
- API route (`/api/jobs`): filtering, merging, error handling.

All tests should pass. If you change code, run this again to catch regressions.

---

## Deployment

See `DEPLOYMENT_GUIDE.md` for ultra-detailed instructions (written for complete beginners).

**Quick path:**
1. Push to GitHub.
2. Import repo on Vercel.
3. Add env vars.
4. Click Deploy.
5. Done. Site is live.

**Every time you push to `main` on GitHub, Vercel automatically redeploys.**

---

## Tech Stack

- **Next.js 15.5** — React framework for building web apps.
- **React 18** — UI library.
- **Tailwind CSS 3.4** — Utility-first CSS (no design system, just classes).
- **Vitest** — Fast unit testing.
- **Vercel** — Free hosting (no credit card needed).

---

## API Sources

Job data comes from:

- **Adzuna** ([adzuna.com](https://www.adzuna.com/)) — UK job index, free public API.
- **Reed** ([reed.co.uk](https://www.reed.co.uk/)) — Major UK job board, free API.

Both provide live, updated listings. The site respects their rate limits and terms of service.

---

## Troubleshooting

**No jobs show up locally?**
- Check `.env.local` has correct Adzuna keys.
- Adzuna's index only includes recent postings (last 21 days by default).
- Try a broader location ("All of UK") or fewer keywords.

**No jobs on the live site?**
- Check environment variables in Vercel (**Settings → Environment Variables**).
- Values might be empty or wrong.
- Redeploy: **Deployments → ⋯ → Redeploy**.

**Tests fail?**
- Delete `node_modules` and `package-lock.json`.
- Run `npm install` again.
- Run `npm test`.

**npm commands not found?**
- Node.js didn't install properly.
- Restart your computer.
- Reinstall from [nodejs.org](https://nodejs.org/).

---

## For Your CV

You can add this to your CV like so:

> **Data Job Radar** — A personalized UK job search tool built with Next.js and React. Searches live job listings from Adzuna and Reed APIs. Deployed to production on Vercel. Open-source. [Link to live site or GitHub repo].

This demonstrates:
- Full-stack web development (frontend + backend API routes).
- Third-party API integration (two job APIs).
- Production deployment (Vercel CI/CD).
- Automated testing (Vitest, 35 tests).
- Git and GitHub workflow.

---

## License

This project is for personal use. Job data is provided by:

- Adzuna under their [API terms](https://developer.adzuna.com/overview).
- Reed under their [API terms](https://www.reed.co.uk/developers/jobseeker).

---

## Questions or Feedback?

Check `DEPLOYMENT_GUIDE.md` for detailed instructions. If you get stuck, the most common issues are:

1. API keys missing or wrong → check `.env.local` or Vercel env vars.
2. Node.js not installed → download from [nodejs.org](https://nodejs.org/).
3. Dependencies not installed → run `npm install` again.

I will be adding more functionality to this as time goes one.
Good luck with your job search.