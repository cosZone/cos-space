import { ClientOnly } from '@/components/common/ClientOnly';
import HomeSider from '@/components/layout/HomeSider';
import EmptySvg from '@/components/svg/EmptySvg';
import PostDetail from '@/components/ui/post/PostDetail';
import { fetchPublicPost } from '@/lib/api';

async function getPost(params: { id: string }) {
  const res = await fetchPublicPost({ id: params.id });
  const { data } = res;
  return data;
}
export default async function About() {
  const data = await getPost({ id: '14' });
  return data ? (
    <ClientOnly>
      <PostDetail data={data} />
    </ClientOnly>
  ) : (
    <EmptySvg />
  );
}
