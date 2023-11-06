import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useFetchPublicPostList } from '@/hooks/post';
import { twMerge } from 'tailwind-merge';
import PostItemCard from './PostItemCard';
import EmptySvg from '@/components/svg/EmptySvg';
type PostListProps = {
  className?: string;
};

export default function PostList({ className }: PostListProps) {
  const { data, isLoading } = useFetchPublicPostList();
  return (
    <div className={twMerge('flex flex-col gap-12', className)}>
      <ErrorBoundary>
        {!isLoading && data?.length ? (
          data.map((v, i) => <PostItemCard key={i} data={v} />)
        ) : (
          <div className="flex w-full flex-col items-center gap-2 text-foreground/30">
            <EmptySvg className="fill-foreground/20" />
            还没有发表文章哦～
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
