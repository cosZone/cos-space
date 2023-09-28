import { Variants } from 'framer-motion';

export const childDelayOpenAnimVariants: Variants = {
  open: {
    clipPath: 'inset(0% 0% 0% 0% round 10px)',
    transition: {
      ease: 'easeInOut',
      duration: 0.4,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: 'inset(10% 50% 90% 50% round 10px)',
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

export const delayOpenAnimVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export type AnimType = 'scale' | 'translateY' | 'indicate' | 'topLeftAnim';
export const clickableProps = (type: AnimType = 'scale', props?: { scale?: number }) => {
  switch (type) {
    case 'indicate': {
      return {
        animate: {
          x: ['-24px', '24px', '-24px'], // 移动的路径
        },
        transition: {
          duration: 2,
          repeat: Infinity,
        },
      };
    }
    case 'topLeftAnim': {
      return {
        animate: {
          x: ['0%', '-10%', '0%', '-10%', '0%'],
          y: ['0%', '-10%', '0%', '-10%', '0%'],
        },
        transition: {
          duration: 1,
          repeat: Infinity,
          repeatDelay: 1,
        },
      };
    }
    case 'translateY': {
      return {
        transition: { type: 'linear', stiffness: 100 },
        whileTap: { translateY: -5 },
        whileHover: { translateY: -5 },
      };
    }
    case 'scale':
    default: {
      const { scale } = props ?? {};
      return {
        transition: { type: 'spring', stiffness: 80 },
        whileTap: { scale: scale ?? 1.05 },
        whileHover: { scale: scale ?? 1.05 },
      };
    }
  }
};
