import { ClientOnly } from '@/components/common/ClientOnly';
import EmptySvg from '@/components/svg/EmptySvg';
import PostDetail from '@/components/ui/post/PostDetail';
import { fetchPublicAllPost, fetchPublicPost } from '@/lib/api';

export async function generateStaticParams() {
  const res = await fetchPublicAllPost();
  const { data } = res;
  return data.map((post) => ({
    id: `${post.id}`,
  }));
}

export async function getPost(params: { id: string }) {
  const res = await fetchPublicPost({ id: params.id });
  const { data } = res;
  return data;
}

export default async function Post({ params }: { params: { id: string } }) {
  const data = await getPost(params);

  return data ? (
    <ClientOnly>
      <PostDetail data={data} />
    </ClientOnly>
  ) : (
    <EmptySvg />
  );
}
