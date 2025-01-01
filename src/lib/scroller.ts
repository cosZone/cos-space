import { microDampingPreset } from '@constants/anim/spring';
import { animateValue } from 'motion/react';

const calculateElementTop = (el: HTMLElement) => {
  let top = 0;
  while (el) {
    top += el.offsetTop;
    el = el.offsetParent as HTMLElement;
  }
  return top;
};

export const springScrollToElement = (element: HTMLElement, delta = 40) => {
  const y = calculateElementTop(element);

  const to = y + delta;
  return springScrollTo(to);
};

// https://github.com/Innei/Shiro/blob/main/src/lib/scroller.ts
export const springScrollTo = (y: number | 'bottom') => {
  const scrollTop =
    // FIXME latest version framer will ignore keyframes value `0`
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    // FIXME latest version framer will ignore keyframes value `0`
    document.documentElement.scrollHeight || document.body.scrollHeight;
  // console.log('=======scroll', { scrollTop, y });
  const stopSpringScrollHandler = () => {
    animation.stop();
  };
  const toValue = y === 'bottom' ? scrollHeight : y;
  const animation = animateValue({
    keyframes: [scrollTop + 1, toValue],
    autoplay: true,
    ...microDampingPreset,
    onPlay() {
      window.addEventListener('wheel', stopSpringScrollHandler);
      window.addEventListener('touchmove', stopSpringScrollHandler);
    },

    onUpdate(latest) {
      if (latest <= 0) {
        animation.stop();
      }
      window.scrollTo(0, latest);
    },
  });

  animation.then(() => {
    window.removeEventListener('wheel', stopSpringScrollHandler);
    window.removeEventListener('touchmove', stopSpringScrollHandler);
  });
  return animation;
};
