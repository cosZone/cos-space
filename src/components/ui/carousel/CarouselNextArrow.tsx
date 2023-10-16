import { clickableProps } from '@/lib/anim';
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
        'flex-center h-9 w-9 cursor-pointer rounded-full border border-white/50 bg-white/20 fill-white backdrop-blur-lg',
        className,
      )}
      onClick={onClick}
    >
      <FaAngleLeft className="rotate-180 xs:h-6 xs:w-6" />
    </motion.div>
  );
}
