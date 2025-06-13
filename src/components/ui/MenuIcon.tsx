'use client';

import { useState, useEffect } from 'react';
import type { Variants } from 'motion/react';
import { motion, useAnimation } from 'motion/react';
import { cn } from '@lib/utils';
import { useIsMounted } from '@hooks/useIsMounted';

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
      stiffness: 300,
      damping: 25,
    },
  }),
};

const MenuIcon = ({ className, id }: { className?: string; id?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const controls = useAnimation();
  const isMounted = useIsMounted();

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

  if (!isMounted) return null;
  return (
    <div className={cn('flex-center', className)} id={id}>
      <div
        className="flex-center size-10 cursor-pointer rounded-full border border-[#E95469] bg-white/20 text-[#E95469] backdrop-blur select-none"
        onClick={toggleMenu}
        role="button"
        aria-label={isOpen ? '关闭菜单' : '打开菜单'}
        aria-expanded={isOpen}
        style={{
          viewTransitionName: 'menu-icon',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.g variants={lineVariants} animate={controls} custom={1} style={{ transformOrigin: '12px 12px' }}>
            <line x1="3" y1="6" x2="21" y2="6" />
          </motion.g>
          <motion.g variants={lineVariants} animate={controls} custom={2} style={{ transformOrigin: '12px 12px' }}>
            <line x1="3" y1="12" x2="21" y2="12" />
          </motion.g>
          <motion.g variants={lineVariants} animate={controls} custom={3} style={{ transformOrigin: '12px 12px' }}>
            <line x1="3" y1="18" x2="21" y2="18" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
};

export { MenuIcon };
