# Implementation Tasks

## Phase 1: Foundation - Type System & Design Tokens (1-2 days)

### 1.1 Create Type System Infrastructure

- [ ] 1.1.1 Create `src/types/` directory structure
- [ ] 1.1.2 Create `src/types/components.ts` with component prop interfaces
- [ ] 1.1.3 Create `src/types/ui.ts` with UI shared types (variants, sizes, states)
- [ ] 1.1.4 Create `src/types/content.ts` with blog content types
- [ ] 1.1.5 Create `src/types/animation.ts` with Motion-related types
- [ ] 1.1.6 Create `src/types/index.ts` barrel export
- [ ] 1.1.7 Update `tsconfig.json` path alias for `@types/*`

### 1.2 Centralize Existing Type Definitions

- [ ] 1.2.1 Extract PostItemCard props interface to `@types/components.ts`
- [ ] 1.2.2 Extract DropdownNavProps to centralized types
- [ ] 1.2.3 Extract Segmented generic types to centralized types
- [ ] 1.2.4 Extract Popover/Tooltip types to centralized types
- [ ] 1.2.5 Extract TableOfContents types to centralized types
- [ ] 1.2.6 Update all component imports to use `@types/*`
- [ ] 1.2.7 Run TypeScript compiler to verify no type errors

### 1.3 Establish Design Token System

- [ ] 1.3.1 Create `src/constants/design-tokens.ts`
- [ ] 1.3.2 Define color tokens (semantic color names mapped to CSS variables)
- [ ] 1.3.3 Define spacing scale (0-96 with named sizes)
- [ ] 1.3.4 Define typography scale (font sizes, line heights, letter spacing)
- [ ] 1.3.5 Define shadow system (elevation levels 0-4)
- [ ] 1.3.6 Define border radius scale (sm, md, lg, xl, 2xl, full)
- [ ] 1.3.7 Define animation timings (fast, normal, slow with easing functions)

### 1.4 Integrate Design Tokens with Tailwind

- [ ] 1.4.1 Update `tailwind.config.mjs` to import design tokens
- [ ] 1.4.2 Map design tokens to Tailwind theme extend
- [ ] 1.4.3 Update `src/styles/global/tailwind.css` with token-based utilities
- [ ] 1.4.4 Run build to verify Tailwind compilation succeeds
- [ ] 1.4.5 Verify all existing styles still work (visual regression check)

## Phase 2: State Management & Custom Hooks (2-3 days)

### 2.1 Create Custom Hooks Library

- [ ] 2.1.1 Create `src/hooks/` directory
- [ ] 2.1.2 Create `src/hooks/useToggle.ts` - Reusable open/close state hook
- [ ] 2.1.3 Create `src/hooks/useControlledState.ts` - Controlled/uncontrolled component pattern
- [ ] 2.1.4 Create `src/hooks/useFloatingUI.ts` - Shared Floating UI configuration
- [ ] 2.1.5 Create `src/hooks/useMediaQuery.ts` - Responsive breakpoint hook
- [ ] 2.1.6 Create `src/hooks/index.ts` barrel export
- [ ] 2.1.7 Update `tsconfig.json` to ensure `@hooks/*` alias works

### 2.2 Extract TableOfContents Logic to Hooks

- [ ] 2.2.1 Create `src/hooks/useHeadingTree.ts` - Heading tree building and numbering
- [ ] 2.2.2 Create `src/hooks/useActiveHeading.ts` - Scroll detection for active heading
- [ ] 2.2.3 Create `src/hooks/useExpandedState.ts` - Accordion expand/collapse logic
- [ ] 2.2.4 Add JSDoc documentation to all three hooks
- [ ] 2.2.5 Add TypeScript types for all hook return values

### 2.3 Refactor Existing Components to Use Hooks

- [ ] 2.3.1 Refactor MenuIcon.tsx to use `useToggle` hook
- [ ] 2.3.2 Refactor Popover.tsx to use `useControlledState` and `useFloatingUI`
- [ ] 2.3.3 Refactor Tooltip.tsx to use `useControlledState` and `useFloatingUI`
- [ ] 2.3.4 Refactor DropdownNav.tsx to use `useToggle` hook
- [ ] 2.3.5 Test all refactored components manually (open/close, keyboard nav)

### 2.4 Consolidate Global State with Nanostores

