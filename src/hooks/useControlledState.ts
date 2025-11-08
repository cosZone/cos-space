/**
 * useControlledState Hook
 *
 * Handles the controlled/uncontrolled component pattern for any stateful value.
 * Allows components to work in both modes seamlessly.
 *
 * @example
 * ```tsx
 * // In a component that supports both modes
 * function Dropdown({ value, defaultValue, onChange }) {
 *   const [selectedValue, setSelectedValue] = useControlledState({
 *     value,
 *     defaultValue,
 *     onChange
 *   });
 *
 *   // Use selectedValue and setSelectedValue normally
 *   return <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value)} />;
 * }
 * ```
 */

import { useCallback, useEffect, useRef, useState } from 'react';

export interface UseControlledStateOptions<T> {
  /** Controlled value */
  value?: T;
  /** Default value for uncontrolled mode */
  defaultValue?: T;
  /** Callback when value changes */
  onChange?: (value: T) => void;
}

/**
 * Hook for managing controlled/uncontrolled component state
 *
 * @param options - Controlled state options
 * @returns Current value and setter function
 */
export function useControlledState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControlledStateOptions<T>): [T | undefined, (value: T) => void] {
  // Determine if component is controlled
  const isControlled = controlledValue !== undefined;
  const isControlledRef = useRef(isControlled);

  // Warn if controlled mode changes during component lifetime (React anti-pattern)
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      if (isControlled !== isControlledRef.current) {
        console.warn(
          'useControlledState: Component changed from ' +
            `${isControlledRef.current ? 'controlled' : 'uncontrolled'} to ` +
            `${isControlled ? 'controlled' : 'uncontrolled'}. ` +
            'This is an anti-pattern and may cause bugs.',
        );
      }
    }
    isControlledRef.current = isControlled;
  }, [isControlled]);

  // Internal state for uncontrolled mode
  const [internalValue, setInternalValue] = useState(defaultValue);

  // Use controlled value if provided, otherwise use internal value
  const value = isControlled ? controlledValue : internalValue;

  /**
   * Set value (works for both controlled and uncontrolled)
   */
  const setValue = useCallback(
    (newValue: T) => {
      // Update internal state if uncontrolled
      if (!isControlled) {
        setInternalValue(newValue);
      }

      // Call onChange callback
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  return [value, setValue];
}
