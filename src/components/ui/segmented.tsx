import { cn } from '@lib/utils';
import { motion } from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';

export type OptionType = {
  label?: string;
  value: string | number;
} | null;

type SegmentedProps = {
  options: OptionType[]; // 选项
  defaultValue?: string | number; // 默认值
  onChange?: (value: string | number) => void;
  className?: string;
  indicateClass?: string;
  itemClass?: string;
  id?: string;
  value?: string | number; // 受控
};

export const Segmented = ({
  options,
  defaultValue,
  onChange,
  className,
  id,
  indicateClass,
  itemClass,
  value,
}: SegmentedProps) => {
  const [_value, setValue] = useState(() => value ?? defaultValue ?? options[0]?.value ?? '');

  const select = useCallback(
    (value: string | number) => {
      setValue(value);
      onChange?.(value);
    },
    [setValue, onChange],
  );
  const isSelected = useCallback((selectedValue: string | number) => _value === selectedValue, [_value]);

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