- [ ] 2.4.1 Create `src/store/ui.ts` for global UI state
- [ ] 2.4.2 Add `drawerOpen` store to replace CustomEvent in MenuIcon
- [ ] 2.4.3 Add `mobileMenuOpen` store if needed
- [ ] 2.4.4 Update MenuIcon.tsx to use nanostore instead of CustomEvent
- [ ] 2.4.5 Update FloatingGroup.astro to subscribe to drawer state
- [ ] 2.4.6 Update HomeSider.astro to use nanostore for state
- [ ] 2.4.7 Test drawer open/close across all breakpoints

### 2.5 Refactor TableOfContents Component

- [ ] 2.5.1 Create smaller sub-components in `src/components/layout/TableOfContents/`
- [ ] 2.5.2 Create `HeadingTreeItem.tsx` component
- [ ] 2.5.3 Create `HeadingAccordion.tsx` component
- [ ] 2.5.4 Refactor main TableOfContents.tsx to use hooks and sub-components
- [ ] 2.5.5 Verify functionality: active heading detection, expand/collapse, numbering
- [ ] 2.5.6 Verify TableOfContents is now under 150 lines

## Phase 3: Component API Standardization (3-4 days)

### 3.1 Document Component API Conventions

- [ ] 3.1.1 Create `docs/component-api-standards.md`
- [ ] 3.1.2 Document prop naming conventions
- [ ] 3.1.3 Document event handler naming patterns
- [ ] 3.1.4 Document variant system usage (CVA)
- [ ] 3.1.5 Document ref forwarding patterns
- [ ] 3.1.6 Document children vs content vs slots

### 3.2 Standardize Base UI Components

- [ ] 3.2.1 Audit Button.tsx for API consistency, add JSDoc
- [ ] 3.2.2 Audit Badge.tsx for API consistency, add JSDoc
- [ ] 3.2.3 Audit Card.tsx and sub-components, add JSDoc
- [ ] 3.2.4 Audit Avatar.tsx for API consistency, add JSDoc
- [ ] 3.2.5 Ensure all base UI components use centralized types
- [ ] 3.2.6 Verify all base UI components export proper TypeScript types

### 3.3 Replace Hardcoded Values with Design Tokens

- [ ] 3.3.1 Replace hardcoded `#E95469` in MenuIcon.tsx with design token
- [ ] 3.3.2 Audit all components for hardcoded color values
- [ ] 3.3.3 Replace hardcoded spacing values with token-based Tailwind classes
- [ ] 3.3.4 Replace hardcoded shadows with design token shadow classes
- [ ] 3.3.5 Visual regression test - ensure no UI changes

### 3.4 Extract Complex Styles from Components

- [ ] 3.4.1 Create `src/styles/components/post.css` for PostItemCard styles
- [ ] 3.4.2 Extract long className strings from PostItemCard.astro
- [ ] 3.4.3 Create `src/styles/components/category.css` if needed
- [ ] 3.4.4 Update component imports to use extracted styles
- [ ] 3.4.5 Verify all post/category pages render correctly

### 3.5 Add Error Boundaries

- [ ] 3.5.1 Create `src/components/common/FloatingErrorBoundary.tsx`
- [ ] 3.5.2 Wrap Popover component with error boundary
- [ ] 3.5.3 Wrap Tooltip component with error boundary
- [ ] 3.5.4 Wrap DropdownNav with error boundary
- [ ] 3.5.5 Add error UI fallback components
- [ ] 3.5.6 Test error boundaries by forcing errors (then revert)

### 3.6 Document Hydration Strategy

- [ ] 3.6.1 Create `docs/hydration-strategy.md`
- [ ] 3.6.2 Document when to use `client:load` (critical interactive, above fold)
- [ ] 3.6.3 Document when to use `client:visible` (below fold, lazy load)
- [ ] 3.6.4 Document when to use `client:idle` (non-critical, defer)
- [ ] 3.6.5 Audit current component hydration directives
- [ ] 3.6.6 Update components to follow documented strategy
- [ ] 3.6.7 Measure and document bundle size impact

## Phase 4: Animation System Enhancement (1-2 days)

### 4.1 Create Animation Component Library

- [ ] 4.1.1 Create `src/components/animation/` directory
- [ ] 4.1.2 Create `FadeIn.tsx` - Fade in on mount/scroll with Intersection Observer
- [ ] 4.1.3 Create `SlideIn.tsx` - Slide animations (from-left, from-right, from-top, from-bottom)
- [ ] 4.1.4 Create `Expand.tsx` - Height/width expansion animations
- [ ] 4.1.5 Create `Stagger.tsx` - Staggered children animations
- [ ] 4.1.6 Add TypeScript types for all animation components
- [ ] 4.1.7 Add JSDoc with usage examples

