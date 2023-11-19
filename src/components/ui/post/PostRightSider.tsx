import TocTree from '@/components/widgets/toc/TocTree';
import { MD_SCREEN_QUERY } from '@/constants';
import { MAIN_MARKDOWN_ID } from '@/constants/dom-id';
import { useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';

const PostRightSider = () => {
  const isMdScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const $headings = useMemo(() => {
    const $mainMarkdownRender = document.getElementById(MAIN_MARKDOWN_ID);
    if (!$mainMarkdownRender) return;

    const $headings = [...$mainMarkdownRender.querySelectorAll('h1,h2,h3,h4,h5,h6')] as HTMLHeadingElement[];

    return $headings;
  }, []);

  if (isMdScreen) return null;
  return (
    <div className="sticky top-20 max-h-[70vh] w-60 overflow-auto">
      <TocTree className="h-full" $headings={$headings} />
    </div>
  );
};

export default PostRightSider;
