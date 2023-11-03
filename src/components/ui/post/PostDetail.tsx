'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import { twMerge } from 'tailwind-merge';
import { ErrorBoundary } from '../../common/ErrorBoundary';
import EmptySvg from '../../svg/EmptySvg';
import { MainMarkdown } from '../markdown/Markdown';
import PostRightSider from './PostRightSider';

type PostDetailProps = {
  className?: string;
  data?: {
    content?: string;
  };
};

export default function PostDetail({ className, data }: PostDetailProps) {
  return (
    <div className={twMerge('relative flex w-full items-start justify-center gap-4', className)}>
      <ErrorBoundary>
        {data?.content ? (
          <MainMarkdown className="prose overflow-auto dark:prose-invert" value={data?.content} />
        ) : (
          <EmptySvg />
        )}
      </ErrorBoundary>
      <ClientOnly>
        <PostRightSider />
      </ClientOnly>
    </div>
  );
}
