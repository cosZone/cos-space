import {
  FloatingFocusManager,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useHover,
  useInteractions,
  useRole,
  type Placement,
} from '@floating-ui/react';
import { cn } from '@lib/utils';
import { AnimatePresence, motion, type MotionProps } from 'motion/react';
import React, { cloneElement, useEffect, useState } from 'react';

type PopoverProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  render: (data: { close: () => void }) => React.ReactNode;
  placement?: Placement;
  children: React.JSX.Element;
  className?: string;
  offset?: number;
  motionProps?: MotionProps;
  trigger?: 'click' | 'hover';
};

function Popover({
  children,
  render,
  open: passedOpen,
  placement,
  onOpenChange,
  className,
  offset: offsetNum,
  motionProps,
  trigger = 'click',
}: React.PropsWithChildren<PopoverProps>) {
  const [isOpen, setIsOpen] = useState(passedOpen);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    transform: false,
    onOpenChange: onChange,
    placement,
    middleware: [offset(offsetNum ?? 10), flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, {
    enabled: trigger === 'hover',
    delay: { open: 0, close: 150 },
  });
  const click = useClick(context, {
    enabled: trigger === 'click',
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover, click, useDismiss(context), useRole(context)]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: refs.setReference, ...children.props }))}
      <AnimatePresence>
        {isOpen && (
          <FloatingFocusManager context={context} modal={false}>
            <motion.div
              className={cn('z-10 rounded-ss-2xl rounded-ee-2xl bg-black/30 backdrop-blur-sm', className)}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1, originY: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              style={{ ...floatingStyles }}
              {...motionProps}
              {...getFloatingProps({ ref: refs.setFloating })}
            >
              {render({ close: () => onChange(false) })}
            </motion.div>
          </FloatingFocusManager>
        )}
      </AnimatePresence>
    </>
  );
}

export default React.memo(Popover);
