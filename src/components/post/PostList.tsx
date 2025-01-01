import { useMemo, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import type { BlogPost } from 'types/blog';
import Divider from '@components/ui/divider';
import Loading from '@components/ui/loading';
import EmptySvg from '@components/svg/EmptySvg';
import { springScrollTo } from '@lib/scroller';
import { ErrorBoundary } from '@components/common/ErrorBoundary';
import { Button } from '@components/ui/button';
import PostItemCard from './PostItemCard';
import { AnimatePresence } from 'motion/react';

type PostListProps = {
  posts?: BlogPost[];
  isLoading?: boolean;
  className?: string;
};

const pageSize = 10;
export default function PostList({ posts, isLoading, className }: PostListProps) {
  const [page, setPage] = useState(1);
  const curList = useMemo(() => {
    if (isLoading)
      return (
        <div className="flex flex-col items-center gap-2 text-foreground/30">
          <Loading className="h-10 w-10" />
        </div>
      );
    if (!posts?.length)
      return (
        <div className="flex flex-col items-center gap-2 text-foreground/30">
          <EmptySvg className="fill-foreground/20" />
          还没有发表文章哦～
        </div>
      );
    const items = posts.slice((page - 1) * pageSize, page * pageSize);
    const last = Math.ceil(posts.length / pageSize);
    const hasMore = posts.length > page * pageSize;
    const hasPre = page !== 1;
    const goto = (page: number) => {
      if (page >= 1 && page <= last) {
        setPage(page);
        springScrollTo(0);
      }
    };
    return (
      <AnimatePresence mode="popLayout">
        <div className="flex flex-col gap-8 px-5">
          {items.map((v, i) => (
            <PostItemCard key={v.id} data={v} />
          ))}
        </div>
        <div className="flex-center gap-1 font-bold">
          <Button variant="ghost" disabled={!hasPre} onClick={() => goto(page - 1)}>
            <FaChevronLeft />
          </Button>
          {page !== 1 && page - 1 !== 1 && (
            <Button variant="ghost" onClick={() => goto(1)}>
              1
            </Button>
          )}
          {page > 2 && <span className="mx-1">...</span>}
          {hasPre && (
            <Button variant="ghost" onClick={() => goto(page - 1)}>
              {page - 1}
            </Button>
          )}
          <Button variant="ghost" disabled className="text-primary disabled:opacity-100">
            {page}
          </Button>
          {hasMore && (
            <Button variant="ghost" onClick={() => goto(page + 1)}>
              {page + 1}
            </Button>
          )}
          {page < last - 2 && <span className="mx-1">...</span>}
          {page !== last && page + 1 !== last && (
            <Button variant="ghost" onClick={() => goto(last)}>
              {last}
            </Button>
          )}
          <Button variant="ghost" disabled={!hasMore} onClick={() => goto(page + 1)}>
            <FaChevronRight />
          </Button>
        </div>
      </AnimatePresence>
    );
  }, [posts, isLoading, page]);

  return (
    <div className={twMerge('flex flex-col gap-8 pt-8', className)}>
      <Divider>文章列表</Divider>
      <ErrorBoundary>{curList}</ErrorBoundary>
    </div>
  );
}
