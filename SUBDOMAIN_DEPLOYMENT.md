# Subdomain Deployment Guide

This guide explains how to deploy each app to its own subdomain.

## Overview

With subdomain deployment, each app is accessible at its own subdomain:

- `https://statistics.yourdomain.com`
- `https://hacker-news.yourdomain.com`

## Setup Steps

### 1. Update Base Paths

For subdomain deployment, each app should use `base: "/"` since it's served from the root of its subdomain:

```bash
# Update each app's vite.config.ts
node scripts/fix-base-path.js statistics-section /
node scripts/fix-base-path.js hacker-news-client /
```

Or manually update each `vite.config.ts`:

```ts
export default defineConfig({
  plugins: [react()],
  base: "/", // Root path for subdomain
});
```

### 2. Generate Subdomain Workflows

```bash
node scripts/create-subdomain-workflow.js statistics-section
node scripts/create-subdomain-workflow.js hacker-news-client
```

This creates workflows that:

- Deploy each app to its own GitHub Pages environment
- Deploy to root (not subdirectories)
- Use separate environments: `github-pages-statistics-section`, `github-pages-hacker-news-client`

### 3. Create GitHub Pages Environments

For each app, create a separate GitHub Pages environment:

1. Go to **Repository Settings** → **Environments**
2. Click **New environment**
3. Name it: `github-pages-statistics-section`
4. Configure GitHub Pages settings
5. Repeat for `github-pages-hacker-news-client`

### 4. Configure Custom Domain

#### Option A: Using GitHub Pages Custom Domain

1. In each environment's settings, add a custom domain
2. Configure DNS:
   - Add CNAME record: `statistics` → `yourusername.github.io`
   - Add CNAME record: `hacker-news` → `yourusername.github.io`
3. GitHub will automatically handle SSL certificates

#### Option B: Using a Custom Domain Provider

1. Point subdomains to GitHub Pages:
   - `statistics.yourdomain.com` → `yourusername.github.io`
   - `hacker-news.yourdomain.com` → `yourusername.github.io`
2. Configure in GitHub Pages environment settings

### 5. DNS Configuration

Add DNS records for each subdomain:

```
Type: CNAME
Name: statistics
Value: yourusername.github.io
TTL: 3600

Type: CNAME
Name: hacker-news
Value: yourusername.github.io
TTL: 3600
```

Or if using A records:

```
Type: A
Name: statistics
Value: 185.199.108.153 (GitHub Pages IP)
```

## Workflow Comparison

### Subdirectory Deployment (Current)

- Single GitHub Pages environment
- Apps at: `/monorepo-frontend/statistics-section/`
- Base path: `/monorepo-frontend/statistics-section/`

### Subdomain Deployment (New)

- Separate GitHub Pages environments per app
- Apps at: `https://statistics.yourdomain.com/`
- Base path: `/`

## Benefits of Subdomain Deployment

✅ **Clean URLs**: Each app has its own domain  
✅ **Independent Deployments**: No risk of overwriting  
✅ **Better SEO**: Separate domains for each app  
✅ **Isolation**: Apps are completely independent  
✅ **Custom SSL**: Each subdomain can have its own certificate

## Migration from Subdirectory to Subdomain

1. Generate subdomain workflows
2. Update base paths to `/`
3. Create separate GitHub Pages environments
4. Configure DNS
5. Test deployments
6. Update any hardcoded URLs in your apps

## Troubleshooting

### Subdomain not resolving

- Check DNS propagation (can take up to 48 hours)
- Verify CNAME records are correct
- Check GitHub Pages environment settings

### SSL certificate issues

- GitHub automatically provisions SSL for custom domains
- Wait 24-48 hours after DNS configuration
- Check environment settings for SSL status

### 404 errors

- Verify base path is `/` in vite.config.ts
- Check that deployment succeeded
- Verify GitHub Pages environment is active
