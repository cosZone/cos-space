import { delayOpenAnimVariants } from '@/lib/anim';
import { cn } from '@/lib/utils';
import clsx, { ClassValue } from 'clsx';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export type NavItemProps = {
  selected?: boolean;
  name?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  className?: ClassValue;
  indicatorClass?: string;
  type?: 'header' | 'sider';
};
function NavItem({ selected, icon, name, onClick, className, indicatorClass, type = 'header' }: NavItemProps) {
  return (
    <motion.div variants={delayOpenAnimVariants}>
      <div
        className={cn(
          'relative flex h-full w-full cursor-pointer items-center justify-center text-base hover:opacity-70',
          {
            'text-primary': selected && type === 'header',
            'z-0': type === 'sider',
          },
          className,
        )}
        onClick={onClick}
      >
        {icon}
        {name}
        {selected && (
          <motion.div
            className={twMerge(
              clsx('absolute inset-x-0 -bottom-0.5 border-t-2 border-primary', {
                'inset-0 -z-10 rounded-lg border-none bg-gradient-pink': type === 'sider',
              }),
              indicatorClass,
            )}
            layoutId="header_tab_selected"
          />
        )}
      </div>
    </motion.div>
  );
}
export default NavItem;
