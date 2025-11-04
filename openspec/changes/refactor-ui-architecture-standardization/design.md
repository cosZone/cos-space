# Design Document: UI Architecture Standardization

## Context

### Background

cosSpace is an Astro-based blog migrated from Hexo, featuring 43 components (~3,267 lines of code) built with React, Tailwind CSS, and Motion. The codebase has accumulated technical debt through organic growth:

- State management uses three different patterns (CustomEvent, MutationObserver, direct state)
- Type definitions are scattered across component files
- No formal design system (hardcoded values like `#E95469`)
- Large monolithic components (TableOfContents.tsx at 400 lines)
- Inconsistent animation coverage (only 56% of components)

### Constraints

1. **Zero breaking changes** - Must maintain 100% API compatibility
2. **Hexo content compatibility** - All existing blog posts must continue to work
3. **Build process unchanged** - Same commands (`pnpm dev`, `pnpm build`)
4. **No new framework dependencies** - Use existing libraries (Nanostores, Motion, CVA)
5. **Performance neutral or better** - No significant bundle size increase

### Stakeholders

- **Content authors** - Must continue writing posts with existing frontmatter
- **Future developers** - Need clear patterns and documentation
- **End users** - Expect same functionality and performance

### Current Pain Points

1. **Maintenance burden** - Finding and fixing bugs across scattered code
2. **Onboarding difficulty** - No clear patterns for new developers
3. **Type safety gaps** - Scattered types increase error risk
4. **Visual inconsistency** - Hardcoded values create design drift
5. **Component complexity** - Large components hard to test and modify

## Goals / Non-Goals

### Goals

1. **Establish design system** - Single source of truth for colors, spacing, typography
2. **Centralize types** - All interfaces in `src/types/` for easy discovery
3. **Extract reusable hooks** - Reduce code duplication through shared logic
4. **Decompose large components** - Single responsibility, testable units
5. **Standardize component APIs** - Consistent prop patterns across all components
6. **Complete animation coverage** - All interactive elements have appropriate feedback
7. **Document patterns** - Clear guidelines for state management, hydration, animations
8. **Improve code quality** - Better maintainability without changing functionality

### Non-Goals

1. **New features** - This is pure refactoring, no new functionality
2. **Framework changes** - Not switching from Astro or React
3. **Build process changes** - Same toolchain (Vite, pnpm)
4. **Content migrations** - No changes to blog post format
5. **Performance optimization** - Nice to have, but not the primary goal
6. **Testing framework** - Not adding Vitest or Playwright (future work)
7. **Accessibility audit** - Will maintain current a11y level (future enhancement)

## Decisions

### Decision 1: Centralize Types in `src/types/`

**What**: Create dedicated type files organized by domain

```typescript
src/types/
├── components.ts  # Component prop interfaces
├── ui.ts         # Shared UI types (variants, sizes)
├── content.ts    # Blog content types
├── animation.ts  # Motion-related types
└── index.ts      # Barrel export
```

**Why**:

- **Discoverability** - Developers know where to find types
- **Reusability** - Shared types prevent duplication
- **Refactoring safety** - Easier to update types in one place
- **Documentation** - Types serve as API documentation

**Alternatives considered**:

1. ❌ **Co-located types** - Current approach, causes scattered definitions
2. ❌ **Single types.ts file** - Would become too large (200+ lines)
3. ✅ **Domain-organized type files** - Best balance of organization and maintainability

**Trade-offs**:

- ➕ Better organization and discoverability
- ➕ Easier to maintain and update
- ➖ Requires import path updates (one-time cost)
- ➖ Need to decide which types belong in which file (clear with documentation)

### Decision 2: Use Nanostores for Global UI State

**What**: Replace CustomEvent pattern with Nanostores for drawer/menu state

```typescript
// src/store/ui.ts
import { atom } from 'nanostores';

export const drawerOpen = atom<boolean>(false);
export const mobileMenuOpen = atom<boolean>(false);
```

**Why**:

- **Already in use** - Project already depends on Nanostores
- **Type-safe** - Better than untyped CustomEvents
- **Reactive** - Components automatically update on state change
- **Small** - Only 334 bytes minified
- **Framework-agnostic** - Works with Astro, React, vanilla JS

**Alternatives considered**:

1. ❌ **Keep CustomEvent** - Untyped, error-prone, hard to debug
2. ❌ **Use React Context** - Doesn't work across Astro/React boundary
3. ❌ **Zustand or Redux** - Overkill for simple open/close state
4. ✅ **Nanostores** - Already in project, perfect for this use case

**Trade-offs**:

