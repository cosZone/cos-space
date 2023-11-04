'use client';

import { Button } from '@/components/ui/button';
import GalleryTapeList from '@/components/ui/gallery/tape/GalleryTapeList';
import { tempPetTapeName } from '@/constants/temp';
import { useMutationCreateManyGalleryItem } from '@/hooks/gallery';
import { useIsMounted } from '@/hooks/useIsMounted';

export default function Gallery() {
  const isMounted = useIsMounted();
  const { mutate } = useMutationCreateManyGalleryItem();
  if (!isMounted) return null;
  return (
    <div className="flex flex-col gap-2">
      <Button className="mb-12" onClick={() => mutate(tempPetTapeName)}>
        Create Many Tape
      </Button>
      <GalleryTapeList />
    </div>
  );
}
