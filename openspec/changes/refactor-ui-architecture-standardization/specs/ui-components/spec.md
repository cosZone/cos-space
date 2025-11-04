# UI Components Specification Delta

## ADDED Requirements

### Requirement: Base UI Component Library

The system SHALL provide a set of reusable base UI components (Button, Badge, Card, Avatar, Tooltip, Popover) following shadcn/ui patterns with Radix UI primitives and class-variance-authority (CVA) for variants.

#### Scenario: Button component with variants

- **WHEN** developer imports and uses Button component with variant prop
- **THEN** component renders with correct styling based on variant (default, secondary, destructive, outline, ghost)

#### Scenario: Card composition

- **WHEN** developer composes Card with sub-components (CardHeader, CardTitle, CardContent, CardFooter)
- **THEN** all sub-components render correctly with appropriate spacing and styling

#### Scenario: Floating UI components

- **WHEN** developer uses Popover or Tooltip components
- **THEN** components use Floating UI library for positioning and handle edge detection automatically

### Requirement: Component Class Name Merging

The system SHALL merge Tailwind CSS class names using the `cn()` utility (tailwind-merge + clsx) to prevent class conflicts and ensure correct precedence.

#### Scenario: Conflicting class names

- **WHEN** developer passes className prop with conflicting Tailwind classes (e.g., "p-2" and "p-4")
- **THEN** the last class takes precedence and no duplicate classes are applied

#### Scenario: Conditional classes

- **WHEN** developer uses conditional classes with clsx pattern
- **THEN** only classes that meet conditions are applied to the component

### Requirement: Error Boundary Protection

The system SHALL wrap Floating UI components (Popover, Tooltip, DropdownNav) with ErrorBoundary components to prevent positioning failures from crashing the application.

#### Scenario: Floating UI positioning error

- **WHEN** Floating UI component encounters positioning error (e.g., invalid reference element)
- **THEN** ErrorBoundary catches error and displays fallback UI without crashing the page

#### Scenario: Error boundary fallback

- **WHEN** component error is caught by ErrorBoundary
- **THEN** user sees graceful error message and can continue using the rest of the page

### Requirement: Component Size Standards

The system SHALL enforce component file size limits with single components under 200 lines of code for maintainability.

#### Scenario: Large component decomposition

- **WHEN** component exceeds 200 lines of code
- **THEN** component is split into smaller sub-components with clear responsibilities

#### Scenario: Complex logic extraction

- **WHEN** component has complex business logic
- **THEN** logic is extracted into custom hooks in `src/hooks/`

### Requirement: Astro and React Component Split

The system SHALL use Astro components for server-rendered content and React components for interactive UI requiring client-side JavaScript.

#### Scenario: Static content rendering

- **WHEN** component only displays static content without interactivity
- **THEN** component is implemented as Astro component (.astro file)

#### Scenario: Interactive UI rendering

- **WHEN** component requires interactivity (state management, event handlers, animations)
- **THEN** component is implemented as React component (.tsx file) with appropriate client directive

### Requirement: Client Hydration Strategy

The system SHALL use appropriate Astro client directives based on component priority and visibility.

#### Scenario: Critical above-fold interactive component

- **WHEN** interactive component is critical and appears above the fold
- **THEN** component uses `client:load` directive for immediate hydration

#### Scenario: Below-fold interactive component

- **WHEN** interactive component appears below the fold
- **THEN** component uses `client:visible` directive for lazy hydration

#### Scenario: Non-critical interactive component

- **WHEN** interactive component is non-critical (e.g., analytics, non-essential features)
- **THEN** component uses `client:idle` directive to defer hydration
