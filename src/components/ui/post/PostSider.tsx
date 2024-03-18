import TocTree from '@/components/widgets/toc/TocTree';
import { MD_SCREEN_QUERY } from '@/constants';
import { MAIN_MARKDOWN_ID } from '@/constants/dom-id';
import { useIsOwner } from '@/hooks/user';
import { postIsEditAtom } from '@/store/post';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { AiFillEdit, AiFillLike } from 'react-icons/ai';
import { IoExit } from 'react-icons/io5';
import { useMediaQuery } from 'react-responsive';
import { Button } from '../button';

const PostSider = () => {
  const isOwner = useIsOwner();
  const [isEdit, setIsEdit] = useAtom(postIsEditAtom);
  const isMdScreen = useMediaQuery({ query: MD_SCREEN_QUERY });
  const $headings = useMemo(() => {
    const $mainMarkdownRender = document.getElementById(MAIN_MARKDOWN_ID);
    if (!$mainMarkdownRender) return;

    const $headings = [...$mainMarkdownRender.querySelectorAll('h1,h2,h3,h4,h5,h6')] as HTMLHeadingElement[];

    return $headings;
  }, []);

  if (isMdScreen) return null;
  return $headings?.length ? (
    <div className="sticky top-20 flex w-60 flex-col">
      <div className="max-h-[70vh] min-w-[15rem] overflow-auto">
        <TocTree className="h-full" $headings={$headings} />
      </div>
      <div className="flex-center mt-2 gap-1">
        <Button variant="ghost" className="p-2">
          <AiFillLike className="h-6 w-6" />
        </Button>
        {isOwner && (
          <Button variant="ghost" className="p-2" onClick={() => setIsEdit((pre) => !pre)}>
            {isEdit ? <IoExit className="h-6 w-6" /> : <AiFillEdit className="h-6 w-6" />}
          </Button>
        )}
      </div>
    </div>
  ) : null;
};

export default PostSider;
