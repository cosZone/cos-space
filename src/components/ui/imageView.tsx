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
import { useEffect, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import CarouselNextArrow from './carousel/CarouselNextArrow';
import CarouselPrevArrow from './carousel/CarouselPrevArrow';

type ImageViewProps = {
  src?: string;
  className?: string;
  desc?: string;
  arrowClick?: {
    onNextClick?: () => void;
    onPrevClick?: () => void;
  };
  imageList?: string[];
};
export default function ImageView({ className, desc, src, arrowClick, imageList }: ImageViewProps) {
  const [currentURL, setCurrentURL] = useState<string>('');
  const [isArrow, setIsArrow] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { refs, context } = useFloating({ open: isOpen, onOpenChange: setIsOpen });

  const click = useClick(context);
  const role = useRole(context);
  const dismiss = useDismiss(context, { outsidePressEvent: 'mousedown' });

  useEffect(() => {
    setCurrentURL(src ?? '');
  }, [src]);

  useEffect(() => {
    if (!imageList) return;
    setIsArrow(imageList.length > 1);
  }, [imageList]);

  const onPrevClick = () => {
    if (!imageList?.length) return;
    const index = imageList.indexOf(currentURL);
    const prev = (index - 1) % imageList.length;
    setCurrentURL(imageList[prev < 0 ? imageList.length - 1 : prev]);
    arrowClick?.onPrevClick?.();
  };
  const onNextClick = () => {
    if (!imageList?.length) return;
    const index = imageList.indexOf(currentURL);
    const next = (index + 1) % imageList.length;
    setCurrentURL(imageList[next]);
    arrowClick?.onNextClick?.();
  };

  const { getReferenceProps, getFloatingProps } = useInteractions([click, role, dismiss]);

  return (
    <>
      <div className="group relative cursor-pointer">
        <img ref={refs.setReference} className={cn(className)} src={src} alt="image_view" {...getReferenceProps()} />
        {desc ? (
          <div
            className={cn(
              'invisible absolute inset-x-0 bottom-0 bg-background/50 py-1.5 text-center text-xs text-card-foreground backdrop-blur-lg group-hover:visible',
            )}
          >
            {desc}
          </div>
        ) : null}
      </div>
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay lockScroll className="z-20 grid place-items-center text-card-foreground backdrop-blur-lg">
            <FloatingFocusManager context={context}>
              <div className="flex-center relative w-full select-none" ref={refs.setFloating} {...getFloatingProps()}>
                <div className="absolute inset-x-0 top-0 flex items-center justify-center gap-4 py-4">
                  {isArrow && <CarouselPrevArrow onClick={onPrevClick} />}
                  {isArrow && <CarouselNextArrow onClick={onNextClick} />}
                </div>
                <AiFillCloseCircle
                  className="absolute right-4 top-4 h-10 w-10 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
                <img className="h-screen w-full object-contain" src={currentURL} alt="view" />
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
}
