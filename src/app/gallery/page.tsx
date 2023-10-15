'use client';

import GalleryTapeDetailDialog from '@/components/ui/gallery/tape/GalleryTapeDetailDialog';
import GalleryTapeItem from '@/components/ui/gallery/tape/GalleryTapeItem';
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
        render={GalleryTapeItem}
        // Adds 8px of space between the grid cells
        columnGutter={8}
        // Sets the minimum column width to 172px
        columnWidth={256}
        // Pre-renders 5 windows worth of content
        overscanBy={5}
        // This is the grid item component
      />
      <GalleryTapeDetailDialog />
    </div>
  );
}
