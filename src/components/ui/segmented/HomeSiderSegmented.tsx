import type { HomeSiderSegmentType } from '@constants/enum';
import { cn } from '@lib/utils';
import { homeSiderSegmentType } from '@store/app';
import { motion } from 'motion/react';
import React, { useCallback, useEffect, useState } from 'react';

export type OptionType = {
  label?: string;
  value: HomeSiderSegmentType;
} | null;

type SegmentedProps = {
  options: OptionType[]; // 选项
  defaultValue?: HomeSiderSegmentType; // 默认值
  className?: string;
  indicateClass?: string;
  itemClass?: string;
  id?: string;
  value?: HomeSiderSegmentType; // 受控
};

export const HomeSiderSegmented = ({
  options,
  defaultValue,
  className,
  id,
  indicateClass,
  itemClass,
  value,
}: SegmentedProps) => {
  const [_value, setValue] = useState(() => value ?? defaultValue ?? options[0]?.value ?? '');

  const select = useCallback(
    (value: HomeSiderSegmentType) => {
      setValue(value);
      homeSiderSegmentType.set(value);
      console.log('value', { value, _value, homeSiderType: homeSiderSegmentType.get() });
    },
    [setValue],
  );
  const isSelected = useCallback((selectedValue: string | number) => _value === selectedValue, [_value]);

  useEffect(() => {
    if (value) {
      setValue(value);
      homeSiderSegmentType.set(value);
    }
  }, [value]);

  return (
    <div
      className={cn(
        'flex w-fit cursor-pointer rounded-sm bg-black/[0.08] p-1 text-xs font-semibold backdrop-blur-lg select-none',
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
HomeSiderSegmented.displayName = 'HomeSiderSegmented';
export default React.memo(HomeSiderSegmented);
