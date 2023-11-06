'use client';

import GalleryTapeList from '@/components/ui/gallery/tape/GalleryTapeList';
import { useMutationCreateManyGalleryItem } from '@/hooks/gallery';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Gallery() {
  const isMounted = useIsMounted();
  const { mutate } = useMutationCreateManyGalleryItem();
  if (!isMounted) return null;
  return (
    <div className="flex flex-col gap-2">
      <GalleryTapeList />
    </div>
  );
}
