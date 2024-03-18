import { ClientOnly } from '@/components/common/ClientOnly';
import HomeSider from '@/components/layout/homeSider/HomeSider';
import EmptySvg from '@/components/svg/EmptySvg';
import Cover from '@/components/ui/cover';
import PostDetail from '@/components/ui/post/PostDetail';
import { HomeSiderType } from '@/constants/enum';
import { fetchPublicAllPost, fetchPublicPost } from '@/lib/api';

export async function generateStaticParams() {
  const res = await fetchPublicAllPost();
  const { data } = res;
  return data.map((post) => ({
    id: `${post.id}`,
  }));
}

async function getPost(params: { id: string }) {
  const res = await fetchPublicPost({ id: params.id });
  const { data } = res;
  return data;
}

export default async function Post({ params }: { params: { id: string } }) {
  const data = await getPost(params);
  return data ? (
    <ClientOnly>
      <Cover postData={data} />
      <div className="mx-auto flex items-start justify-center md:w-full">
        <HomeSider type={HomeSiderType.POST} />
        <PostDetail data={data} className="p-4 2xl:container" />
      </div>
    </ClientOnly>
  ) : (
    <EmptySvg />
  );
}
