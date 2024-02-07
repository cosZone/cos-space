import { ClientOnly } from '@/components/common/ClientOnly';
import EmptySvg from '@/components/svg/EmptySvg';
import Cover from '@/components/ui/cover';
import PostList from '@/components/ui/post/PostList';
import { fetchPublicAllPost } from '@/lib/api';
import HomeSider from '../../components/layout/HomeSider';

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
      <div className="flex items-start 2xl:container">
        <PostList className="shadow-box flex-grow p-4" data={data} />
        <HomeSider />
      </div>
    </ClientOnly>
  ) : (
    <EmptySvg />
  );
}
