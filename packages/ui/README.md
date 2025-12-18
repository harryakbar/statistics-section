# @repo/ui

Small UI component package for the monorepo. Built with TypeScript and `tsc`.

Usage

- From another workspace package: `pnpm -w --filter <consumer> add @repo/ui`
- Import: `import { Button } from '@repo/ui'`

Build

Install at root and run from workspace:

```bash
pnpm install
pnpm -w -F @repo/ui build
```
