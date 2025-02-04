'use client';

import { useState, useEffect } from 'react';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@lib/utils';

const lineVariants: Variants = {
  closed: {
    rotate: 0,
    y: 0,
    opacity: 1,
  },
  opened: (custom: number) => ({
    rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
    y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
    opacity: custom === 2 ? 0 : 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  }),
};

const MenuIcon = ({ className, id }: { className?: string; id?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    const handleDrawerStateChange = (e: CustomEvent) => {
      setIsOpen(e.detail.isOpen);
      controls.start(e.detail.isOpen ? 'opened' : 'closed');
    };

    document.addEventListener('drawerStateChange', handleDrawerStateChange as EventListener);
    return () => {
      document.removeEventListener('drawerStateChange', handleDrawerStateChange as EventListener);
    };
  }, [controls]);

  const toggleMenu = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    controls.start(newState ? 'opened' : 'closed');

    // 触发抽屉事件
    const event = new CustomEvent('toggleDrawer', { detail: { isOpen: newState } });
    document.dispatchEvent(event);
  };

  return (
    <div
      className={cn(
        'hover:bg-foreground/10 text-primary flex-center cursor-pointer rounded-md transition-colors duration-200 select-none dark:text-white',
        className,
      )}
      id={id}
      onClick={toggleMenu}
      role="button"
      aria-label={isOpen ? '关闭菜单' : '打开菜单'}
      aria-expanded={isOpen}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.line x1="4" y1="6" x2="20" y2="6" variants={lineVariants} animate={controls} custom={1} />
        <motion.line x1="4" y1="12" x2="20" y2="12" variants={lineVariants} animate={controls} custom={2} />
        <motion.line x1="4" y1="18" x2="20" y2="18" variants={lineVariants} animate={controls} custom={3} />
      </svg>
    </div>
  );
};

export { MenuIcon };
