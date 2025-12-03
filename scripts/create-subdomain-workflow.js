#!/usr/bin/env node
/**
 * Generate a GitHub Actions workflow for subdomain deployment
 * Usage: node scripts/create-subdomain-workflow.js <app-directory-name>
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const appDir = process.argv[2];
if (!appDir) {
  console.error(
    "Usage: node scripts/create-subdomain-workflow.js <app-directory-name>"
  );
  process.exit(1);
}

try {
  // Get package name
  const packageJsonPath = join(rootDir, "apps", appDir, "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
  const packageName = packageJson.name || appDir;

  // Generate app name (human-readable)
  const appName = appDir
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  // Read template
  const templatePath = join(
    rootDir,
    ".github",
    "workflows-template",
    ".deploy-subdomain-template.yml"
  );
  const template = readFileSync(templatePath, "utf-8");

  // Replace placeholders
  const workflow = template
    .replace(/\{\{APP_NAME\}\}/g, appName)
    .replace(/\{\{APP_DIR\}\}/g, appDir)
    .replace(/\{\{APP_PACKAGE_NAME\}\}/g, packageName);

  // Write workflow
  const workflowPath = join(
    rootDir,
    ".github",
    "workflows",
    `${appDir}-subdomain.yml`
  );
  writeFileSync(workflowPath, workflow);

  console.log(
    `✅ Created subdomain workflow: .github/workflows/${appDir}-subdomain.yml`
  );
  console.log(`\n📝 Next steps:`);
  console.log(`   1. Update apps/${appDir}/vite.config.ts: base: "/"`);
  console.log(`   2. Create GitHub Pages environment: github-pages-${appDir}`);
  console.log(
    `   3. Configure custom domain/subdomain in GitHub Pages settings`
  );
} catch (error) {
  console.error("Error creating workflow:", error.message);
  process.exit(1);
}
