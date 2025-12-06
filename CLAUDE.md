<!-- OPENSPEC:START -->

# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `AGENTS.md` when the request:

- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `AGENTS.md` to learn:

- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

astro-koharu is an Astro-based blog rebuilt from Hexo, inspired by the Shoka theme. It uses React for interactive components, Tailwind CSS for styling, and maintains compatibility with legacy Hexo blog content.

## Development Commands

Package manager: **pnpm** (specified in package.json: `pnpm@9.15.1`)

```bash
# Development
pnpm dev              # Start dev server

# Build & Preview
pnpm build            # Build for production
pnpm preview          # Preview production build

# Linting & Code Quality
pnpm lint             # Run ESLint
pnpm lint-md          # Lint markdown files in src/content
pnpm lint-md:fix      # Auto-fix markdown issues
pnpm knip             # Find unused files, dependencies, and exports

# Git & Changelog
pnpm change           # Generate CHANGELOG.md using git-cliff
```

## Architecture

### Tech Stack

- **Framework**: Astro 5.x with React integration
- **Styling**: Tailwind CSS 4.x with plugins (typography, container-queries, animate)
- **Content**: Astro Content Collections (blog posts in `src/content/blog/`)
- **Icons**: astro-icon with Iconify icon sets (ri, fa6-solid, fa6-regular, gg)
- **Animations**: Motion (Framer Motion successor)
- **State**: Nanostores for lightweight state management
- **Search**: Pagefind for static site search (no backend required)
- **Utilities**: es-toolkit, dayjs, sanitize-html

### Project Structure

```plain
src/
├── components/       # React & Astro components
│   ├── common/      # ErrorBoundary, etc.
│   ├── ui/          # Reusable UI components (shadcn-style)
│   ├── layout/      # Header, Navigator, HomeSider, etc.
│   ├── post/        # Post-related components
│   ├── category/    # Category navigation
│   └── theme/       # Theme toggle
├── content/
│   └── blog/        # Markdown/MDX blog posts (Content Collections)
├── layouts/         # Page layouts
├── pages/           # File-based routing
├── lib/             # Utility functions (content, datetime, route, etc.)
├── hooks/           # React hooks
├── constants/       # Site config, router, categories, animations
├── scripts/         # Build-time scripts
└── styles/          # Global CSS
```

### Key Architectural Concepts

#### Content System

- **Blog Posts**: Defined in `src/content/blog/` using Astro Content Collections
- **Schema**: See `src/content/config.ts` for the blog post schema (title, date, cover, tags, categories, etc.)
- **Categories**: Hierarchical structure supporting both single category (`'工具'`) and nested categories (`['笔记', '前端', 'React']`)
- **Legacy Compatibility**: Migrated from Hexo, maintains compatibility with old frontmatter fields (subtitle, catalog, categories array format)

#### Category System

- **Category Mapping**: Chinese category names map to URL-friendly slugs via `_config.yml` (legacy Hexo config)
  - Example: `'随笔': 'life'`, `'前端': 'front-end'`
- **Transform Script**: `src/scripts/transformShokaConfig.ts` reads `_config.yml` and provides category mappings
- **Category Utils**: `src/lib/content.ts` has extensive category manipulation functions:
  - `getCategoryList()`: Build hierarchical category tree from all posts
  - `getCategoryByLink()`: Find category by URL slug
  - `getPostsByCategory()`: Filter posts by category
  - `getPostLastCategory()`: Get the deepest category for a post

#### Path Aliases

Configured in `tsconfig.json`:

```plain
@/          → src/
@assets/*   → src/assets/*
@components/* → src/components/*
@content/*  → src/content/*
@layouts/*  → src/layouts/*
@pages/*    → src/pages/*
@styles/*   → src/styles/*
@lib/*      → src/lib/*
@constants/* → src/constants/*
@hooks/*    → src/hooks/*
@store/*    → src/store/*
@scripts/*  → src/scripts/*
@types/*    → src/types/*
```

#### Configuration Files

- **Site Config**: `src/constants/site-config.ts` - site metadata, social links, featured categories
- **Router**: `src/constants/router.ts` - navigation structure
- **Astro Config**: `astro.config.mjs` - markdown settings (GFM, rehype plugins for heading IDs/anchors), integrations (React, icons, Umami analytics)

#### Theme System

- Dark/light theme toggle with localStorage persistence
- Theme check runs inline in `<head>` to prevent flash of unstyled content (FOUC)
- Theme state persists across Astro page transitions via `astro:page-load` event

#### Markdown Processing

- **Syntax Highlighting**: Shiki with `github-light`/`github-dark` themes
- **Heading Links**: Auto-generated IDs via `rehype-slug`, auto-linked via `rehype-autolink-headings`
- **Reading Time**: Calculated using `reading-time` package
- **GFM Support**: GitHub Flavored Markdown enabled

#### RSS Feed

- Generated at `/rss.xml` via `src/pages/rss.xml.ts`
- Uses `@astrojs/rss` integration

### Component Patterns

#### UI Components

- Follow shadcn/ui patterns with Radix UI primitives
- Use `class-variance-authority` (cva) for component variants
- Tailwind classes merged via `tailwind-merge` in `src/lib/utils.ts`

#### Astro vs React

- **Astro components** (`.astro`): For layouts, pages, server-rendered content
- **React components** (`.tsx`): For interactive UI (navigation dropdowns, theme toggle, segmented controls)
- **Client directives**: Use `client:load`, `client:visible`, etc. for React components that need JavaScript

#### Astro Script Initialization

When writing `<script>` in Astro components that need DOM access, **always handle the initialization race condition**:

```typescript
// ❌ Bad: May miss the event if script loads after astro:page-load fires
document.addEventListener('astro:page-load', init);

// ✅ Good: Initialize immediately if DOM ready, also listen for subsequent navigations
if (document.readyState !== 'loading') {
  init();
}
document.addEventListener('astro:page-load', init);
```

For components with cleanup needs, use an `initialized` flag or `controller?.destroy()` pattern to prevent double initialization.

#### Error Handling

- `ErrorBoundary` component wraps interactive sections
- Uses `react-error-boundary` library

### Animation System

- **Motion library**: Successor to Framer Motion
- Animation constants in `src/constants/anim/`:
  - `spring.ts`: Spring configurations
  - `variants.ts`: Motion variants
  - `props.ts`: Reusable motion props

### Linting & Formatting

- **ESLint**: Astro plugin + jsx-a11y + react-google-translate plugin
- **Prettier**: Auto-formats on save, includes plugins for Astro, Tailwind class sorting, and Markdown (follows Chinese technical writing standards)
- **Lint-staged**: Pre-commit hooks run Prettier + ESLint on staged files via Husky

### Special Notes

- **Trailing Slashes**: Configured to `ignore` in `astro.config.mjs`
- **SVG Handling**: `vite-plugin-svgr` allows importing SVGs as React components
- **Umami Analytics**: Integrated for usage tracking (see `astro.config.mjs`)
- **Content Migration**: This blog was migrated from Hexo, so some posts may have legacy metadata fields
