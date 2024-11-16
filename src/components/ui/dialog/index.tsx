import { fontVariants } from '@/constants/font';
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
import { AnimatePresence, motion } from 'motion/react';
import { ReactNode, cloneElement, memo, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

type DialogProps = {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  render: (props: { close: () => void }) => ReactNode;
  children?: JSX.Element;
  isDismiss?: boolean;
};

function Dialog({
  className,
  render,
  open: passedOpen = false,
  children,
  showCloseButton = true,
  onOpenChange,
  isDismiss = false,
}: React.PropsWithChildren<DialogProps>) {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

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
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingPortal>
        <AnimatePresence>
          {isOpen && (
            <FloatingOverlay lockScroll className="z-10 grid place-items-center backdrop-blur-lg">
              <FloatingFocusManager context={context}>
                <motion.div
                  className={cn('rounded-2xl border bg-card text-card-foreground', ...fontVariants, className)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: setFloating })}
                >
                  <div className="relative p-6">
                    {showCloseButton && (
                      <div className="flex-center absolute right-7 top-7 h-4 w-4 cursor-pointer">
                        <AiOutlineClose onClick={() => onChange(false)} />
                      </div>
                    )}
                    {render({
                      close: () => onChange(false),
                    })}
                  </div>
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export default memo(Dialog);
