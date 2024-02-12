'use client';

import { cn } from '@/lib/utils';
import type { FC, MouseEvent } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: cn(
    'leading-normal mb-[1.5px] text-card-foreground inline-block relative max-w-full min-w-0',
    'truncate text-left opacity-50 transition-all tabular-nums hover:opacity-80 duration-500',
  ),
  variants: {
    status: {
      active: 'opacity-100 text-primary',
    },
  },
});
export interface ITocItem {
  depth: number;
  title: string;
  anchorId: string;
  index: number;

  $heading: HTMLHeadingElement;
}

export const TocItem: FC<{
  heading: ITocItem;

  active: boolean;
  rootDepth: number;
  onClick?: (i: number, $el: HTMLElement | null, anchorId: string) => void;
}> = memo((props) => {
  const { active, rootDepth, onClick, heading } = props;
  const { $heading, anchorId, depth, index, title } = heading;

  const $ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (active) {
      $ref.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [active]);

  const renderDepth = useMemo(() => {
    const result = depth - rootDepth;

    return result;
  }, [depth, rootDepth]);

  const indentStyle = useMemo(
    () => ({
      paddingLeft: depth >= rootDepth ? `${renderDepth * 0.6 + 0.5}rem` : '0.5rem',
    }),
    [depth, renderDepth, rootDepth],
  );
  const _onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();

      onClick?.(index, $heading, anchorId);
    },
    [onClick, index, $heading, anchorId],
  );

  return (
    <a
      ref={$ref}
      data-index={index}
      href={`#${anchorId}`}
      className={cn(
        styles({
          status: active ? 'active' : undefined,
        }),
      )}
      style={indentStyle}
      data-depth={depth}
      onClick={_onClick}
      title={title}
    >
      <span className="cursor-pointer">{title}</span>
    </a>
  );
});

TocItem.displayName = 'TocItem';
