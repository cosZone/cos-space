import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import matter from 'gray-matter';
import PostDetail from '@/components/ui/post/PostDetail';
import { useMemo } from 'react';

// @ts-expect-error
import aboutMdRaw from '@/lib/source/about/index.md?raw';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ClientOnly } from '@/components/common/ClientOnly';

export default function About() {
  const parsedData = matter(aboutMdRaw);
  const metaData = parsedData.data;
  const postData = useMemo(
    () => ({
      content: parsedData?.content,
      metaData,
    }),
    [metaData, parsedData],
  );
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
      <PostDetail data={postData} />
    </>
  );
}
