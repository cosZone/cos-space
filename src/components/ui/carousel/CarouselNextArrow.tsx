import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { FaAngleLeft } from 'react-icons/fa6';

type ArrowProps = {
  className?: string;
  onClick?: () => void;
};
export default function CarouselNextArrow({ onClick, className }: ArrowProps) {
  return (
    <motion.div
      className={cn(
        'flex-center h-9 w-9 cursor-pointer rounded-full border border-black bg-black/20 backdrop-blur-lg dark:border-white/50 dark:bg-white/20',
        className,
      )}
      onClick={onClick}
    >
      <FaAngleLeft className="rotate-180 xs:h-6 xs:w-6" />
    </motion.div>
  );
}
