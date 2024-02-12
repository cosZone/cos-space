'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import NavItem from '@/components/ui/navigator/NavItem';
import PostRightSider from '@/components/ui/post/PostRightSider';
import Segmented from '@/components/ui/segmented';
import { HomeSiderType } from '@/constants/enum';
import { siteConfig } from '@/constants/site-config';
import { useNavItems } from '@/hooks/router';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useIsOwner } from '@/hooks/user';
import { oneLevelTabSelectIdxAtom } from '@/store/app';
import { useAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

const opts = [
  { label: 'Home', value: HomeSiderType.HOME },
  { label: 'Post', value: HomeSiderType.POST },
];

export default function HomeSider({ type = HomeSiderType.HOME }: { type?: HomeSiderType }) {
  const [current, setCurrent] = useState<HomeSiderType>(type ?? HomeSiderType.HOME);

  const { routers } = useNavItems();
  const isOwner = useIsOwner();
  const [selectIdx1, setSelectIdx1] = useAtom(oneLevelTabSelectIdxAtom);
  const router = useRouter();

  const renderContent = useCallback(() => {
    if (current === HomeSiderType.HOME)
      return (
        <>
          <Avatar className="shadow-card-darker h-40 w-40 opacity-75 transition hover:animate-shake hover:opacity-100">
            <AvatarImage src="https://ysx.cosine.ren/img/avatar.jpg" />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <p className="mt-2">{siteConfig?.name}</p>
          <p className="mt-3 text-muted-foreground">{siteConfig?.description}</p>
          <div className="mt-3 flex select-none justify-center text-center text-sm/4 text-muted-foreground dark:text-white/80">
            <p className="flex cursor-pointer flex-col gap-2 p-1 transition hover:text-primary">
              <span className="text-lg/5 font-bold">159</span>
              文章
            </p>
            <div className="mx-3 w-px bg-muted-foreground" />
            <p className="flex cursor-pointer flex-col gap-2 p-1 transition hover:text-primary">
              <span className="text-lg/5 font-bold">20</span>
              分类
            </p>
            <div className="mx-3 w-px bg-muted-foreground" />
            <p className="flex cursor-pointer flex-col gap-2 p-1 transition hover:text-primary">
              <span className="text-lg/5 font-bold">109</span>
              标签
            </p>
          </div>
          <div className="mt-6 flex w-full flex-col gap-2">
            {routers.map(({ name, path, key, needOwner }, idx) => {
              if (needOwner && !isOwner) return null;
              return (
                <NavItem
                  layoutIdPrefix="home_sider"
                  type="sider"
                  key={key ?? name}
                  selected={selectIdx1 === idx}
                  className="w-full px-1 py-2"
                  onClick={() => {
                    router.push(path);
                    setSelectIdx1(idx);
                  }}
                  name={name}
                  indicatorClass="inset-x-4"
                />
              );
            })}
          </div>
        </>
      );
    return <PostRightSider />;
  }, [current, isOwner, router, routers, selectIdx1, setSelectIdx1]);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="sticky top-20 flex min-w-[16rem] flex-col items-center p-4 px-5 lg:hidden">
      {type !== HomeSiderType.HOME && (
        <Segmented
          className="mb-4 flex w-full justify-between text-lg"
          itemClass="flex-grow"
          options={opts}
          defaultValue={current}
          onChange={(value) => {
            setCurrent(value as HomeSiderType);
          }}
        />
      )}
      {renderContent()}
    </div>
  );
}
