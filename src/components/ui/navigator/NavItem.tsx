import { delayOpenAnimVariants } from '@/lib/anim';
import clsx, { ClassValue } from 'clsx';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export type NavItemProps = {
  selected?: boolean;
  name?: string;
  icon?: JSX.Element;
  onClick: () => void;
  className?: ClassValue;
  indicatorClass?: string;
};
function NavItem({ selected, icon, name, onClick, className, indicatorClass }: NavItemProps) {
  return (
    <motion.div variants={delayOpenAnimVariants}>
      <div
        className={clsx(
          'relative flex h-full w-full cursor-pointer items-center justify-center text-xl hover:opacity-70',
          {
            'text-primary': selected,
          },
          className,
        )}
        onClick={onClick}
      >
        {icon}
        {name}
        {selected && (
          <motion.div
            className={twMerge('absolute inset-x-0 -bottom-0.5 border-t-2 border-primary', indicatorClass)}
            layoutId="header_tab_selected"
          />
        )}
      </div>
    </motion.div>
  );
}
export default NavItem;
