# Component API Specification Delta

## ADDED Requirements

### Requirement: Prop Naming Conventions

The system SHALL enforce consistent prop naming patterns across all components for predictable APIs.

#### Scenario: className prop

- **WHEN** component accepts custom CSS classes
- **THEN** prop is named `className` (not `class` or `classes`)

#### Scenario: children prop

- **WHEN** component accepts content as children
- **THEN** prop is named `children` (not `content` or `body`)

#### Scenario: Boolean prop naming

- **WHEN** component has boolean prop
- **THEN** prop is named with "is" or "has" prefix (isOpen, hasError) or simple adjective (disabled, loading)

### Requirement: Event Handler Naming

The system SHALL use consistent event handler naming patterns following React conventions.

#### Scenario: Click handler

- **WHEN** component accepts click handler
- **THEN** prop is named `onClick` (not `onPress` or `handleClick`)

#### Scenario: Change handler

- **WHEN** component accepts value change handler
- **THEN** prop is named `onChange` (not `onValueChange` or `handleChange`)

#### Scenario: Custom event handlers

- **WHEN** component emits custom event
- **THEN** handler is named `on[EventName]` following camelCase (onOpenChange, onSelectItem)

### Requirement: Variant System with CVA

The system SHALL use class-variance-authority (CVA) for all components with multiple visual variants.

#### Scenario: Button variants

- **WHEN** Button component has multiple styles
- **THEN** component uses CVA to define variants (variant: default|secondary|destructive|outline|ghost)

#### Scenario: Size variants

- **WHEN** component supports multiple sizes
- **THEN** component uses CVA size variant (size: sm|md|lg|xl)

#### Scenario: Compound variants

- **WHEN** variant combination needs special styling
- **THEN** CVA compoundVariants define specific style for combination

### Requirement: Ref Forwarding

The system SHALL forward refs for all components that render DOM elements to allow parent components to access underlying DOM nodes.

#### Scenario: Button ref forwarding

- **WHEN** parent component needs ref to button DOM element
- **THEN** Button component uses React.forwardRef to forward ref

#### Scenario: Custom component ref

- **WHEN** complex component needs to expose imperative handle
- **THEN** component uses useImperativeHandle to expose specific methods

#### Scenario: Ref typing

- **WHEN** component forwards ref
- **THEN** TypeScript types correctly infer ref type based on rendered element

### Requirement: Props Spreading Pattern

The system SHALL accept and spread additional HTML attributes for flexibility while maintaining type safety.

#### Scenario: Rest props spreading

- **WHEN** component receives props not explicitly defined
- **THEN** component spreads rest props onto root DOM element

#### Scenario: Type-safe spreading

- **WHEN** component spreads props
- **THEN** TypeScript infers valid HTML attributes based on rendered element type

#### Scenario: Props precedence

- **WHEN** component props conflict with spread props
- **THEN** explicit component props take precedence over spread props

### Requirement: Controlled and Uncontrolled Modes

The system SHALL support both controlled and uncontrolled modes for stateful components.

#### Scenario: Controlled mode

- **WHEN** component receives `value` and `onChange` props
- **THEN** component operates in controlled mode, state managed by parent

#### Scenario: Uncontrolled mode

- **WHEN** component receives `defaultValue` but no `value` prop
- **THEN** component operates in uncontrolled mode, state managed internally

#### Scenario: Mode detection

- **WHEN** component implementation detects controlled vs uncontrolled
- **THEN** useControlledState hook handles both modes seamlessly

### Requirement: Required vs Optional Props

The system SHALL clearly distinguish required and optional props in TypeScript interfaces.

#### Scenario: Required props

- **WHEN** component cannot function without specific prop
- **THEN** prop is marked as required in TypeScript interface (no `?` modifier)

#### Scenario: Optional props with defaults

- **WHEN** component has sensible default for prop
- **THEN** prop is marked optional with default value documented in JSDoc

#### Scenario: Destructuring with defaults

- **WHEN** component destructures props
- **THEN** optional props have default values in destructuring assignment

### Requirement: Children Type Safety

The system SHALL properly type children prop based on expected content.

#### Scenario: React node children

- **WHEN** component accepts any React content
- **THEN** children prop is typed as `React.ReactNode`

#### Scenario: Specific component children

- **WHEN** component only accepts specific child types (e.g., MenuItem)
- **THEN** children prop is typed to enforce valid children

#### Scenario: Function children (render props)

- **WHEN** component uses render prop pattern
- **THEN** children prop is typed as function with correct parameters

### Requirement: Component JSDoc Documentation

The system SHALL document all component props and usage with JSDoc comments for IDE autocomplete.

#### Scenario: Component documentation

- **WHEN** developer hovers over component in IDE
- **THEN** JSDoc comment shows component description and usage example

#### Scenario: Prop documentation

- **WHEN** developer types component prop
- **THEN** JSDoc comment shows prop description, type, and default value

#### Scenario: Usage examples

- **WHEN** JSDoc includes @example tag
- **THEN** IDE shows code example of component usage

### Requirement: Prop Interface Exports

The system SHALL export TypeScript prop interfaces for all components to enable type reuse and extension.

#### Scenario: Component props export

- **WHEN** component defines props interface
- **THEN** interface is exported from component file and available in `@types/components`

#### Scenario: Props extension

- **WHEN** developer creates wrapper component
- **THEN** developer extends original component props interface

#### Scenario: Props composition

- **WHEN** multiple components share props
- **THEN** shared props are extracted to common interface in `@types/ui`

### Requirement: Consistent Default Props Pattern

The system SHALL use destructuring with default values instead of separate defaultProps for default prop values.

#### Scenario: Default prop values

- **WHEN** component has optional props with defaults
- **THEN** defaults are provided in destructuring assignment, not defaultProps

#### Scenario: Complex default objects

- **WHEN** default prop is object or array
- **THEN** default is defined outside component to prevent recreation on each render

#### Scenario: Conditional defaults

- **WHEN** default value depends on other props
- **THEN** default is computed in component body, not in destructuring
