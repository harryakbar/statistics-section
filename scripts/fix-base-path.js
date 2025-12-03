#!/usr/bin/env node
/**
 * Fix base path in vite.config.ts for GitHub Pages deployment
 * Usage: node scripts/fix-base-path.js <app-directory-name> [base-path]
 *
 * If base-path is not provided, uses "/" (root deployment)
 * If base-path is provided, uses that path (e.g., "/statistics-section/")
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const appDir = process.argv[2];
const basePath = process.argv[3] || "/";

if (!appDir) {
  console.error(
    "Usage: node scripts/fix-base-path.js <app-directory-name> [base-path]"
  );
  console.error("Example: node scripts/fix-base-path.js statistics-section /");
  console.error(
    "Example: node scripts/fix-base-path.js statistics-section /statistics-section/"
  );
  process.exit(1);
}

try {
  const viteConfigPath = join(rootDir, "apps", appDir, "vite.config.ts");
  let viteConfig = readFileSync(viteConfigPath, "utf-8");

  // Replace base path
  const baseRegex = /base:\s*["']([^"']+)["']/;
  if (baseRegex.test(viteConfig)) {
    viteConfig = viteConfig.replace(baseRegex, `base: "${basePath}"`);
    writeFileSync(viteConfigPath, viteConfig);
    console.log(
      `✅ Updated base path to "${basePath}" in apps/${appDir}/vite.config.ts`
    );
  } else {
    console.error("Could not find base path in vite.config.ts");
    process.exit(1);
  }
} catch (error) {
  console.error("Error updating base path:", error.message);
  process.exit(1);
}
