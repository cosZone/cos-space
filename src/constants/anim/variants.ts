import type { Variants } from 'motion/react';
import { microDampingPreset, microReboundPreset } from './spring';

export const scrollCardMoveUpVariants: Variants = {
  offscreen: {
    y: 200,
  },
  onscreen: {
    y: 0,
    transition: {
      ...microDampingPreset,
      duration: 0.5,
    },
  },
};

export const scrollCardScaleVariants: Variants = {
  offscreen: {
    opacity: 0,
    scale: 0.5,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      ...microDampingPreset,
      duration: 0.3,
    },
  },
};

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
    transition: microReboundPreset,
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

export const fadeInVariants = {
  offscreen: {
    opacity: 0,
    scale: 0.95,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 0.8,
      bounce: 0.2,
    },
  },
};
