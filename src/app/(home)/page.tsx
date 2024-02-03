'use client';
import PostList from '@/components/ui/post/PostList';
import { fetchPublicAllPost } from '@/lib/api';

async function getAllPost() {
  const res = await fetchPublicAllPost();
  const { data } = res;
  return data;
}

export default async function Home() {
  const data = await getAllPost();
  return (
    <>
      <PostList data={data} />
    </>
  );
}