- ➕ Type-safe, reactive, debuggable
- ➕ No new dependencies
- ➕ Works across Astro/React components
- ➖ Learning curve for developers unfamiliar with Nanostores (minimal)

### Decision 3: Extract Reusable Hooks to `src/hooks/`

**What**: Create custom hooks library with common patterns

- `useToggle` - Open/close state with optional controlled mode
- `useControlledState` - Controlled/uncontrolled component pattern
- `useHeadingTree` - TableOfContents heading tree logic
- `useActiveHeading` - Scroll-based active heading detection
- `useFloatingUI` - Shared Floating UI configuration

**Why**:

- **DRY principle** - Same pattern repeated in 4+ components
- **Testability** - Hooks easier to unit test than full components
- **Reusability** - Other components can use these patterns
- **Separation of concerns** - Business logic separated from UI

**Alternatives considered**:

1. ❌ **Keep logic in components** - Current state, causes duplication
2. ❌ **Create utility functions** - Not reactive, doesn't work well with React
3. ✅ **Custom hooks** - React pattern, composable, testable

**Trade-offs**:

- ➕ Reduced code duplication
- ➕ Easier to test logic independently
- ➕ Better separation of concerns
- ➖ Requires understanding of hook composition (standard React knowledge)

### Decision 4: Design Token System with TypeScript + Tailwind Integration

**What**: Create design tokens in TypeScript, map to Tailwind theme

```typescript
// src/constants/design-tokens.ts
export const colors = {
  primary: { light: 'var(--primary)', dark: 'var(--primary)' },
  danger: { light: '#E95469', dark: '#FF6B7A' },
} as const;

export const spacing = {
  xs: '0.5rem', // 8px
  sm: '0.75rem', // 12px
  md: '1rem', // 16px
  // ...
} as const;
```

**Why**:

- **Type-safe** - TypeScript ensures valid token references
- **Single source of truth** - No more hardcoded values
- **Tailwind integration** - Tokens available as utility classes
- **Theme support** - Easy to extend for light/dark themes
- **Documentation** - Tokens serve as design documentation

**Alternatives considered**:

1. ❌ **CSS Custom Properties only** - Not type-safe, easy to mistype
2. ❌ **JSON config file** - No TypeScript validation
3. ❌ **Tailwind config only** - Hard to reference in JS/TS code
4. ✅ **TypeScript tokens + Tailwind mapping** - Best of both worlds

**Trade-offs**:

- ➕ Type-safe, self-documenting
- ➕ Works in both CSS and TypeScript
- ➕ Easy to extend and maintain
- ➖ Requires two files (tokens.ts + tailwind.config.mjs) - mitigated by clear mapping

### Decision 5: Decompose TableOfContents into Smaller Components

**What**: Split 400-line component into:

```plain
src/components/layout/TableOfContents/
├── index.tsx           # Main component (< 100 lines)
├── HeadingTreeItem.tsx # Individual heading item
└── HeadingAccordion.tsx # Accordion wrapper
```

**Why**:

- **Single responsibility** - Each component has one job
- **Testability** - Easier to test small components
- **Readability** - Easier to understand and modify
- **Reusability** - Sub-components can be used elsewhere

**Alternatives considered**:

1. ❌ **Keep as single file** - Current state, too complex
2. ❌ **Extract only hooks** - Still leaves large component
3. ✅ **Extract both hooks and sub-components** - Best maintainability

**Trade-offs**:

- ➕ Much easier to understand and maintain
- ➕ Better separation of concerns
- ➕ Easier to test individual parts
- ➖ More files to navigate (mitigated by clear structure)

### Decision 6: Animation Component Wrappers

**What**: Create reusable animation components

```tsx
<FadeIn delay={0.1}>
  <PostItemCard {...post} />
</FadeIn>
```

**Why**:

- **Consistency** - Same animation parameters everywhere
- **Declarative** - Easy to understand what's animated
- **Accessibility** - Single place to handle `prefers-reduced-motion`
- **Reusability** - No need to rewrite animation logic

**Alternatives considered**:

1. ❌ **Inline Motion components everywhere** - Current state, duplicates logic
2. ❌ **Utility functions** - Not as declarative, harder to compose
3. ✅ **Wrapper components** - Most React-idiomatic approach

**Trade-offs**:

- ➕ Consistent, declarative, accessible
- ➕ Easy to update animation globally
- ➖ Additional components (small cost)

### Decision 7: Component API Standards Documentation

**What**: Create `docs/component-api-standards.md` with conventions:

