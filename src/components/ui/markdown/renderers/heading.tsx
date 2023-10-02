import { springScrollToElement } from '@/lib/scroller';
import { createElement } from 'react';
import type { DOMAttributes } from 'react';
import { FaHashtag } from 'react-icons/fa6';

interface HeadingProps {
  id: string;
  className?: string;
  children: React.ReactNode;
  level: number;
}

export const MHeader = (props: HeadingProps) => {
  const { children, id, level } = props;

  return createElement<DOMAttributes<HTMLHeadingElement>, HTMLHeadingElement>(
    `h${level}`,
    {
      id,
      className: 'group flex items-center',
    } as any,
    null,
    <>
      <span>{children}</span>
      <FaHashtag
        className='center ml-2 inline-flex cursor-pointer select-none opacity-0 outline-none transition-opacity duration-200 content-["#"] group-hover:opacity-100'
        role="button"
        tabIndex={0}
        onClick={() => {
          const state = history.state;
          history.replaceState(state, '', `#${id}`);
          springScrollToElement(document.getElementById(id)!, -100);
        }}
      />
    </>,
  );
};
