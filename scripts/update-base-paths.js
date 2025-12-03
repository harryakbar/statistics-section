#!/usr/bin/env node
/**
 * Update base paths for all apps to match repository name
 * Usage: node scripts/update-base-paths.js <repo-name>
 * Example: node scripts/update-base-paths.js monorepo-frontend
 */
import { readdir, readFileSync, writeFileSync } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const repoName = process.argv[2];
if (!repoName) {
  console.error("Usage: node scripts/update-base-paths.js <repo-name>");
  console.error("Example: node scripts/update-base-paths.js monorepo-frontend");
  process.exit(1);
}

try {
  const appsDir = join(rootDir, "apps");
  const apps = await readdir(appsDir, { withFileTypes: true });
  const appDirs = apps
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  for (const appDir of appDirs) {
    const viteConfigPath = join(appsDir, appDir, "vite.config.ts");
    let viteConfig = readFileSync(viteConfigPath, "utf-8");

    // Update base path to include repo name
    const newBasePath = `/${repoName}/${appDir}/`;
    const baseRegex = /base:\s*["']([^"']+)["']/;

    if (baseRegex.test(viteConfig)) {
      viteConfig = viteConfig.replace(baseRegex, `base: "${newBasePath}"`);
      writeFileSync(viteConfigPath, viteConfig);
      console.log(`✅ Updated ${appDir}: base path set to "${newBasePath}"`);
    } else {
      console.warn(`⚠️  Could not find base path in ${appDir}/vite.config.ts`);
    }
  }

  console.log(`\n✅ All base paths updated for repository: ${repoName}`);
  console.log(`\nApps will be accessible at:`);
  appDirs.forEach((appDir) => {
    if (repoName.endsWith(".github.io")) {
      // Repository is username.github.io, serves from root
      console.log(`  - https://${repoName}/${appDir}/`);
    } else {
      // Regular repository, serves from /repo-name/
      console.log(`  - https://<username>.github.io/${repoName}/${appDir}/`);
      console.log(`\n⚠️  Note: If using a custom domain or serving from root,`);
      console.log(`   base paths should be "/${appDir}/" (without repo name)`);
    }
  });
} catch (error) {
  console.error("Error updating base paths:", error.message);
  process.exit(1);
}
