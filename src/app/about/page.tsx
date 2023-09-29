'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Markdown from 'markdown-to-jsx';
import matter from 'gray-matter';

// @ts-expect-error
import aboutMdRaw from '@/lib/source/about/index.md?raw';

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
      <Markdown>{parsedData.content}</Markdown>
    </>
  );
}