- Prop naming (className not class, children not content)
- Event handlers (onClick not onPress, onChange not onValueChange)
- Ref forwarding (always use forwardRef for DOM components)
- Variant systems (use CVA for all multi-variant components)

**Why**:

- **Consistency** - Developers know what to expect
- **Onboarding** - New developers can reference standards
- **Code review** - Clear criteria for API design
- **Maintenance** - Easier to refactor with clear patterns

**Alternatives considered**:

1. ❌ **No documentation** - Current state, implicit knowledge
2. ❌ **Code comments only** - Not discoverable
3. ✅ **Dedicated documentation** - Single source of truth

**Trade-offs**:

- ➕ Clear standards for all developers
- ➕ Easier code reviews
- ➖ Need to maintain documentation (small cost)

## Architecture Decisions

### File Structure After Refactoring

```plain
src/
├── components/          # React & Astro components (unchanged)
│   ├── animation/       # NEW: Animation wrapper components
│   ├── common/          # ErrorBoundary, Remark
│   ├── ui/              # Reusable UI (Button, Badge, etc.)
│   ├── layout/          # Layout components
│   └── ...
├── hooks/              # NEW: Custom React hooks
│   ├── useToggle.ts
│   ├── useControlledState.ts
│   ├── useHeadingTree.ts
│   └── index.ts
├── types/              # NEW: Centralized type definitions
│   ├── components.ts
│   ├── ui.ts
│   ├── content.ts
│   ├── animation.ts
│   └── index.ts
├── constants/
│   ├── design-tokens.ts # NEW: Design system tokens
│   ├── anim/            # Animation constants (enhanced)
│   └── ...
├── store/
│   └── ui.ts           # NEW: Global UI state (Nanostores)
└── lib/
    └── ui-utils.ts     # NEW: UI utility functions
```

### Import Path Organization

```typescript
// Before
import { PostItemCardProps } from './PostItemCard.astro';

// After
import type { PostItemCardProps } from '@types/components';
import { useToggle } from '@hooks';
import { colors } from '@constants/design-tokens';
```

### Component Refactoring Pattern

```typescript
// Before: MenuIcon.tsx (inline state)
const [isOpen, setIsOpen] = useState(false);
const toggle = () => {
  const newState = !isOpen;
  setIsOpen(newState);
  document.dispatchEvent(new CustomEvent('toggleDrawer', { detail: { isOpen: newState } }));
};

// After: MenuIcon.tsx (hook + store)
import { useToggle } from '@hooks';
import { drawerOpen } from '@store/ui';

const { isOpen, toggle } = useToggle({
  onChange: (open) => drawerOpen.set(open),
});
```

## Risks / Trade-offs

### Risk 1: Import Path Refactoring Errors

**Risk**: Updating 43+ component imports could introduce missing imports

**Mitigation**:

- TypeScript compiler will catch missing imports
- ESLint with import plugin will catch issues
- Run `pnpm build` after each phase to verify

**Impact**: Low (tooling catches errors)

### Risk 2: State Management Race Conditions

**Risk**: Switching from CustomEvent to Nanostores could introduce timing issues

**Mitigation**:

- Nanostores are synchronous, same as CustomEvent
- Manual testing of all drawer/menu interactions
- No async operations involved

**Impact**: Very Low (similar patterns)

### Risk 3: Bundle Size Increase

**Risk**: New abstraction layers could increase JavaScript bundle

**Mitigation**:

- Nanostores is tiny (334 bytes)
- Custom hooks don't add runtime code (just organize existing code)
- Tree-shaking will remove unused exports
- Measure before/after with `pnpm build`

**Impact**: Minimal (< 1KB expected increase)

### Risk 4: Documentation Drift

**Risk**: Documentation could become outdated as code evolves

**Mitigation**:

- Include documentation in OpenSpec tasks
- Link documentation in code comments
- Regular reviews during future PRs

**Impact**: Low (standard documentation maintenance)

### Risk 5: Developer Learning Curve

**Risk**: Team needs to learn new patterns (hooks, design tokens)

**Mitigation**:

- All patterns are React/TypeScript standards
- Comprehensive documentation with examples
- Gradual adoption (can mix old/new patterns temporarily)

**Impact**: Low (standard React patterns)

## Migration Plan

### Phase-by-Phase Rollout

**Phase 1: Foundation (Types + Tokens)** - Low Risk

- Create new directories and files
- No changes to existing components yet
- Can validate TypeScript compilation independently
- **Rollback**: Delete new files

**Phase 2: State Management** - Medium Risk

- Refactor state patterns component by component
- Each component can be tested independently
- Can rollback individual component changes
- **Rollback**: Git revert specific component files

