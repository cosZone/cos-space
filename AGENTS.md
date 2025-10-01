# Repository Guidelines

## Project Structure & Module Organization

- `src/` contains the Astro application. Place reusable UI in `src/components/`, page-level routes in `src/pages/`, and shared utilities in `src/lib/` and `src/hooks/`. Keep content-driven markdown in `src/content/` so it feeds Astro collections cleanly.
- `public/` hosts static assets (favicons, fonts, images) that bypass Astro processing. Import anything requiring build-time transforms from `src/assets/` instead.
- `docs/` stores contributor-facing documentation, while `tasks/` and `scripts/` provide reusable automation and deployment helpers. Generated output lives in `dist/` and should never be committed manually.
- Configuration files (`astro.config.mjs`, `tailwind.config.mjs`, `eslint.config.js`, `tsconfig.json`) sit at the project root; extend rather than overwrite them when altering behavior.

## Build, Test, and Development Commands

- `pnpm install` — sync dependencies; run after pulling changes or updating lockfiles.
- `pnpm dev` — start the Astro development server with live reload at `http://localhost:4321`.
- `pnpm build` — produce the static site in `dist/`; run before proposing release changes.
- `pnpm preview` — serve the production build locally for regression checks.
- `pnpm lint` — execute ESLint across the project; fix lint issues prior to review.
- `pnpm lint-md` / `pnpm lint-md:fix` — validate markdown content under `src/content/` and optionally auto-correct style violations.

## Coding Style & Naming Conventions

- Format with Prettier (configured via `prettier` plugins and lint-staged). Avoid manual whitespace adjustments; run `pnpm lint` or rely on the pre-commit hooks.
- Follow ESLint-resolved import orders and prefer TypeScript (`.ts`, `.tsx`) for logic-heavy modules; use `.astro` for pages and templates.
- Name components in PascalCase (`ButtonGroup.astro`), hooks in camelCase (`useTheme.ts`), and configuration constants in SCREAMING_SNAKE_CASE.
- Tailwind classes are allowed inline, but share reusable patterns through `src/styles/` utilities to control cascade.

## Testing Guidelines

- Automated tests are not yet standardized; linting and production previews act as the current quality gates. When adding tests, colocate them beside the source file with the suffix `.test.ts` and ensure they run via `pnpm test` once introduced.
- Before opening a pull request, run `pnpm lint` and `pnpm preview` to catch accessibility or rendering regressions.

## Commit & Pull Request Guidelines

- Follow Conventional Commit prefixes observed in history (`feat:`, `fix:`, `chore:`, `docs:`). Example: `feat: add responsive timeline layout`.
- Group logical changes into atomic commits; avoid mixing content updates with tooling tweaks.
- Pull requests should include a concise summary, linked issues (e.g., `Closes #123`), testing notes, and UI screenshots or screen recordings whenever visual changes occur.
- Request at least one review before merging. Ensure CI (lint checks) passes and that the changelog (`pnpm change`) is updated for release-worthy updates.

## Content & Asset Workflow

- When authoring articles, place markdown in `src/content/` with frontmatter matching the collection schema, and run `pnpm lint-md` to validate metadata.
- Optimize large media files before adding them to `public/` and reference them with absolute root paths (`/images/...`) to benefit from Astro’s asset pipeline.
