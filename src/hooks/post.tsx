import { postActiveTocIdAtom } from '@/store/post';
import { useAtom } from 'jotai';
import { startTransition, useEffect } from 'react';

export const useActiveTocId = ($headings?: HTMLHeadingElement[]) => {
  const [activeId, setActiveId] = useAtom(postActiveTocIdAtom);
  useEffect(() => {
    if (!$headings) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTransition(() => {
              setActiveId(entry.target.id);
            });
          }
        });
      },
      { rootMargin: `80px 0px -80px 0px` }, // 上边缘 80px
    );
    $headings.forEach(($heading) => {
      observer.observe($heading);
    });
    return () => {
      observer.disconnect();
    };
  }, [$headings]);

  return [activeId, setActiveId] as const;
};
