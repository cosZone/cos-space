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
      <div className="shadow-box flex flex-col gap-8 p-4">
        <UploadPost />
        {data ? (
          <ClientOnly>
            <PostList className="2xl:container" data={data} />
          </ClientOnly>
        ) : null}
      </div>
    </div>
  );
}
