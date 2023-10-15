import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import Card3d from '@/components/ui/card3d';
import Tooltip from '@/components/ui/tooltip';
import { Tape } from '@/constants/temp';
import useImageLoadState, { ImageStatus } from '@/hooks/util';
import { parseDate } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import { galleryTapeDetailAtom, galleryTapeDetailDialogOpenAtom } from '@/store/gallery';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { FaCalendarDays } from 'react-icons/fa6';
import { IoHome } from 'react-icons/io5';

type GalleryItemProps = {
  className?: string;
  index: number;
  data: Tape;
  width: number;
};
export default function GalleryTapeItem({ className, index, data, width }: GalleryItemProps) {
  const { status, onImageLoaded } = useImageLoadState();
  const { tapeName, cover, org, createAt } = data;
  const setOpen = useSetAtom(galleryTapeDetailDialogOpenAtom);
  const setData = useSetAtom(galleryTapeDetailAtom);
  const onClick = useCallback(() => {
    setOpen(true);
    setData(data);
  }, [data, setData, setOpen]);
  return (
    <Card onClick={onClick} className={cn('flex cursor-pointer flex-col gap-2', className)} style={{ width }} key={tapeName}>
      <CardHeader className="p-4 pb-0">{tapeName}</CardHeader>
      <CardDescription className="flex gap-2 px-4 text-xs text-muted-foreground">
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
            </p>
          </Tooltip>
        )}
      </CardDescription>
      <CardContent className="mt-2 overflow-hidden rounded-lg p-0">
        <Card3d scaleNum={1.1}>
          <img
            src={cover}
            draggable={false}
            alt="PrizePool.webp"
            className={cn('h-auto w-full rounded-lg object-cover', { invisible: status !== ImageStatus.Loaded })}
            onLoad={onImageLoaded} // 当图像加载时更新状态
          />
          {status !== ImageStatus.Loaded && (
            <div className={cn('absolute left-0 top-0 h-full w-full animate-pulse rounded-lg bg-background/80 md:w-full')} />
          )}
        </Card3d>
      </CardContent>
    </Card>
  );
}
