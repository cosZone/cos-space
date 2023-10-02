import React from 'react';
import PostRightSider from './PostRightSider';
import { twMerge } from 'tailwind-merge';
import { Markdown } from '../ui/markdown/Markdown';
import EmptySvg from '../svg/EmptySvg';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ErrorBoundary } from '../common/ErrorBoundary';
type PostDetailProps = {
  className?: string;
  data?: {
    content?: string;
  };
};

export default function PostDetail({ className, data }: PostDetailProps) {
  const isMounted = useIsMounted();
  return (
    <div className={twMerge('relative flex w-full items-start justify-center gap-4', className)}>
      <ErrorBoundary>
        {data?.content ? <Markdown className="prose overflow-auto dark:prose-invert" value={data?.content} /> : <EmptySvg />}
      </ErrorBoundary>
      {isMounted && <PostRightSider />}
    </div>
  );
}
