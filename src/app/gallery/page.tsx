'use client';

import GalleryItem from '@/components/ui/gallery/GalleryItem';
import { tempPetTapeName } from '@/constants/temp';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Masonry } from 'masonic';
import { FcLike } from 'react-icons/fc';

export default function Gallery() {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <div className="flex flex-col gap-2">
      <h1 className="flex items-center gap-2 text-2xl font-semibold">
        <FcLike />
        PET 胶带
      </h1>
      <Masonry
        items={tempPetTapeName}
        render={GalleryItem} // Adds 8px of space between the grid cells
        columnGutter={8}
        // Sets the minimum column width to 172px
        columnWidth={256}
        // Pre-renders 5 windows worth of content
        overscanBy={5}
        // This is the grid item component
      />

      {/* <div className="masonry">
        {tempPetTapeName.map(({ tapeName, cover, org, createAt }) => (
          <Card className="flex flex-col gap-2 p-4" key={tapeName}>
            <CardHeader className="p-0">{tapeName}</CardHeader>
            <CardDescription className="flex gap-2 text-xs text-muted-foreground">
              <Badge>
                <Tooltip title="社团">
                  <div className="flex gap-0.5">
                    <IoHome /> {org}
                  </div>
                </Tooltip>
              </Badge>
              {createAt && (
                <Tooltip title="购入日期">
                  <p className="flex-center gap-1">
                    <FaCalendarDays />
                    {parseDate(createAt, 'YYYY-MM-DD')}
                  </p>
                </Tooltip>
              )}
            </CardDescription>
            <CardContent className="mt-2 p-0">
              <Card3d scaleNum={1.1} className="h-[15rem] w-[256px] xs:w-full">
                <img
                  src={cover}
                  draggable={false}
                  alt="PrizePool.webp"
                  className={cn('h-auto w-full rounded-lg object-cover', { invisible: status !== ImageStatus.Loaded })}
                  onLoad={onImageLoaded} // 当图像加载时更新状态
                />
                {status !== ImageStatus.Loaded && (
                  <div
                    className={cn('absolute left-0 top-0 h-full w-full animate-pulse rounded-lg bg-background/80 md:w-full')}
                  />
                )}
              </Card3d>
            </CardContent>
            <CardFooter className="p-0"></CardFooter>
          </Card>
        ))}
      </div> */}
    </div>
  );
}
