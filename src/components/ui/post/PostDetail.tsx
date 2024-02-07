'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import { PostData, PostMetaData } from '@/lib/api/type';
import matter from 'gray-matter';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorBoundary } from '../../common/ErrorBoundary';
import EmptySvg from '../../svg/EmptySvg';
import { MainMarkdown } from '../markdown/Markdown';
import PostRightSider from './PostRightSider';

type PostDetailProps = {
  className?: string;
  data?: PostData;
};

export default function PostDetail({ className, data }: PostDetailProps) {
  const { content } = useMemo(() => {
    if (!data?.content) return {};
    const parsedData = matter(data?.content);
    return {
      metaData: parsedData.data as PostMetaData,
      content: parsedData.content,
    };
  }, [data]);
  return (
    <>
      <div className={twMerge('relative flex w-full items-start justify-center gap-4', className)}>
        <ErrorBoundary>
          {content ? (
            <MainMarkdown className="prose flex-grow overflow-auto dark:prose-invert" value={content} />
          ) : (
            <EmptySvg />
          )}
        </ErrorBoundary>
        <ClientOnly>
          <PostRightSider />
        </ClientOnly>
      </div>
    </>
  );
}
