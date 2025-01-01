// import { microDampingPreset } from '@/constants/anim/spring';
// import { siteConfig } from '@/constants/site-config';
// import { useScrollBeyond } from '@/hooks/app/useScrollBeyond';
// import { useScrollHide } from '@/hooks/app/useScrollHide';
// import { cn } from '@/lib/utils';
import { cn } from '@lib/utils';
import { microDampingPreset } from 'constants/anim/spring';
import { siteConfig } from 'constants/site-config';
import { useScrollBeyond } from 'hooks/app/useScrollBeyond';
import { useScrollHide } from 'hooks/app/useScrollHide';
import { motion } from 'motion/react';
// import { useRouter } from 'next/navigation';
import LogoSvg from '@assets/svg/logo.svg?react';
import { Navigator } from '@components/ui/navigator';
import { pathnameAtom } from '@store/app';
import { useEffect } from 'react';

export function Header({ pathname }: { pathname: string }) {
  const { alternate, title, showLogo } = siteConfig;
  const isVisible = useScrollHide();
  const isBeyond = useScrollBeyond(500);
  useEffect(() => {
    pathnameAtom.set(pathname);
  }, [pathname]);
  return (
    <motion.header
      className={cn('fixed inset-x-0 top-0 z-10 select-none gap-4 px-5 py-1 text-white md:py-2', {
        'border-border bg-gradient-header border-b text-black dark:text-white': isBeyond,
        'shadow-text': !isBeyond,
      })}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={microDampingPreset}
    >
      <div className="mx-auto flex max-w-[103.5rem] items-center justify-between">
        <motion.a
          initial={{ rotate: -180, scale: 0 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          className="-my-4 flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap text-sm font-bold"
          href="/"
          target="_self"
        >
          {showLogo ? (
            <LogoSvg className="h-8" />
          ) : (
            <p className="logo-text text-primary text-2xl font-light capitalize tracking-widest">{alternate ?? title}</p>
          )}
        </motion.a>
        <Navigator className="h-full flex-grow justify-end" />
      </div>
    </motion.header>
  );
}