### 4.2 Enhance Existing Animation Constants

- [ ] 4.2.1 Add new spring presets to `src/constants/anim/spring.ts` (soft, bouncy)
- [ ] 4.2.2 Add new variants to `src/constants/anim/variants.ts` (scale, rotate)
- [ ] 4.2.3 Add timing constants to align with design tokens
- [ ] 4.2.4 Document animation system in `docs/animation-guidelines.md`

### 4.3 Add Missing Animations to Components

- [ ] 4.3.1 Add expand/collapse animation to TableOfContents using `<Expand>`
- [ ] 4.3.2 Add scroll fade-in to PostItemCard using `<FadeIn>`
- [ ] 4.3.3 Add loading state animation to Loading components
- [ ] 4.3.4 Add stagger animation to PostList if appropriate
- [ ] 4.3.5 Test all animations for smooth 60fps performance
- [ ] 4.3.6 Test animations with reduced-motion preference

### 4.4 Create Animation Documentation

- [ ] 4.4.1 Document animation usage patterns in `docs/animation-guidelines.md`
- [ ] 4.4.2 Document when to use each animation type
- [ ] 4.4.3 Document accessibility considerations (prefers-reduced-motion)
- [ ] 4.4.4 Add usage examples for each animation component

## Phase 5: Documentation & Validation (1 day)

### 5.1 Create Comprehensive Documentation

- [ ] 5.1.1 Create `docs/design-system.md` - Complete design token reference
- [ ] 5.1.2 Update `docs/component-api-standards.md` with all conventions
- [ ] 5.1.3 Create `docs/custom-hooks.md` - Hook usage guide
- [ ] 5.1.4 Create `docs/state-management.md` - State pattern documentation
- [ ] 5.1.5 Update CLAUDE.md with new architectural patterns
- [ ] 5.1.6 Create `docs/refactoring-summary.md` - Before/after comparison

### 5.2 Code Quality Validation

- [ ] 5.2.1 Run `pnpm lint` and fix any ESLint errors
- [ ] 5.2.2 Run TypeScript compiler (`tsc --noEmit`) and fix type errors
- [ ] 5.2.3 Run `pnpm build` and ensure successful build
- [ ] 5.2.4 Check bundle size - ensure no significant increase
- [ ] 5.2.5 Run `pnpm lint-md` on documentation files

### 5.3 Manual Testing Checklist

- [ ] 5.3.1 Test theme toggle (light/dark) across all pages
- [ ] 5.3.2 Test mobile menu and drawer open/close
- [ ] 5.3.3 Test TableOfContents expand/collapse and active heading
- [ ] 5.3.4 Test all Popover/Tooltip interactions
- [ ] 5.3.5 Test category navigation and filtering
- [ ] 5.3.6 Test post list pagination and cards
- [ ] 5.3.7 Test responsive layouts (mobile, tablet, desktop)
- [ ] 5.3.8 Test keyboard navigation and accessibility
- [ ] 5.3.9 Test all animations with reduced-motion enabled
- [ ] 5.3.10 Visual regression check - compare before/after screenshots

### 5.4 Performance Validation

- [ ] 5.4.1 Measure initial page load time (Lighthouse)
- [ ] 5.4.2 Measure Time to Interactive (TTI)
- [ ] 5.4.3 Measure JavaScript bundle size
- [ ] 5.4.4 Check for any hydration performance regressions
- [ ] 5.4.5 Verify Core Web Vitals (LCP, FID, CLS)

### 5.5 OpenSpec Validation

- [ ] 5.5.1 Run `openspec validate refactor-ui-architecture-standardization --strict`
- [ ] 5.5.2 Resolve any validation errors
- [ ] 5.5.3 Verify all scenarios pass
- [ ] 5.5.4 Update tasks.md with checkboxes for completed items

## Success Criteria

All tasks completed when:

- ✅ All 150+ subtasks checked off
- ✅ TypeScript compilation succeeds with no errors
- ✅ Build succeeds without warnings
- ✅ All manual tests pass
- ✅ No performance regressions
- ✅ All documentation complete
- ✅ OpenSpec validation passes strict mode
- ✅ 100% backward compatibility maintained
