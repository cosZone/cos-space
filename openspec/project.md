# Project Context

## Purpose

cosSpace is an Astro-based blog rebuilt from Hexo, inspired by the Shoka theme. The project maintains compatibility with legacy Hexo blog content while leveraging modern web technologies for improved performance and developer experience. It features a bilingual interface (Chinese/English), hierarchical category navigation, and a clean, minimalist design with dark/light theme support.

## Tech Stack

### Core Framework

- **Astro 5.x** - Static site generator with partial hydration
- **React** - Interactive components (client-side only where needed)
- **TypeScript** - Type-safe development

### Styling & UI

- **Tailwind CSS 4.x** - Utility-first CSS with plugins:
  - `@tailwindcss/typography` - Prose styling
  - `@tailwindcss/container-queries` - Container-based responsive design
  - `tailwindcss-animate` - Animation utilities
- **Radix UI** - Accessible UI primitives (via shadcn/ui patterns)
- **class-variance-authority (cva)** - Component variant management
- **tailwind-merge** - Intelligent class merging

### Animation & Interaction

- **Motion** - Animation library (Framer Motion successor)
- **Nanostores** - Lightweight state management

### Content Management

- **Astro Content Collections** - Type-safe content layer
- **Markdown/MDX** - Blog post format with GitHub Flavored Markdown
- **Shiki** - Syntax highlighting (`github-light`/`github-dark` themes)
- **rehype-slug** - Auto-generate heading IDs
- **rehype-autolink-headings** - Auto-link headings
- **reading-time** - Reading time calculation

### Icons & Assets

- **astro-icon** - Icon component with Iconify integration
- Icon sets: `ri`, `fa6-solid`, `fa6-regular`, `gg`
- **vite-plugin-svgr** - Import SVGs as React components

### Utilities

- **es-toolkit** - Modern utility library
- **dayjs** - Date manipulation
- **sanitize-html** - HTML sanitization

### Analytics

- **Umami** - Privacy-friendly analytics

### Development Tools

- **ESLint** - Linting with Astro, jsx-a11y, and react-google-translate plugins
- **Prettier** - Code formatting with plugins:
  - `prettier-plugin-astro`
  - `prettier-plugin-tailwindcss` - Automatic class sorting
  - `@vsod/prettier-plugin-rewrite` - Chinese technical writing standards
- **Husky** - Git hooks
- **lint-staged** - Pre-commit linting
- **git-cliff** - Changelog generation

## Project Conventions

### Code Style

#### Path Aliases

All imports use TypeScript path aliases (configured in `tsconfig.json`):

```typescript
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
```

#### File Naming

- Astro components: PascalCase (e.g., `Header.astro`)
- React components: PascalCase (e.g., `ThemeToggle.tsx`)
- Utilities/libs: camelCase (e.g., `content.ts`, `datetime.ts`)
- Constants: kebab-case files (e.g., `site-config.ts`), SCREAMING_SNAKE_CASE exports

#### Component Organization

- **Astro components** (`.astro`): Layouts, pages, server-rendered content
- **React components** (`.tsx`): Interactive UI requiring client-side JavaScript
- Use appropriate client directives: `client:load`, `client:visible`, `client:idle`

#### Formatting Rules

- Prettier enforces consistent formatting
- Tailwind classes automatically sorted by `prettier-plugin-tailwindcss`
- Chinese technical writing follows `@vsod/prettier-plugin-rewrite` standards
- ESLint with jsx-a11y ensures accessibility compliance

### Architecture Patterns

#### Content System

- **Content Collections**: Blog posts in `src/content/blog/` with schema validation (`src/content/config.ts`)
- **Frontmatter Schema**: Includes `title`, `date`, `cover`, `tags`, `categories`, `subtitle` (legacy), `catalog` (legacy)
- **Category Structure**: Supports both single (`'工具'`) and nested arrays (`['笔记', '前端', 'React']`)
- **Legacy Compatibility**: Maintains Hexo frontmatter compatibility for migrated posts

#### Category System

- **Hierarchical Categories**: Multi-level category trees (e.g., 笔记 → 前端 → React)
- **URL Mapping**: Chinese names map to URL-friendly slugs via `_config.yml`:
  - `'随笔'` → `'life'`
  - `'前端'` → `'front-end'`
  - `'游戏'` → `'game'`
- **Transform Script**: `src/scripts/transformShokaConfig.ts` reads Hexo config
- **Category Utilities** (`src/lib/content.ts`):
  - `getCategoryList()` - Build hierarchical category tree
  - `getCategoryByLink()` - Find category by URL slug
  - `getPostsByCategory()` - Filter posts by category
  - `getPostLastCategory()` - Get deepest category for a post

