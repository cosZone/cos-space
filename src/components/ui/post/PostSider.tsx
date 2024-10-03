import TocTree from '@/components/widgets/toc/TocTree';
import { MAIN_MARKDOWN_ID } from '@/constants/dom-id';
import { useIsOwner } from '@/hooks/user';
import { cn } from '@/lib/utils';
import { postIsEditAtom } from '@/store/post';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { AiFillEdit, AiFillLike } from 'react-icons/ai';
import { IoExit } from 'react-icons/io5';
import { Button } from '../button';

const PostSider = ({ className }: { className?: string }) => {
  const isOwner = useIsOwner();
  const [isEdit, setIsEdit] = useAtom(postIsEditAtom);
  const $headings = useMemo(() => {
    const $mainMarkdownRender = document.getElementById(MAIN_MARKDOWN_ID);
    if (!$mainMarkdownRender) return;

    const $headings = [...$mainMarkdownRender.querySelectorAll('h1,h2,h3,h4,h5,h6')] as HTMLHeadingElement[];

    return $headings;
  }, []);

  return (
    <div className={cn('sticky top-20 flex w-60 flex-col', className)}>
      {$headings?.length ? (
        <div className="max-h-[70vh] min-w-[15rem] overflow-auto">
          <TocTree className="h-full justify-start md:h-auto" $headings={$headings} />
        </div>
      ) : (
        <div className="text-center text-gray-500">没有目录可显示</div> // 添加空状态
      )}
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
  );
};

export default PostSider;
