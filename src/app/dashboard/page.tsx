'use client';
import HomeSider from '@/components/layout/homeSider/HomeSider';
import UploadPost from './_components/UploadPost';
import { fetchPublicAllPost } from '@/lib/api';
import PostList from '@/components/ui/post/PostList';
import { ClientOnly } from '@/components/common/ClientOnly';

async function getAllPost() {
  const res = await fetchPublicAllPost();
  const { data } = res;
  return data;
}
export default async function Dashboard() {
  const data = await getAllPost();

  return (
    <div className="mx-auto flex items-start justify-center">
      <HomeSider />
      <div className="shadow-box flex flex-col gap-8 p-4 2xl:container">
        <UploadPost />
        {data ? (
          <ClientOnly>
            <PostList data={data} />
          </ClientOnly>
        ) : null}
      </div>
    </div>
  );
}
