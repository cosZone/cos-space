import Dialog from '@/components/ui/dialog';
import { parseDate } from '@/lib/datetime';
import { galleryTapeDetailAtom, galleryTapeDetailDialogOpenAtom } from '@/store/gallery';
import { useAtom, useAtomValue } from 'jotai';
import { useMemo } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';
import { Badge } from '../../badge';
import { CardDescription } from '../../card';
import Carousel from '../../carousel';
import Tooltip from '../../tooltip';
import { useMediaQuery } from 'react-responsive';
import { MD_SCREEN_QUERY, XS_SCREEN_QUERY } from '@/constants';

type GalleryTapeDetailDialogProps = {
  className?: string;
};
export default function GalleryTapeDetailDialog({ className }: GalleryTapeDetailDialogProps) {
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
  return (
    <Dialog
      isDismiss
      open={isOpen}
      onOpenChange={setIsOpen}
      className="min-h-[50%] w-[732px] md:max-h-[80%] md:w-full md:overflow-auto"
      render={() => (
        <div className="flex w-full flex-col">
          <h2 className="text-xl font-semibold">{tapeName}</h2>
          <CardDescription className="flex gap-2 px-4 py-2 text-xs text-muted-foreground">
            <Badge>
              <Tooltip placement="bottom" title="社团">
                <div className="flex-center gap-0.5">
                  <IoHome /> {org}
                </div>
              </Tooltip>
            </Badge>
            {createAt && (
              <Tooltip placement="bottom" title="购入日期">
                <p className="flex-center gap-1">
                  <FaCalendarDays />
                  {parseDate(createAt, 'YYYY-MM-DD')}
                  {parseDate(createAt, 'HH:mm')}
                </p>
              </Tooltip>
            )}
          </CardDescription>
          <div className="flex-center w-full">
            {images?.length ? (
              <Carousel interval={3000} width={width} height={height}>
                {images.map((src) => (
                  <div key={src} className="flex-center h-full">
                    <img src={src} alt={src} className="h-full object-cover" />
                  </div>
                ))}
              </Carousel>
            ) : null}
          </div>
        </div>
      )}
    />
  );
}