**Phase 3: Component Standardization** - Low Risk

- Internal refactoring, APIs unchanged
- Can deploy incrementally
- Each component change is independent
- **Rollback**: Git revert specific component files

**Phase 4: Animation System** - Low Risk

- Additive changes (new components, enhanced existing)
- No removal of existing animations
- Can test with `prefers-reduced-motion`
- **Rollback**: Git revert animation directory

**Phase 5: Documentation** - No Risk

- Only adds documentation files
- No code changes
- **Rollback**: Not needed

### Validation Strategy

**After Each Phase**:

1. Run `pnpm lint` (ESLint validation)
2. Run TypeScript compiler (`tsc --noEmit`)
3. Run `pnpm build` (build succeeds)
4. Manual testing of affected components
5. Visual comparison (screenshot if needed)

**Final Validation**:

1. All 150+ tasks completed
2. OpenSpec validation passes strict mode
3. Full manual testing checklist completed
4. Bundle size comparison (< 1% increase acceptable)
5. Lighthouse performance scores (no regressions)

### Rollback Plan

**Component-level rollback**:

```bash
# Rollback specific component
git checkout HEAD~1 src/components/ui/MenuIcon.tsx

# Rollback entire phase
git revert <phase-commit-sha>
```

**Full rollback**:

```bash
# Revert entire refactoring branch
git reset --hard <pre-refactor-commit>
```

**Risk assessment**: Low risk of needing rollback due to:

- No API changes (backward compatible)
- TypeScript catches errors at compile time
- Incremental deployment with testing after each phase

## Open Questions

### Q1: Should we add unit tests for custom hooks?

**Options**:

- A) Yes, add Vitest and test hooks now
- B) No, defer testing to future work

**Recommendation**: Option B (defer). Adding testing framework is outside refactoring scope and adds significant complexity. Can be future enhancement.

### Q2: Should we create a component documentation site (Storybook)?

**Options**:

- A) Yes, add Storybook for component documentation
- B) No, use markdown documentation only

**Recommendation**: Option B (markdown). Storybook adds build complexity and is not required for refactoring goals. Markdown docs with JSDoc is sufficient.

### Q3: Should we refactor Astro component scripts to React?

**Options**:

- A) Convert complex Astro scripts (Navigator, FloatingGroup) to React
- B) Keep as Astro, just improve organization

**Recommendation**: Option B (keep as Astro). Current Astro/React split is logical. Converting would be breaking the "no framework changes" constraint.

### Q4: Should we enforce strict ESLint rules for new patterns?

**Options**:

- A) Add ESLint rules to enforce design token usage
- B) Rely on documentation and code review

**Recommendation**: Option B (documentation + review). Custom ESLint rules add complexity. Documentation with clear examples is sufficient for a small team.

### Q5: Should we version the design tokens?

**Options**:

- A) Add semantic versioning to design-tokens.ts exports
- B) No versioning, just iterate on tokens

**Recommendation**: Option B (no versioning). For an internal design system, versioning adds unnecessary complexity. Breaking changes can be handled through normal refactoring.

## Success Metrics

### Code Quality Metrics

- ✅ TypeScript compilation with zero errors
- ✅ ESLint passes with zero warnings
- ✅ Build succeeds without errors
- ✅ No increase in build warnings

### Maintainability Metrics

- ✅ Largest component under 200 lines (currently 400)
- ✅ Zero hardcoded color values
- ✅ All component props in centralized types
- ✅ All interactive components use shared hooks

### Documentation Metrics

- ✅ 100% of custom hooks documented with JSDoc
- ✅ Design system documentation complete
- ✅ Component API standards documented
- ✅ Animation guidelines documented

### Performance Metrics

- ✅ Bundle size increase < 1%
- ✅ Lighthouse performance score unchanged
- ✅ No Core Web Vitals regressions

### Compatibility Metrics

- ✅ All existing routes work
- ✅ All blog posts render correctly
- ✅ All interactive features functional
- ✅ Dark/light theme works correctly

## Conclusion

This refactoring establishes a solid architectural foundation for cosSpace while maintaining complete backward compatibility. The phased approach with clear validation at each step minimizes risk. By using existing dependencies (Nanostores, Motion) and standard React patterns (custom hooks, component composition), we avoid introducing new complexity while significantly improving code organization and maintainability.

The investment of 8-12 days will pay dividends in:

- Faster feature development (reusable patterns)
- Easier onboarding (clear documentation)
- Fewer bugs (better type safety)
- Consistent UX (design system)
- Better code reviews (clear standards)
