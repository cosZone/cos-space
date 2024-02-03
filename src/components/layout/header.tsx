import { microDampingPreset } from '@/constants/anim/spring';
import { siteConfig } from '@/constants/site-config';
import { useScrollHide } from '@/hooks/app/useScrollHide';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Navigator } from '../ui/navigator';

export function Header() {
  const router = useRouter();
  const { avatar, alternate, title } = siteConfig;
  const isVisible = useScrollHide();

  return (
    <motion.header
      className="sticky inset-x-0 top-0 z-10 select-none gap-4 border-b border-border bg-gradient-header px-4 py-1"
      initial={{ y: -100 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={microDampingPreset}
    >
      <div className="mx-auto flex items-center justify-between 2xl:container">
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          whileHover={{ scale: 1.1 }}
          className="flex cursor-pointer items-center justify-center gap-1 whitespace-nowrap text-2xl font-bold"
          onClick={() => router.push('/')}
        >
          {avatar ? (
            <Avatar className="h-8 w-8 shadow-card">
              <AvatarImage src={avatar} />
              <AvatarFallback>{(alternate ?? title)[0]}</AvatarFallback>
            </Avatar>
          ) : null}

          <p className="font-candy text-2xl font-light capitalize tracking-widest text-primary">{alternate ?? title}</p>
        </motion.div>
        <Navigator className="h-full flex-grow justify-end" />
      </div>
    </motion.header>
  );
}
