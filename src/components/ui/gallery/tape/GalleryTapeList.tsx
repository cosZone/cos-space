import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import EmptySvg from '@/components/svg/EmptySvg';
import { useFetchPublicAllGalleryItem } from '@/hooks/gallery';
import { galleryTapeAddDialogOpenAtom } from '@/store/gallery';
import { useSetAtom } from 'jotai';
import { Masonry } from 'masonic';
import { FcLike } from 'react-icons/fc';
import { IoAdd } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import { Button } from '../../button';
import GalleryTapeAddDialog from './GalleryTapeAddDialog';
import GalleryTapeDetailDialog from './GalleryTapeDetailDialog';
import GalleryTapeItem from './GalleryTapeItem';

type GalleryTapeListProps = {
  className?: string;
};
export default function GalleryTapeList({ className }: GalleryTapeListProps) {
  const { data, isLoading } = useFetchPublicAllGalleryItem();
  const setGalleryAddDialogOpen = useSetAtom(galleryTapeAddDialogOpenAtom);
  return (
    <div className={twMerge('flex flex-col gap-2', className)}>
      <div className="flex items-center justify-between gap-4">
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          <FcLike /> PET 胶带
        </h1>
        <Button className="flex-center gap-0.5" onClick={() => setGalleryAddDialogOpen(true)}>
          <IoAdd className="text-xl" /> 添加胶带
        </Button>
      </div>
      <ErrorBoundary>
        {!isLoading && data?.length ? (
          <Masonry
            items={data}
            render={GalleryTapeItem}
            // Adds 8px of space between the grid cells
            columnGutter={8}
            // Sets the minimum column width to 172px
            columnWidth={256}
            // Pre-renders 5 windows worth of content
            overscanBy={5}
            // This is the grid item component
          />
        ) : (
          <div className="flex w-full flex-col items-center gap-2 text-foreground/30">
            <EmptySvg className="fill-foreground/20" />
            还没有任何胶带哦～
          </div>
        )}
      </ErrorBoundary>
      <GalleryTapeDetailDialog />
      <GalleryTapeAddDialog />
    </div>
  );
}
