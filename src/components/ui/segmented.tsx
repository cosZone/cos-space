import { cn } from '@lib/utils';
import { motion } from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';

export type OptionType<T extends string | number = string | number> = {
  label?: string;
  value: T;
} | null;

type SegmentedProps<T extends string | number = string | number> = {
  options: OptionType<T>[]; // 选项
  defaultValue?: T; // 默认值
  onChange?: (value: T) => void;
  className?: string;
  indicateClass?: string;
  itemClass?: string;
  id?: string;
  value?: T; // 受控
};

export const Segmented = <T extends string | number = string | number>({
  options,
  defaultValue,
  onChange,
  className,
  id,
  indicateClass,
  itemClass,
  value,
}: SegmentedProps<T>) => {
  const [_value, setValue] = useState<T>(() => (value ?? defaultValue ?? options[0]?.value ?? '') as T);

  const select = useCallback(
    (value: T) => {
      setValue(value);
      onChange?.(value);
    },
    [setValue, onChange],
  );
  const isSelected = useCallback((selectedValue: T) => _value === selectedValue, [_value]);

  useEffect(() => {
    if (value) setValue(value);
  }, [value]);

  return (
    <div
      className={cn(
        'bg-muted flex w-fit cursor-pointer rounded-sm p-1 text-xs font-semibold backdrop-blur-lg select-none',
        className,
      )}
    >
      {options.map((option) => {
        if (!option) return null;
        const { label, value } = option;
        return (
          <div
            className={cn(
              'flex-center relative px-3 py-1 first:rounded-l-xs last:rounded-r-xs',
              { 'text-primary-foreground': isSelected(value) },
              { 'opacity-50': !isSelected(value) },
              itemClass,
            )}
            onClick={() => select(value)}
            key={value}
          >
            {label}
            {isSelected(value) && (
              <motion.div
                layoutId={`segmented_selected_${id ?? 'default'}`}
                className={cn('shoka-button-shadow bg-gradient-shoka-button absolute inset-0 -z-10 rounded-sm', indicateClass)}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Segmented);
