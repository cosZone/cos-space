'use client';

import { PostData, PostMetaData } from '@/lib/api/type';
import { postIsEditAtom } from '@/store/post';
import matter from 'gray-matter';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ErrorBoundary } from '../../common/ErrorBoundary';
import EmptySvg from '../../svg/EmptySvg';
import { MainMarkdown } from '../markdown/Markdown';
import { Editor } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '../button';
import { BsArrowsFullscreen } from 'react-icons/bs';
import { VscOpenPreview } from 'react-icons/vsc';
import { useIsOwner } from '@/hooks/user';

type PostEditViewProps = {
  className?: string;
  data?: PostData;
};

export default function PostEditView({ className, data }: PostEditViewProps) {
  const [text, setText] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [metaData, setMetaData] = useState<PostMetaData | undefined>(undefined);
  const { theme } = useTheme();

  useEffect(() => {
    if (!data?.content) return;
    const parsedData = matter(data?.content);
    const metaData = parsedData.data as PostMetaData;
    const content = parsedData.content;
    setText(content);
    setMetaData(metaData);
  }, [data]);

  return (
    <div className={cn('relative grid grid-cols-2 gap-4', { 'grid-cols-1': !showPreview }, className)}>
      <div className="relative">
        <Editor
          defaultLanguage="markdown"
          className={cn('h-[90vh]', { 'fixed inset-0 z-20 h-full': isFullScreen })}
          theme={theme === 'light' ? 'light' : 'vs-dark'}
          value={text}
          options={{}}
          onChange={(value) => setText(value ?? '')}
        />
        <div
          className={cn('absolute -top-10 right-0 flex items-center justify-end rounded-md bg-background/50 backdrop-blur-lg', {
            'fixed right-28 top-0 z-30': isFullScreen,
          })}
        >
          <Button variant="ghost" onClick={() => setShowPreview((pre) => !pre)} className={cn('p-1.5')}>
            <VscOpenPreview className="h-5 w-5" />
          </Button>
          <Button variant="ghost" onClick={() => setIsFullScreen((pre) => !pre)} className={cn('p-2')}>
            <BsArrowsFullscreen className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <ErrorBoundary>
        {text ? (
          <MainMarkdown className="prose h-[90vh] flex-grow overflow-auto dark:prose-invert" value={text} />
        ) : (
          <EmptySvg />
        )}
      </ErrorBoundary>
    </div>
  );
}
