/**
 * useToggle Hook
 *
 * Reusable hook for managing open/close toggle state in components.
 * Supports both controlled and uncontrolled modes.
 *
 * @example
 * ```tsx
 * // Uncontrolled mode
 * const { isOpen, toggle, open, close } = useToggle();
 *
 * // Controlled mode with onChange callback
 * const { isOpen, toggle } = useToggle({
 *   defaultOpen: false,
 *   onChange: (open) => console.log('Open state:', open)
 * });
 *
 * // Fully controlled mode
 * const [open, setOpen] = useState(false);
 * const { isOpen, toggle } = useToggle({
 *   open,
 *   onChange: setOpen
 * });
 * ```
 */

import { useCallback, useState } from 'react';

export interface UseToggleOptions {
  /** Controlled open state */
  open?: boolean;
  /** Default open state for uncontrolled mode */
  defaultOpen?: boolean;
  /** Callback when open state changes */
  onChange?: (open: boolean) => void;
}

export interface UseToggleReturn {
  /** Current open state */
  isOpen: boolean;
  /** Toggle between open/close */
  toggle: () => void;
  /** Set to open */
  open: () => void;
  /** Set to close */
  close: () => void;
  /** Set to specific state */
  setIsOpen: (open: boolean) => void;
}

/**
 * Hook for managing toggle state (open/close, on/off, etc.)
 *
 * @param options - Toggle options
 * @returns Toggle state and control functions
 */
export function useToggle(options: UseToggleOptions = {}): UseToggleReturn {
  const { open: controlledOpen, defaultOpen = false, onChange } = options;

  // Determine if component is controlled
  const isControlled = controlledOpen !== undefined;

  // Internal state for uncontrolled mode
  const [internalOpen, setInternalOpen] = useState(defaultOpen);

  // Use controlled state if provided, otherwise use internal state
  const isOpen = isControlled ? controlledOpen : internalOpen;

  /**
   * Set open state (works for both controlled and uncontrolled)
   */
  const setIsOpen = useCallback(
    (newOpen: boolean) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalOpen(newOpen);
      }

      // Call onChange callback
      onChange?.(newOpen);
    },
    [isControlled, onChange],
  );

  /**
   * Toggle between open and closed
   */
  const toggle = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  /**
   * Set to open state
   */
  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  /**
   * Set to closed state
   */
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return {
    isOpen,
    toggle,
    open,
    close,
    setIsOpen,
  };
}
