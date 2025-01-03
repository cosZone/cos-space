import { Badge } from '@components/ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@components/ui/card';
import Tooltip from '@components/ui/tooltip';
import { Routes } from '@constants/router';
import { defaultCoverList } from '@constants/site-config';
import { useReadTime } from '@hooks/post';
import { parseDate } from '@lib/datetime';
import { routeBuilder } from '@lib/route';
import { cn } from '@lib/utils';
import { useMemo } from 'react';
import { BiSolidTimeFive } from 'react-icons/bi';
import { FaCalendarDays, FaPenNib, FaTags } from 'react-icons/fa6';
import type { BlogPost } from 'types/blog';

export type PostItemCardProps = {
  className?: string;
  data?: BlogPost;
};

export default function PostItemCard({ className, data }: PostItemCardProps) {
  const { id, title, description, createdAt, coverUrl, body } = useMemo(() => {
    return {
      id: data?.id,
      title: data?.data.title,
      description: data?.data.description,
      createdAt: data?.data.date,
      coverUrl: data?.data.cover,
      body: data?.body,
    };
  }, [data]);

  const readState = useReadTime(body); // TODO: readTime 现在可以在静态获取的时候就获取
  const cover = useMemo(() => {
    if (coverUrl) return coverUrl;
    return defaultCoverList[Math.floor(Math.random() * defaultCoverList.length)];
  }, [coverUrl]);

  const href = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window?.origin + routeBuilder(Routes.Post, { id: id ?? '' });
  }, [id]);

  return (
    // TODO: 动画这里需要优化，astro 里 motion 动画这样不生效
    // <motion.div
    //   key={data?.id}
    // variants={scrollCardMoveUpVariants}
    // initial="offscreen"
    // animate="onscreen"
    // viewport={{ once: true, amount: 0.8 }}
    // >
    <Card
      className={cn(
        'hover:shadow-card-darker group flex cursor-pointer gap-2 border-none bg-transparent shadow-card transition-shadow xs:flex-col',
        className,
      )}
      onClick={() => !!id && window.open(routeBuilder(Routes.Post, { id }))}
    >
      <a
        href={href}
        className="clip-path-post-img-left xs:clip-path-none relative h-48 max-h-48 w-[calc(50%-2rem)] overflow-hidden rounded-lg xs:w-full"
      >
        <div className="absolute inset-0 z-10" />
        <img
          src={cover}
          loading="lazy"
          alt="post"
          className="h-full w-full cursor-pointer object-cover transition duration-500 group-hover:rotate-3 group-hover:scale-110"
        />
      </a>
      <div className="flex w-1/2 flex-col gap-2 px-4 pb-2 pt-4 xs:w-full xs:pt-1">
        <div className="flex w-full justify-end gap-4 text-xs text-muted-foreground">
          {createdAt ? (
            <p className="flex-center gap-1">
              <FaCalendarDays />
              {parseDate(createdAt, 'YYYY-MM-DD')}
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
        <CardHeader className="p-0">
          <CardTitle className="truncate text-lg text-primary">{title}</CardTitle>
        </CardHeader>
        <CardDescription className="line-clamp-2 max-h-10 overflow-hidden">
          {description ?? body?.slice(0, 150)}
        </CardDescription>
        <CardFooter className="flex gap-2 p-0">
          {data?.data.tags?.length
            ? data?.data.tags.map((tag: string) => (
                <Badge key={tag} className="gap-0.5">
                  <FaTags /> {tag}
                </Badge>
              ))
            : null}
        </CardFooter>
      </div>
    </Card>
    // </motion.div>
  );
}
