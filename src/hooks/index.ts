/**
 * Custom Hooks Barrel Export
 *
 * Centralized export for all custom React hooks.
 * Import hooks from '@hooks' for convenience.
 */

// Toggle state hook
export { useToggle, type UseToggleOptions, type UseToggleReturn } from './useToggle';

// Controlled/uncontrolled state pattern
export { useControlledState, type UseControlledStateOptions } from './useControlledState';

// Floating UI wrapper
export { useFloatingUI, type UseFloatingUIOptions } from './useFloatingUI';

// Media query hooks
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersColorSchemeDark,
  usePrefersReducedMotion,
} from './useMediaQuery';
