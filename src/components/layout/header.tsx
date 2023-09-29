import { motion } from 'framer-motion';
import { FaEarthAsia } from 'react-icons/fa6';
import { Navigator } from '../ui/navigator';
import { useRouter } from 'next/navigation';

export function Header() {
  const router = useRouter();

  return (
    <header className="flex select-none items-center justify-between gap-4 border-b border-border bg-gradient-header px-4 py-2">
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
        <FaEarthAsia className="-mt-0.5 h-8 w-8 text-logo" />
        <p className="project-logo" />
      </motion.div>
      <Navigator className="h-full flex-grow justify-end" />
    </header>
  );
}
