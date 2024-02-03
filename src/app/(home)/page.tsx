import { ClientOnly } from '@/components/common/ClientOnly';
import EmptySvg from '@/components/svg/EmptySvg';
import Cover from '@/components/ui/cover';
import PostList from '@/components/ui/post/PostList';
import { fetchPublicAllPost } from '@/lib/api';

async function getAllPost() {
  const res = await fetchPublicAllPost();
  const { data } = res;
  return data;
}

export default async function Home() {
  const data = await getAllPost();
  return data ? (
    <ClientOnly>
      <Cover />
      <PostList data={data} />
    </ClientOnly>
  ) : (
    <EmptySvg />
  );
}
