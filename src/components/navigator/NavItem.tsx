import clsx, { ClassValue } from 'clsx';
import { Variants, motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

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
    <motion.div
      variants={itemVariants}
      className={clsx(
        'relative flex cursor-pointer items-center justify-center text-xl',
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
          className={twMerge('absolute inset-x-0 -bottom-1 border-t-2 border-primary', indicatorClass)}
          layoutId="header_tab_selected"
        />
      )}
    </motion.div>
  );
}
export default NavItem;
