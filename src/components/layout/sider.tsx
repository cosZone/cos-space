'use client';

import { useIsMounted } from '@/hooks/useIsMounted';
import NavItem, { NavItemProps } from '../ui/navigator/NavItem';
import { useNavItems } from '@/hooks/router';
import { useAtom } from 'jotai';
import { oneLevelMenuExpandAtom, oneLevelTabSelectIdxAtom } from '@/store/app';
import { useRouter } from 'next/navigation';
import Drawer from '../ui/drawer';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { CardDescription } from '../ui/card';
import { useCallback, useState } from 'react';
import { useIsOwner } from '@/hooks/user';
import PostSider from '../ui/post/PostSider';
import Segmented from '../ui/segmented'; // 添加导入
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';

const opts = [
  { label: '导航', value: 'nav' },
  { label: '目录', value: 'post' },
];
type SiderProps = {
  bottomItems: (NavItemProps & { key?: string })[];
  type?: 'drawer' | 'inner'; // 在抽屉 还是在文章右侧
};
const Sider = ({ bottomItems }: SiderProps) => {
  const router = useRouter();
  const isMounted = useIsMounted();
  const [selectIdx1, setSelectIdx1] = useAtom(oneLevelTabSelectIdxAtom);
  const [mobileExpand, setMobileExpand] = useAtom(oneLevelMenuExpandAtom);
  const { routers } = useNavItems();
  const isOwner = useIsOwner();
  const [currentView, setCurrentView] = useState<'nav' | 'post'>('post');

  const renderContent = useCallback(() => {
    return (
      <AnimatePresence mode="wait">
        <div className="flex h-full max-w-xs flex-col justify-between gap-4 p-2">
          {/* <div className="flex-center"> */}
          <Segmented
            id="mobile-header"
            className="w-full"
            itemClass="flex-grow py-2"
            options={opts}
            defaultValue={currentView}
            onChange={(value) => setCurrentView(value as 'nav' | 'post')}
          />
          {/* </div> */}
          {currentView === 'nav' ? (
            <motion.div
              key="mobile-nav"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              exit={{ x: -20 }}
              className="flex-center-y flex-grow justify-start gap-1"
            >
              <div className="flex-center-y mb-2 gap-1 px-2">
                <Avatar className="h-40 w-40 shadow-card">
                  <AvatarImage src="https://ysx.cosine.ren/img/avatar.jpg" />
                  <AvatarFallback>C</AvatarFallback>
                </Avatar>
                <h1 className="font-candy text-3xl text-primary">Cos</h1>
                <CardDescription className="line-clamp-3 max-h-15 overflow-hidden whitespace-pre-wrap text-center">
                  {`图片迁移完毕，博客待重构～xxxxxx xxxxxxxxxx xxxxxxxxxxxxxxxx\n换行测试xxxxx xxxxxxxxxx xxxxxxxxxxxxxxxx xxxxxxxxxx xxxxxxxxxx`}
                </CardDescription>
              </div>
              <div className="w-full">
                {routers.map(({ name, path, key, needOwner }, idx) => {
                  if (needOwner && !isOwner) return null;
                  return (
                    <NavItem
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
            </motion.div>
          ) : (
            <motion.div initial={{ x: 20 }} animate={{ x: 0 }} exit={{ x: 20 }} key="post-sider" layout className="flex-grow">
              <PostSider className="w-80" />
            </motion.div>
          )}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {bottomItems.map(({ key, icon, onClick }, idx) => (
              <NavItem
                key={key}
                selected={selectIdx1 === routers.length + idx + 1}
                className="w-auto px-1 py-1"
                onClick={onClick}
                icon={icon}
              />
            ))}
          </div>
        </div>
      </AnimatePresence>
    );
  }, [bottomItems, currentView, isOwner, router, routers, selectIdx1, setSelectIdx1]);
  if (!isMounted) return null;
  return <Drawer open={mobileExpand} onOpenChange={(open) => setMobileExpand(open)} render={renderContent} />;
};

export default Sider;
