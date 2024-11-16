import { Variants } from 'motion/react';
import { microDampingPreset } from './spring';

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
