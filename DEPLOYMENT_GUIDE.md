# Deployment Guide

## GitHub Pages Deployment Setup

### Important: Base Path Configuration

Each app in this monorepo needs to be deployed to its **own GitHub Pages site**. This is because:

1. Each app has its own `base` path in `vite.config.ts` (e.g., `/statistics-section/`)
2. GitHub Pages serves from the repository root
3. Multiple apps cannot share the same GitHub Pages site without complex routing

### Option 1: Separate GitHub Pages Sites (Recommended)

**Each app should have its own GitHub Pages deployment:**

1. **Create separate GitHub Pages environments:**
   - Go to Repository Settings → Pages
   - Create environments: `statistics-section`, `hacker-news-client`, etc.
   - Each workflow uses its own environment

2. **Update workflow environment names:**

   ```yaml
   environment:
     name: github-pages-statistics-section # Unique per app
   ```

3. **Deploy each app to root:**
   - The workflow copies `apps/{app}/dist` to `dist/` at root
   - Update `vite.config.ts` base to `/` for each app
   - Or keep base paths and deploy to subdirectories (see Option 2)

### Option 2: Deploy to Subdirectories (Alternative)

If you want all apps on one GitHub Pages site:

1. **Update vite.config.ts base paths:**

   ```ts
   // apps/statistics-section/vite.config.ts
   base: "/statistics-section/";

   // apps/hacker-news-client/vite.config.ts
   base: "/hacker-news-client/";
   ```

2. **Update workflow to deploy to subdirectory:**

   ```yaml
   - name: Prepare deployment
     run: |
       mkdir -p dist/{{APP_DIR}}
       cp -r apps/{{APP_DIR}}/dist/* dist/{{APP_DIR}}/
   ```

3. **Access apps at:**
   - `https://username.github.io/repo/statistics-section/`
   - `https://username.github.io/repo/hacker-news-client/`

### Option 3: Custom Domain with Path Routing

If using a custom domain, configure routing to serve each app from its path.

## Current Workflow Setup

The current workflows deploy each app's `dist` folder to the root of GitHub Pages. This means:

- ✅ Each app gets its own deployment
- ⚠️ You need separate GitHub Pages environments
- ⚠️ Or update base paths to match your deployment structure

## Fixing Blank Pages

If you see blank pages, check:

1. **Base path matches deployment:**
   - If deploying to root: `base: "/"`
   - If deploying to subdirectory: `base: "/app-name/"`

2. **Assets are loading:**
   - Open browser DevTools → Network tab
   - Check if JS/CSS files are loading (404 = wrong base path)

3. **GitHub Pages environment:**
   - Ensure each app has its own environment
   - Or configure routing if using one site

## Quick Fix for Current Setup

If you want to deploy to root immediately, update each app's `vite.config.ts`:

```ts
// Change from:
base: "/statistics-section/";

// To:
base: "/";
```

Then each app will be accessible at:

- `https://username.github.io/repo/` (if deploying to root)
- Or configure separate environments for each app
