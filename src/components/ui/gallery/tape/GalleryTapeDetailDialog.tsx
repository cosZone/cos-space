import Dialog from '@/components/ui/dialog';
import { parseDate } from '@/lib/datetime';
import { galleryTapeDetailAtom, galleryTapeDetailDialogOpenAtom } from '@/store/gallery';
import { useAtom, useAtomValue } from 'jotai';
import { useMemo, useRef, useState } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';
import { Badge } from '../../badge';
import { CardDescription } from '../../card';
import Carousel from '../../carousel';
import Tooltip from '../../tooltip';
import { useMediaQuery } from 'react-responsive';
import { MD_SCREEN_QUERY, XS_SCREEN_QUERY } from '@/constants';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import CarouselNextArrow from '../../carousel/CarouselNextArrow';
import CarouselPrevArrow from '../../carousel/CarouselPrevArrow';
import ImageView from '../../imageView';
import { useIsMounted } from '@/hooks/useIsMounted';

type GalleryTapeDetailDialogProps = {
  className?: string;
};
export default function GalleryTapeDetailDialog({ className }: GalleryTapeDetailDialogProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const [isOpen, setIsOpen] = useAtom(galleryTapeDetailDialogOpenAtom);
  const data = useAtomValue(galleryTapeDetailAtom);
  const isXsScreen = useMediaQuery({ query: XS_SCREEN_QUERY });
  const isMdScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const { width, height } = useMemo(() => {
    if (isXsScreen) return { width: 280, height: 500 };
    if (isMdScreen) return { width: 460, height: 600 };
    return { width: 700, height: 650 };
  }, [isMdScreen, isXsScreen]);
  const { tapeName, org, images, createAt } = data ?? {};
  const slideRef = useRef(null);

  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <Dialog
      isDismiss
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[50%] w-[732px] md:max-h-[80%] md:w-full md:overflow-auto"
      render={() => (
        <div className="flex w-full flex-col">
          <h2 className="text-xl font-semibold">{tapeName}</h2>
          <div className="flex gap-2 px-4 py-2 text-xs text-muted-foreground">
            <Badge>
              <Tooltip placement="bottom" title="社团">
                <div className="flex-center gap-0.5">
                  <IoHome /> {org}
                </div>
              </Tooltip>
            </Badge>
            {createAt && (
              <Tooltip placement="bottom" title="购入日期">
                <div className="flex-center gap-1">
                  <FaCalendarDays />
                  {parseDate(createAt, 'YYYY-MM-DD')} {parseDate(createAt, 'HH:mm')}
                </div>
              </Tooltip>
            )}
          </div>
          <div className="flex-center h-[70vh] w-full overflow-auto">
            {images?.length ? (
              <Swiper
                className="h-[70vh] w-full overflow-auto"
                onSwiper={setSwiper}
                spaceBetween={30}
                centeredSlides={true}
                initialSlide={0}
                slidesPerView={1}
                loop
              >
                {images.map((src) => (
                  <SwiperSlide key={src} className="flex-center-y h-full w-full cursor-grab overflow-auto">
                    <ImageView
                      arrowClick={{
                        onNextClick: () => swiper?.slideNext(),
                        onPrevClick: () => swiper?.slidePrev(),
                      }}
                      src={src}
                      imageList={images}
                      className="w-full object-contain"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
            <CarouselPrevArrow
              className="absolute left-0.5 top-1/2 z-10 -translate-y-1/2"
              onClick={() => swiper?.slidePrev()}
            />
            <CarouselNextArrow
              className="absolute right-0.5 top-1/2 z-10 -translate-y-1/2"
              onClick={() => swiper?.slideNext()}
            />
          </div>
        </div>
      )}
    />
  );
}
