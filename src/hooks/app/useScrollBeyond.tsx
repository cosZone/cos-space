import { useState, useEffect, useRef } from 'react';

export function useScrollBeyond(distance?: number) {
  const [isBeyond, setIsBeyond] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsBeyond(currentScrollY > (distance ?? 0));
      lastScrollY.current = currentScrollY;
    };

    // 只在客户端环境中执行
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });

      // 清除事件监听器
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [distance]); // 当距离变化时重新绑定事件

  return isBeyond;
}
