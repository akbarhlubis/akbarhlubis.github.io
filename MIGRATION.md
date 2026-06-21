# Migration Notes: Vanilla HTML → Astro

## Overview

Migrated `akbarhlubis.github.io` from vanilla HTML/CSS/JS to **Astro 5 + TypeScript**.

## What Changed

### Structure

| Before | After |
|---|---|
| `index.html` | `src/pages/index.astro` |
| `asset/style.css` | `src/styles/style.css` |
| `asset/index.js` | Split into `src/services/*.ts` + inline `<script>` tags |
| Inline HTML | `src/components/*.astro` |
| N/A | `src/data/*.json` |
| N/A | `src/layouts/BaseLayout.astro` |

### Config Files

- **`astro.config.mjs`** — Static output for GitHub Pages, no server adapter
- **`tsconfig.json`** — TypeScript strict mode with `resolveJsonModule`
- **`package.json`** — Astro 5.x, proper build scripts
- **`.gitignore`** — Excludes `node_modules/`, `dist/`, `.astro/`, `.env`

### Key Fixes Applied

1. **Output mode**: Changed from `server` (Node adapter) to `static` (GitHub Pages)
2. **JSON imports**: Changed from named exports (`{ projects }`) to default imports (`projects`)
3. **Client scripts**: Moved service imports into `<script>` tags (Astro bundles them)
4. **Nav component**: Inlined `setNavOpen()` function in client script
5. **Theme toggle**: Moved initialization to `index.astro` script block
6. **Ticker**: Removed duplicate client-side override (component handles SSR)

## Pending

### Binary Assets (Manual Step Required)

Images and icons need to be copied from `asset/` to `public/asset/`:

```
asset/icon/  →  public/asset/icon/   (Favicon.png, Hero-Logo.svg, etc.)
asset/img/   →  public/asset/img/    (photo-akbar.png, pas-foto.png)
```

After copying, delete the old `asset/` directory.

### Old Files to Delete

- `index.html` (replaced by `src/pages/index.astro`)
- `index_secondery.html` (unused)

## How to Build

```bash
npm install
npm run build      # Output → dist/
pm run preview     # Local preview
npm run check      # Type check
```

## Folder Structure

```
src/
├── pages/          # Route pages (index.astro)
├── layouts/        # BaseLayout.astro
├── components/     # Nav, Footer, ProjectCard, etc.
├── data/           # JSON data files
├── services/       # Client-side TS utilities
├── styles/         # Global CSS
└── types/          # TypeScript types (future)

public/
└── asset/          # Static assets (images, icons)
```
