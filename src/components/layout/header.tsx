import { microDampingPreset } from '@/constants/anim/spring';
import { siteConfig } from '@/constants/site-config';
import { useScrollBeyond } from '@/hooks/app/useScrollBeyond';
import { useScrollHide } from '@/hooks/app/useScrollHide';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Navigator } from '../ui/navigator';
import LogoSvg from '@/../public/svg/logo.svg?component';

export function Header() {
  const router = useRouter();
  const { alternate, title } = siteConfig;
  const isVisible = useScrollHide();
  const isBeyond = useScrollBeyond(500);
  return (
    <motion.header
      className={cn('fixed inset-x-0 top-0 z-10 select-none gap-4 p-5 text-white ', {
        'border-b border-border bg-gradient-header text-black dark:text-white': isBeyond,
        'shadow-text': !isBeyond,
      })}
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={microDampingPreset}
    >
      <div className="mx-auto flex max-w-[103.5rem] items-center justify-between">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          className="-my-4 flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap text-sm font-bold"
          onClick={() => router.push('/')}
        >
          <LogoSvg className="h-14" />
          {/* <p className="logo-text text-2xl font-light capitalize tracking-widest text-primary">{alternate ?? title}</p> */}
        </motion.div>
        <Navigator className="h-full flex-grow justify-end" />
      </div>
    </motion.header>
  );
}
