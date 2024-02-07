'use client';

import HomeSider from '@/components/layout/HomeSider';
import GalleryTapeList from '@/components/ui/gallery/tape/GalleryTapeList';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Gallery() {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return (
    <div className="flex items-start">
      <GalleryTapeList className="flex-grow" />
      <HomeSider />
    </div>
  );
}
