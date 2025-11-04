# Type System Specification Delta

## ADDED Requirements

### Requirement: Centralized Type Definitions

The system SHALL organize all TypeScript type definitions in `src/types/` directory with domain-specific files for discoverability and maintainability.

#### Scenario: Component prop types

- **WHEN** developer needs to reference component prop interface
- **THEN** developer imports type from `@types/components` centralized file

#### Scenario: UI shared types

- **WHEN** developer needs shared UI types (variants, sizes, states)
- **THEN** developer imports type from `@types/ui` file

#### Scenario: Content types

- **WHEN** developer works with blog post data
- **THEN** developer imports content types from `@types/content` file

### Requirement: Type File Organization

The system SHALL organize types into the following structure:

- `components.ts` - All component prop interfaces
- `ui.ts` - Shared UI types (ButtonVariant, BadgeVariant, Size, OpenCloseState, etc.)
- `content.ts` - Blog content types (Post, Category, Tag, etc.)
- `animation.ts` - Motion-related types (SpringConfig, AnimationVariant, etc.)
- `index.ts` - Barrel export for convenient imports

#### Scenario: Import from barrel export

- **WHEN** developer needs multiple types from different files
- **THEN** developer can import all types from `@types` using barrel export

#### Scenario: Type file size limit

- **WHEN** type file grows beyond 200 lines
- **THEN** file is split into more specific sub-domain files

### Requirement: Component Prop Interface Naming

The system SHALL name component prop interfaces consistently using pattern `[ComponentName]Props`.

#### Scenario: Component props interface

- **WHEN** developer defines props for Button component
- **THEN** interface is named `ButtonProps` and exported from `@types/components`

#### Scenario: Sub-component props

- **WHEN** developer defines props for CardHeader sub-component
- **THEN** interface is named `CardHeaderProps` and includes parent context if needed

### Requirement: Reusable Type Patterns

The system SHALL define common reusable type patterns for component development.

#### Scenario: Open/close state type

- **WHEN** component manages open/close state
- **THEN** component uses `OpenCloseState` type from `@types/ui`

#### Scenario: Controlled component props

- **WHEN** component supports controlled mode
- **THEN** component uses `ControlledComponentProps<T>` generic type pattern

#### Scenario: Variant types

- **WHEN** component supports variants
- **THEN** component uses CVA variant type extracted as const enum or union type

### Requirement: Type Safety for Design Tokens

The system SHALL provide TypeScript types for design tokens to ensure valid token references.

#### Scenario: Color token reference

- **WHEN** developer references color from design tokens
- **THEN** TypeScript autocomplete suggests valid color names and prevents invalid values

#### Scenario: Spacing token reference

- **WHEN** developer references spacing value
- **THEN** TypeScript enforces valid spacing scale values

### Requirement: Generic Type Constraints

The system SHALL use TypeScript generic constraints for flexible, type-safe component APIs.

#### Scenario: Segmented component with generic value

- **WHEN** developer uses Segmented component with custom value type
- **THEN** component enforces type safety for value, onChange callback, and options

#### Scenario: Dropdown component with generic items

- **WHEN** developer uses dropdown with custom item type
- **THEN** TypeScript infers item type throughout component and callbacks
