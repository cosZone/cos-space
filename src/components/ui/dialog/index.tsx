'use client';
import { cn } from '@/lib/utils';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { AnimatePresence, type MotionProps, motion } from 'motion/react';
import React, { cloneElement, useEffect, useMemo, useState } from 'react';

type DialogProps = {
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: React.JSX.Element;
  isDismiss?: boolean;
  disableAnim?: boolean;
};

function Dialog({
  className,
  overlayClassName,
  contentClassName,
  render,
  open: passedOpen = false,
  children,
  onOpenChange,
  isDismiss = false,
  disableAnim,
}: React.PropsWithChildren<DialogProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };
  const motionProps: MotionProps = useMemo(
    () =>
      disableAnim
        ? {}
        : {
            initial: { opacity: 0, scale: 0.85 },
            animate: { opacity: 1, scale: 1 },
            exit: { opacity: 0, scale: 0.85 },
            transition: { type: 'spring', damping: 20, stiffness: 300 },
          },
    [disableAnim],
  );

  const { refs, context } = useFloating({ open: isOpen, onOpenChange: onChange });
  const { setReference, setFloating } = refs;
  const dismiss = useDismiss(context, { enabled: isDismiss, outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), dismiss]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {children &&
        cloneElement(children, {
          ...getReferenceProps({ ref: setReference }),
          ...children.props,
          // Preserve original title and avoid SSR mismatch
          suppressHydrationWarning: true,
        })}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingOverlay lockScroll className="z-50" style={{ background: 'transparent' }}>
              <motion.div
                className={cn('grid h-full place-items-center md:px-4', overlayClassName)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FloatingFocusManager context={context}>
                  <motion.div
                    className={cn('bg-background max-h-[80dvh] overflow-auto shadow-md', className)}
                    {...motionProps}
                    {...getFloatingProps({ ref: setFloating })}
                  >
                    <div className={cn('relative p-5', contentClassName)}>
                      {render({
                        close: () => onChange(false),
                      })}
                    </div>
                  </motion.div>
                </FloatingFocusManager>
              </motion.div>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export default React.memo(Dialog);
