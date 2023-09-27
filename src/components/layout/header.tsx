import { motion } from 'framer-motion';
import { BsFillBookmarksFill } from 'react-icons/bs';
import { Navigator } from '../navigator';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="flex select-none items-center justify-between gap-4 px-4 py-2">
      <motion.div
        initial={{ rotate: -180, scale: 0 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        whileHover={{ scale: 1.1 }}
        className="flex cursor-pointer items-center justify-center whitespace-nowrap text-2xl font-bold"
        onClick={() => router.push('/')}
      >
        <BsFillBookmarksFill className="h-9 w-9 text-primary" />
        <p className="project-logo" />
      </motion.div>
      <Navigator className="h-full flex-grow" />
    </header>
  );
}
