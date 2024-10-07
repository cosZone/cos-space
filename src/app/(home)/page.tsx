import { ClientOnly } from '@/components/common/ClientOnly';
import EmptySvg from '@/components/svg/EmptySvg';
import PostList from '@/components/ui/post/PostList';
import { fetchPublicAllPost } from '@/lib/api';
import HomeSider from '../../components/layout/homeSider/HomeSider';

async function getAllPost() {
  const res = await fetchPublicAllPost();
  const { data } = res;
  return data;
}

export default async function Home() {
  const data = await getAllPost();
  return data ? (
    <ClientOnly>
      <div className="mx-auto flex items-start justify-center pr-11 md:w-full md:pr-0">
        <HomeSider />
        <PostList className="shadow-box w-full bg-gradient-start p-4 2xl:container md:px-1 md:py-2" data={data} />
      </div>
    </ClientOnly>
  ) : (
    <EmptySvg className="fill-foreground" />
  );
}
