# State Management Specification Delta

## ADDED Requirements

### Requirement: Custom React Hooks Library

The system SHALL provide a library of reusable custom React hooks in `src/hooks/` for common state patterns to reduce code duplication.

#### Scenario: Toggle state hook

- **WHEN** component needs open/close toggle state
- **THEN** component uses `useToggle` hook which provides `isOpen` state and `toggle`, `open`, `close` functions

#### Scenario: Controlled component state

- **WHEN** component supports both controlled and uncontrolled modes
- **THEN** component uses `useControlledState` hook to handle both patterns seamlessly

#### Scenario: Floating UI configuration

- **WHEN** component needs Floating UI positioning
- **THEN** component uses `useFloatingUI` hook with shared default configuration

### Requirement: Nanostores for Global UI State

The system SHALL use Nanostores library for global UI state management (drawer, menu, modal states) to replace CustomEvent pattern.

#### Scenario: Drawer state management

- **WHEN** user toggles mobile drawer from MenuIcon component
- **THEN** drawerOpen nanostore updates and all subscribed components (FloatingGroup, HomeSider) react to state change

#### Scenario: Cross-component state synchronization

- **WHEN** multiple components need to access same global state
- **THEN** components import and subscribe to appropriate nanostore atom

#### Scenario: Type-safe state updates

- **WHEN** developer updates nanostore state
- **THEN** TypeScript enforces correct value type and prevents type errors

### Requirement: Component-Local State Patterns

The system SHALL use React useState for component-local state that doesn't need to be shared across components.

#### Scenario: Local UI state

- **WHEN** component has state that only affects itself (e.g., form input value)
- **THEN** component uses useState hook for local state management

#### Scenario: Derived state

- **WHEN** component needs state derived from props or other state
- **THEN** component uses useMemo hook to compute derived state efficiently

### Requirement: Event Handling Standardization

The system SHALL eliminate CustomEvent pattern in favor of Nanostores for global state and props callbacks for component state.

#### Scenario: Parent-child communication

- **WHEN** child component needs to communicate with parent
- **THEN** parent passes callback function as prop and child invokes callback

#### Scenario: Cross-component communication

- **WHEN** components need to communicate across component tree
- **THEN** components use shared Nanostores instead of CustomEvent

### Requirement: TableOfContents State Extraction

The system SHALL extract TableOfContents component state management into dedicated custom hooks for heading tree, active heading detection, and expand/collapse logic.

#### Scenario: Heading tree construction

- **WHEN** TableOfContents component mounts
- **THEN** `useHeadingTree` hook builds hierarchical heading structure with numbering

#### Scenario: Active heading detection

- **WHEN** user scrolls page
- **THEN** `useActiveHeading` hook detects current visible heading using Intersection Observer and updates active state

#### Scenario: Accordion state management

- **WHEN** user expands or collapses heading sections
- **THEN** `useExpandedState` hook manages expanded heading IDs and provides toggle function
