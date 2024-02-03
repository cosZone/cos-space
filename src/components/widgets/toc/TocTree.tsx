import { useActiveTocId } from '@/hooks/post';
import { springScrollToElement } from '@/lib/scroller';
import { cn } from '@/lib/utils';
import { m } from 'framer-motion';
import { memo, useCallback, useMemo } from 'react';
import { ITocItem, TocItem } from './TocItem';

// refer to Mix Space Shiro
export default function TocTree({ $headings, className }: { $headings?: HTMLHeadingElement[]; className?: string }) {
  const [activeId, setActiveId] = useActiveTocId($headings);

  const toc: ITocItem[] = useMemo(() => {
    if (!$headings) return [];
    return Array.from($headings).map((el, idx) => {
      const depth = +el.tagName.slice(1);
      const title = el.textContent || '';

      const index = idx;

      return {
        depth,
        index: isNaN(index) ? -1 : index,
        title,
        anchorId: el.id,
        $heading: el,
      };
    });
  }, [$headings]);

  const rootDepth = useMemo(
    () => (toc?.length ? (toc.reduce((d: number, cur) => Math.min(d, cur.depth), toc[0]?.depth || 0) as any as number) : 0),
    [toc],
  );

  const handleScrollTo = useCallback((i: number, $el: HTMLElement | null, anchorId: string) => {
    if ($el) {
      springScrollToElement($el, -100).then(() => {
        setActiveId?.(anchorId);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ul className={cn('scrollbar-none flex flex-grow flex-col overflow-auto px-2', className)}>
      {toc?.map((heading, idx) => {
        return (
          <MemoedItem
            heading={heading}
            isActive={heading.anchorId === activeId}
            key={idx + heading.title}
            rootDepth={rootDepth}
            onClick={handleScrollTo}
          />
        );
      })}
    </ul>
  );
}

const MemoedItem = memo<{
  isActive: boolean;
  heading: ITocItem;
  rootDepth: number;
  onClick?: (i: number, $el: HTMLElement | null, anchorId: string) => void;
}>((props) => {
  const { heading, isActive, onClick, rootDepth } = props;

  return (
    <li key={heading.title} className="relative">
      {isActive && (
        <m.span
          layoutId="active-toc-item"
          layout
          className="absolute bottom-[3px] left-0 top-[3px] w-[2px] rounded-sm bg-primary"
        />
      )}
      <TocItem heading={heading} onClick={onClick} active={isActive} key={heading.title} rootDepth={rootDepth} />
    </li>
  );
});
MemoedItem.displayName = 'MemoedItem';
