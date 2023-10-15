import React, { cloneElement, useRef, useState } from 'react';
import {
  arrow,
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  Placement,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { fontVariants } from '@/constants/font';
import { cn } from '@/lib/utils';

type TooltipProps = {
  offsetX?: number;
  title: React.ReactNode;
  placement?: Placement;
  children: JSX.Element;
};

export default function Tooltip({ children, title, placement = 'top', offsetX }: TooltipProps) {
  const arrowRef = useRef<HTMLImageElement>(null);
  const [open, setOpen] = useState(false);
  const { x, y, refs, strategy, context, middlewareData } = useFloating({
    open,
    placement,
    onOpenChange: setOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(offsetX ?? 5), shift(), arrow({ element: arrowRef }), flip({ fallbackAxisSideDirection: 'start' })],
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { move: false }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: 'tooltip' }),
  ]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs.setReference, ...children.props }))}
      <FloatingPortal id="floating-tooltip">
        {open && (
          <div
            className={cn(
              'text-xs/3.5 z-10 rounded-lg border bg-background/50 px-3 py-1 text-card-foreground backdrop-blur-lg',
              ...fontVariants,
            )}
            ref={refs.setFloating}
            style={{
              position: strategy,
              zIndex: 100,
              top: y ?? 0,
              left: x ?? 0,
            }}
            {...getFloatingProps()}
          >
            {title}
          </div>
        )}
      </FloatingPortal>
    </>
  );
}
