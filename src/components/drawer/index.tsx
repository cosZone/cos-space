import React, { PropsWithChildren, cloneElement, useEffect, useState } from 'react';
import {
  useClick,
  useFloating,
  useInteractions,
  useRole,
  FloatingPortal,
  FloatingOverlay,
  FloatingFocusManager,
  FloatingNode,
  useFloatingNodeId,
  useDismiss,
} from '@floating-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { fontVariants } from '@/constants/font';

export type Position = 'top' | 'bottom' | 'left' | 'right';
type DrawerProps = {
  open?: boolean;
  title?: React.ReactNode;
  zIndex?: 0 | 20 | 30 | 40 | 50;
  onClose?: () => void;
  onOpenChange?: (open: boolean) => void;
  onExitComplete?: () => void;
  render: (props: { close: () => void }) => React.ReactNode;
  children?: JSX.Element;
  className?: string;
  scroll?: boolean;
  renderHeader?: () => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  position?: Position;
};
const posClass: { [key in Position]: string } = {
  top: '',
  bottom: '',
  left: 'inset-y-0 left-0 rounded-tr-xl rounded-br-xl',
  right: '',
};
function Drawer({
  render,
  open: passedOpen = false,
  title,
  children,
  onOpenChange,
  onExitComplete,
  onClose: prevOnClose,
  className,
  renderHeader,
  renderFooter,
  zIndex = 20,
  scroll = true,
  position = 'left',
}: PropsWithChildren<DrawerProps>) {
  const [open, setOpen] = useState(false);

  const nodeId = useFloatingNodeId();

  const onClose = (value: boolean) => {
    setOpen(value);
    prevOnClose?.();
    onOpenChange?.(value);
  };

  const {
    refs: { setFloating, setReference },
    context,
  } = useFloating({
    open,
    nodeId,
    onOpenChange: onClose,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), useDismiss(context)]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setOpen(passedOpen);
  }, [passedOpen]);

  return (
    <FloatingNode id={nodeId}>
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingPortal>
        <AnimatePresence onExitComplete={onExitComplete}>
          {open && (
            <FloatingOverlay lockScroll className={clsx('relative bg-black/30 backdrop-blur-sm')} style={{ zIndex }}>
              <FloatingFocusManager context={context}>
                <motion.div
                  className={twMerge(
                    clsx(
                      `bg-header text-text-100 absolute flex min-w-[10rem] flex-col p-0 md:min-w-[5rem]`,
                      posClass[position || 'left'],
                      fontVariants,
                    ),
                    className,
                  )}
                  initial={{ opacity: 0, translateX: -10 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: -10 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: setFloating })}
                >
                  {title || renderHeader ? (
                    <header className="px-6 pt-6">
                      {!title && (
                        <div className="relative h-auto px-6 text-center text-xl font-medium leading-[22px]">{title}</div>
                      )}
                      {renderHeader?.()}
                    </header>
                  ) : null}
                  <main
                    className={clsx('h-full', {
                      'overflow-auto': scroll,
                    })}
                  >
                    {render({ close: () => onClose(false) })}
                  </main>
                  {renderFooter && (
                    <footer className="absolute bottom-0 left-0 right-0 rounded-b-[10px] px-6 py-6 backdrop-blur-xl">
                      {renderFooter?.()}
                    </footer>
                  )}
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </FloatingNode>
  );
}

export default React.memo(Drawer);