#### Theme System

- Dark/light theme toggle with `localStorage` persistence
- Inline theme check in `<head>` prevents FOUC (Flash of Unstyled Content)
- Theme state persists across Astro page transitions via `astro:page-load` event
- Uses Nanostores for reactive theme state management

#### Component Patterns

- **UI Components**: Follow shadcn/ui patterns with Radix UI primitives
- **Variants**: Use `cva` for component variants with type safety
- **Class Merging**: `tailwind-merge` via `src/lib/utils.ts` `cn()` helper
- **Error Handling**: `ErrorBoundary` component wraps interactive sections (uses `react-error-boundary`)

#### Animation System

- **Motion Library**: Animation constants organized in `src/constants/anim/`:
  - `spring.ts` - Spring configurations
  - `variants.ts` - Motion variants
  - `props.ts` - Reusable motion props

#### Routing & URLs

- File-based routing via `src/pages/`
- **Trailing Slashes**: Configured to `never` in `astro.config.mjs`
- Dynamic routes for categories, tags, and posts

### Testing Strategy

Currently no automated testing framework is configured. Consider adding:

- **Vitest** for unit tests
- **Playwright** for E2E tests
- **@astro/check** for type checking Astro components

### Git Workflow

#### Branching

- Main branch: `main`
- Feature branches: Create from and merge back to `main`

#### Commit Conventions

- Use conventional commits format for automated changelog generation
- `pnpm change` generates `CHANGELOG.md` using git-cliff

#### Pre-commit Hooks

- **Husky** runs lint-staged on commit
- **lint-staged** runs:
  - Prettier formatting
  - ESLint checks on staged files

#### Markdown Linting

- `pnpm lint-md` - Lint markdown files in `src/content/`
- `pnpm lint-md:fix` - Auto-fix markdown issues

## Domain Context

### Blog Content Structure

- **Post Collections**: All blog posts in `src/content/blog/` as Markdown/MDX
- **Reading Time**: Automatically calculated for each post
- **Cover Images**: Support for post cover images (stored in `src/assets/`)
- **Tags & Categories**: Posts can have multiple tags and hierarchical categories

### Legacy Hexo Compatibility

- Migrated from Hexo blog system
- Maintains compatibility with old frontmatter fields:
  - `subtitle` - Post subtitle
  - `catalog` - Legacy catalog flag
  - `categories` - Array format support
- Category mappings preserved from Hexo `_config.yml`

### Bilingual Support

- Interface supports Chinese and English
- Chinese category names with English URL slugs
- Markdown content follows Chinese technical writing standards

### Configuration Files

- **Site Config**: `src/constants/site-config.ts` - Site metadata, social links, featured categories
- **Router**: `src/constants/router.ts` - Navigation structure
- **Astro Config**: `astro.config.mjs` - Markdown, integrations, analytics

## Important Constraints

### Package Manager

- **Must use pnpm** (specified in `package.json`: `pnpm@9.15.1`)
- Do not use npm or yarn

### Framework Constraints

- Astro's partial hydration model: Minimize client-side JavaScript
- Use `client:*` directives judiciously for React components
- Server-rendered content preferred over client-rendered when possible

### Build Process

- Production build: `pnpm build`
- Preview before deployment: `pnpm preview`
- Ensure no linting errors before commit (pre-commit hooks enforce this)

### Content Schema

- All blog posts must conform to schema in `src/content/config.ts`
- Categories must be defined in category mapping (legacy Hexo config)
- Dates must be in ISO format

### URL Structure

- No trailing slashes on URLs
- Category URLs use English slugs, not Chinese names
- RSS feed available at `/rss.xml`

## External Dependencies

### Analytics

- **Umami Analytics** - Self-hosted analytics solution
- Configuration in `astro.config.mjs`

### Icon Sets (via Iconify CDN)

- Remix Icon (`ri`)
- Font Awesome 6 Solid/Regular (`fa6-solid`, `fa6-regular`)
- css.gg (`gg`)

### Markdown Processing

- GitHub Flavored Markdown (GFM) support
- Shiki syntax highlighter with GitHub themes
- Rehype plugins for heading links and IDs

### External Services (Potential)

- None currently configured beyond Umami
- Future: Comment system integration (Giscus, Disqus, etc.)
- Future: Search functionality (Algolia, Pagefind, etc.)
