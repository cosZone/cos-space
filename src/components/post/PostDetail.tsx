import React from 'react';
import PostRightSider from './PostRightSider';
import { twMerge } from 'tailwind-merge';
import { Markdown } from '../ui/markdown/Markdown';
import EmptySvg from '../svg/EmptySvg';
type PostDetailProps = {
  className?: string;
  data?: {
    content?: string;
  };
};

export default function PostDetail({ className, data }: PostDetailProps) {
  return (
    <div className={twMerge('relative flex w-full items-start justify-center gap-4', className)}>
      <div className="overflow-auto">
        {data?.content ? <Markdown className="prose overflow-auto dark:prose-invert" value={data?.content} /> : <EmptySvg />}
      </div>
      <PostRightSider />
    </div>
  );
}
