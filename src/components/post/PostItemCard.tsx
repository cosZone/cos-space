import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@components/ui/card';
import Tooltip from '@components/ui/tooltip';
import { Routes } from '@constants/router';
import { defaultCoverList } from '@constants/site-config';
import { useReadTime } from '@hooks/post';
import { parseDate } from '@lib/datetime';
import { routeBuilder } from '@lib/route';
import { cn } from '@lib/utils';
import { createHash } from 'crypto';
import { useMemo } from 'react';
import { BiSolidTimeFive } from 'react-icons/bi';
import { CgFlag } from 'react-icons/cg';
import { FaCalendarDays, FaPenNib, FaTags } from 'react-icons/fa6';
import type { BlogPost } from 'types/blog';

export type PostItemCardProps = {
  className?: string;
  data?: BlogPost;
  leftClip?: boolean;
};

export default function PostItemCard({ className, data, leftClip = true }: PostItemCardProps) {
  const { cover, date, catalog, categories, title, description, link } = data?.data ?? {};

  const { id, body, rendered } = data ?? {};

  const readState = useReadTime(body); // TODO: readTime 现在可以在静态获取的时候就获取
  const finalCover = useMemo(() => {
    if (cover) return cover;
    if (title) {
      const hash = createHash('md5').update(title).digest('hex');
      const index = parseInt(hash, 16) % defaultCoverList.length;
      return defaultCoverList[index];
    }
    return defaultCoverList[Math.floor(Math.random() * defaultCoverList.length)];
  }, [cover, title]);

  const href = useMemo(() => routeBuilder(Routes.Post, { id, link: (rendered?.metadata?.link as string) ?? link }), [id, link]);

  const category = useMemo(() => {
    if (!catalog) return '';
    if (Array.isArray(categories[0])) return categories[0].join(' / ');
    return categories[0];
  }, [catalog, categories]);

  return (
    <Card
      className={cn(
        'hover:shadow-card-darker group relative flex cursor-pointer gap-2 border-none bg-transparent shadow-card transition-shadow xs:flex-col',
        className,
      )}
    >
      <a
        href={href}
        className={cn(
          'relative h-[11.625rem] max-h-[11.625rem] w-[calc(50%-2rem)] overflow-hidden rounded-lg xs:w-full xs:clip-path-none',
          leftClip ? 'order-1 clip-path-post-img-left' : 'order-2 clip-path-post-img-right',
        )}
      >
        <div className="absolute inset-0 z-10" />
        <img
          src={finalCover}
          loading="lazy"
          alt="post"
          className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:rotate-3 group-hover:scale-110"
        />
      </a>
      <div
        className={cn(
          'flex w-[calc(50%+2rem)] flex-col gap-2 px-4 pb-2 pt-4 xs:w-full xs:pt-1',
          leftClip ? 'order-2' : 'order-1',
        )}
      >
        <div className="flex w-full justify-between">
          <div className="flex-center text-xs text-muted-foreground">
            <CgFlag />
            {catalog && category}
          </div>
          <div className="flex justify-end gap-4 text-xs text-muted-foreground">
            {date ? (
              <p className="flex-center gap-1">
                <FaCalendarDays />
                {parseDate(date, 'YYYY-MM-DD')}
              </p>
            ) : null}
            <p className="flex-center gap-1">
              <FaPenNib /> {readState?.words} 字
            </p>
            <Tooltip title={<div className="text-xs">预计阅读时长: {readState?.minutes} min</div>}>
              <p className="flex-center gap-1">
                <BiSolidTimeFive /> {readState?.text}
              </p>
            </Tooltip>
          </div>
        </div>
        <CardHeader className="mt-1 p-0">
          <CardTitle className="truncate text-xl font-bold text-primary">{title}</CardTitle>
        </CardHeader>
        <CardDescription className="line-clamp-3 h-15 overflow-hidden">{description ?? body?.slice(0, 150)}</CardDescription>
        <div className={cn('mt-2 flex flex-wrap gap-2', { 'justify-end': !leftClip })}>
          {data?.data.tags?.length
            ? data?.data.tags.map((tag: string) => (
                <Badge key={tag} className="gap-0.5 text-xs">
                  <FaTags /> {tag}
                </Badge>
              ))
            : null}
        </div>
        <a href={href} aria-label="more info" className={cn('absolute bottom-0', leftClip ? 'right-0' : 'left-0')}>
          <Button
            className={cn(
              'bg-gradient-shoka-button rounded-2xl transition-all hover:translate-y-1 hover:scale-105',
              leftClip
                ? 'rounded-es-none rounded-se-none hover:translate-x-1'
                : 'rounded-ee-none rounded-ss-none hover:-translate-x-1',
            )}
          >
            more...
          </Button>
        </a>
      </div>
    </Card>
  );
}
