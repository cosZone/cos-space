import { ClientOnly } from '@/components/common/ClientOnly';
import HomeSider from '@/components/layout/homeSider/HomeSider';
import EmptySvg from '@/components/svg/EmptySvg';
import PostDetail from '@/components/ui/post/PostDetail';
import { HomeSiderType } from '@/constants/enum';
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
      <div className="mx-auto flex items-start justify-center md:w-full">
        <HomeSider type={HomeSiderType.POST} />
        <PostDetail data={data} className="2xl:container" />
      </div>
    </ClientOnly>
  ) : (
    <EmptySvg />
  );
}
