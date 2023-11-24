import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { useFetchPublicPostList } from '@/hooks/post';
import { twMerge } from 'tailwind-merge';
import PostItemCard from './PostItemCard';
import EmptySvg from '@/components/svg/EmptySvg';
import Loading from '../loading';
type PostListProps = {
  className?: string;
};

export default function PostList({ className }: PostListProps) {
  const { data, isLoading } = useFetchPublicPostList(); // TODO: Static Posts
  return (
    <div className={twMerge('flex flex-col gap-8 pt-8', className)}>
      <ErrorBoundary>
        {isLoading ? (
          <div className="flex flex-col items-center gap-2 text-foreground/30">
            <Loading className="h-10 w-10" />
          </div>
        ) : data?.length ? (
          data.map((v, i) => <PostItemCard key={i} data={v} />)
        ) : (
          <div className="flex flex-col items-center gap-2 text-foreground/30">
            <EmptySvg className="fill-foreground/20" />
            还没有发表文章哦～
          </div>
        )}
      </ErrorBoundary>
    </div>
  );
}
