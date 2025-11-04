# Change: UI Architecture Standardization and Code Quality Refactoring

## Why

The codebase has grown organically and accumulated technical debt in several areas:

1. **Inconsistent state management patterns** - Components use a mix of CustomEvent, MutationObserver, and direct state management, making code hard to reason about and maintain
2. **Type definitions scattered** - Component prop interfaces are spread across 43+ files with no central type registry, leading to potential type safety gaps
3. **Code duplication** - The same open/close toggle pattern is repeated in 4+ components (MenuIcon, Popover, Tooltip, DropdownNav)
4. **Large monolithic components** - TableOfContents.tsx (400 lines) mixes concerns: tree building, active state tracking, accordion logic, and rendering
5. **No formal design system** - Color values are hardcoded (e.g., `#E95469`), spacing is inconsistent, and there's no single source of truth for visual tokens
6. **Missing component standards** - No consistent prop interface patterns or API conventions across components
7. **Incomplete animation coverage** - Only 56% of components have animations, with no documented animation standards

This refactoring will establish a solid foundation for future feature development while maintaining 100% backward compatibility with existing blog content and component APIs.

## What Changes

This is a comprehensive, non-breaking refactoring organized into 6 capability areas:

### 1. State Management Refactoring

- **Extract custom hooks library** - Create reusable hooks (`useToggle`, `useControlledState`, `useHeadingTree`, `useFloatingUI`)
- **Consolidate global state** - Replace CustomEvent patterns with Nanostores for drawer, menu, and modal states
- **Standardize event handling** - Document patterns for different state scopes (component-local, cross-component, global)

### 2. Type System Reorganization

- **Centralize type definitions** - Create `src/types/` with organized type files:
  - `components.ts` - All component prop interfaces
  - `ui.ts` - UI component shared types (variants, sizes, etc.)
  - `content.ts` - Blog content types
  - `animation.ts` - Motion-related types
- **Extract common types** - Document reusable type patterns (OpenCloseState, ControlledComponentProps, etc.)
- **Improve type safety** - Add generic constraints and stricter types where missing

### 3. Design System Establishment

- **Define design tokens** - Create `src/constants/design-tokens.ts`:
  - Color system (semantic color names, no hardcoded values)
  - Spacing scale (consistent spacing/gap patterns)
  - Typography scale (font sizes, line heights, letter spacing)
  - Shadow system (card shadows, elevation levels)
  - Border radius scale
  - Animation timings (durations, easing functions)
- **Create CSS variable mapping** - Map design tokens to Tailwind CSS variables
- **Document design decisions** - Create design system documentation

### 4. Component API Standardization

- **Define prop interface conventions**:
  - Required vs optional props
  - Naming patterns (className vs class, children vs content)
  - Event handler naming (onClick vs onPress, onChange vs onValueChange)
  - Forwarding patterns (ref forwarding, spreading props)
- **Standardize variant systems** - Consistent use of CVA for all components with variants
- **Document component APIs** - JSDoc comments with usage examples

### 5. Animation System Enhancement

- **Create animation component library** - Reusable animation wrappers:
  - `<FadeIn>` - Fade in on mount/scroll
  - `<SlideIn>` - Slide animations with direction
  - `<Expand>` - Height/width expansion animations
  - `<Stagger>` - Staggered children animations
- **Standardize animation patterns** - Document when to use each animation type
- **Add missing animations** - TableOfContents expand/collapse, PostItemCard scroll fade-in, loading state transitions

### 6. UI Component Refactoring

- **Decompose large components**:
  - Split TableOfContents.tsx into smaller components with custom hooks
  - Extract PostItemCard styles to CSS module or component styles
- **Create shared utilities** - Extract common patterns into `src/lib/ui-utils.ts`
- **Add error boundaries** - Wrap Floating UI components for resilience
- **Document hydration strategy** - Clear guidelines for `client:load` vs `client:visible` vs `client:idle`

## Impact

### Affected Specs

Since this is the first OpenSpec change, we're creating the initial specifications for:

- `ui-components` - Base UI component system
- `state-management` - State patterns and hooks
- `type-system` - TypeScript organization
- `design-system` - Visual design tokens
- `animation-system` - Animation patterns
- `component-api` - Component interface standards

### Affected Code

- **43 component files** in `src/components/` (all will be improved, but APIs remain compatible)
- **New directories**:
  - `src/hooks/` - Custom hooks library
  - `src/types/` - Centralized type definitions
  - `src/constants/design-tokens.ts` - Design system tokens
  - `src/lib/ui-utils.ts` - UI utilities
  - `src/components/animation/` - Animation wrappers
- **Modified files**:
  - `src/store/ui.ts` - New global UI state
  - `tailwind.config.mjs` - Design token integration
  - `src/styles/global/tailwind.css` - Additional utilities
  - All component files (internal improvements, public APIs unchanged)

### Breaking Changes

**NONE** - This refactoring maintains 100% backward compatibility:

- All existing component APIs remain unchanged
- Hexo content compatibility preserved
- Existing routes and URLs unaffected
- Build process unchanged

### Migration Path

No migration required. This is an internal code quality improvement that:

- Preserves all existing functionality
- Maintains all component APIs
- Requires no changes to consuming code
- Can be deployed incrementally

### Benefits

1. **Improved maintainability** - Consistent patterns reduce cognitive load
2. **Better type safety** - Centralized types reduce errors
3. **Faster development** - Reusable hooks and components
4. **Consistent UX** - Design system ensures visual coherence
5. **Better documentation** - Clear standards and examples
6. **Easier testing** - Smaller components with single responsibilities
7. **Performance** - No negative performance impact, potential improvements from better hydration strategy

### Timeline Estimate

- Phase 1 (Type system & Design tokens): 1-2 days
- Phase 2 (State management & Hooks): 2-3 days
- Phase 3 (Component refactoring): 3-4 days
- Phase 4 (Animation system): 1-2 days
- Phase 5 (Documentation & validation): 1 day
- **Total**: 8-12 days for complete implementation

### Risk Mitigation

- **Testing strategy**: Manual testing of all interactive components after each phase
- **Rollback plan**: Git-based rollback if any compatibility issues discovered
- **Incremental deployment**: Can deploy capabilities independently
- **Validation**: ESLint, TypeScript compiler, and build process ensure no regressions
