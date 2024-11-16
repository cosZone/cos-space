'use client';

import { MD_SCREEN_QUERY } from '@/constants';
import { useNavItems } from '@/hooks/router';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useIsOwner } from '@/hooks/user';
import { childDelayOpenAnimVariants } from '@/lib/anim';
import { cn } from '@/lib/utils';
import { oneLevelMenuExpandAtom, oneLevelTabSelectIdxAtom } from '@/store/app';
import { ClassValue } from 'clsx';
import { motion } from 'motion/react';
import { useAtom } from 'jotai';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CgClose, CgMenu } from 'react-icons/cg';
import { useMediaQuery } from 'react-responsive';
import Sider from '../../layout/sider';
import NavItem from './NavItem';

type NavigatorProps = {
  className?: ClassValue;
};

export const Navigator = ({ className }: NavigatorProps) => {
  const router = useRouter();
  const [selectIdx, setSelectIdx] = useAtom(oneLevelTabSelectIdxAtom);
  const [mobileExpand, setMobileExpand] = useAtom(oneLevelMenuExpandAtom);
  const isMdScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const isMounted = useIsMounted();
  const { routers, buttons } = useNavItems();
  const path = usePathname();
  const isOwner = useIsOwner();

  /** Set SelectIdx When Change Route */
  useEffect(() => {
    for (let i = 0; i < routers.length; i++) {
      if (routers[i].path === path) {
        setSelectIdx(i);
        break;
      }
    }
  }, [path, routers, setSelectIdx]);

  if (!isMounted) return null;
  return (
    <div className={cn('flex items-center', className)}>
      {isMdScreen ? (
        <>
          <motion.nav initial={false} animate={mobileExpand ? 'open' : 'closed'} className="flex w-full justify-end">
            <motion.div
              whileTap={{ scale: 1.3 }}
              className="relative h-8 w-8"
              onClick={() => setMobileExpand(!mobileExpand)}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
              }}
            >
              <motion.span
                className="absolute inset-0 cursor-pointer text-3xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: mobileExpand ? 0 : 1,
                  transition: {
                    delay: mobileExpand ? 0.1 : 0,
                  },
                }}
              >
                <CgMenu />
              </motion.span>
              <motion.span
                className="absolute inset-0 cursor-pointer text-3xl"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: mobileExpand ? 1 : 0,
                  transition: {
                    delay: mobileExpand ? 0 : 0.1,
                  },
                }}
              >
                <CgClose />
              </motion.span>
            </motion.div>
          </motion.nav>
          <Sider bottomItems={buttons} />
        </>
      ) : (
        <motion.div
          initial="closed"
          animate="open"
          variants={childDelayOpenAnimVariants}
          className="ml-4 flex w-full flex-grow items-center gap-4"
        >
          {routers.map(({ name, path, key, needOwner }, idx) => {
            if (needOwner) {
              if (!isOwner) return null;
            }
            return (
              <NavItem
                selected={selectIdx === idx}
                className="px-2"
                key={key ?? name}
                onClick={() => {
                  router.push(path);
                  setSelectIdx(idx);
                }}
                name={name}
              />
            );
          })}
          <div className="ml-auto flex items-center gap-1">
            {buttons.map(({ key, icon, onClick }, idx) => (
              <NavItem
                selected={selectIdx === routers.length + idx + 1}
                className="px-1 py-1"
                key={key}
                onClick={onClick}
                icon={icon}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
