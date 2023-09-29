'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import matter from 'gray-matter';

// @ts-expect-error
import aboutMdRaw from '@/lib/source/about/index.md?raw';
import { Markdown } from '@/components/ui/markdown/Markdown';
import PostRightSider from '@/components/post/PostRightSider';

export default function About() {
  const parsedData = matter(aboutMdRaw);
  const metaData = parsedData.data;
  console.log({ metaData });
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
      <div className="relative flex items-start gap-4">
        <Markdown className="prose" value={parsedData.content} />
        <PostRightSider />
      </div>
    </>
  );
}
