import { useEffect, useRef, useState } from 'react';

export function useScrollHide(triggerDistance?: number) {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [_triggerDistance, setTriggerDistance] = useState(triggerDistance ?? 0);

  useEffect(() => {
    setTriggerDistance(triggerDistance ?? window?.innerHeight);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > _triggerDistance) {
        if (currentScrollY > lastScrollY.current) {
          // 向下滚动
          setIsVisible(false);
        } else {
          // 向上滚动
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [_triggerDistance, triggerDistance]);

  return isVisible;
}
