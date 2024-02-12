'use client';

import HomeSider from '@/components/layout/homeSider/HomeSider';
import GalleryTapeList from '@/components/ui/gallery/tape/GalleryTapeList';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Gallery() {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <div className="flex w-full items-start">
      <HomeSider />
      <GalleryTapeList className="flex-grow 2xl:container" />
    </div>
  );
}
