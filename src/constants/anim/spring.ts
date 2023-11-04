import { Spring } from 'framer-motion';

export const microDampingPreset: Spring = {
  type: 'spring',
  damping: 24,
};

export const microReboundPreset: Spring = {
  type: 'spring',
  stiffness: 300,
  damping: 24,
};
