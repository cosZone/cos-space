'use client';

import { ClientOnly } from '@/components/common/ClientOnly';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MainMarkdown } from '@/components/ui/markdown/Markdown';
import PostSider from '@/components/ui/post/PostSider';
import { PostMetaData } from '@/lib/api/type';
import matter from 'gray-matter';
import { useMemo } from 'react';

// @ts-expect-error
import testMD from './test.md?raw';

export default function TestPage() {
  const { metaData, content } = useMemo(() => {
    if (!testMD) return {};
    const parsedData = matter(testMD);
    return {
      metaData: parsedData.data as PostMetaData,
      content: parsedData.content,
    };
  }, []);
  // console.log(`( metaData )===============>`, metaData);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{metaData?.['title']}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{metaData?.['description']}</CardDescription>
        </CardContent>
      </Card>
      <div className={'relative flex w-full items-start justify-center gap-4'}>
        <ErrorBoundary>
          <MainMarkdown className="prose overflow-auto dark:prose-invert" value={content} />
        </ErrorBoundary>
        <ClientOnly>
          <PostSider />
        </ClientOnly>
      </div>
    </>
  );
}
