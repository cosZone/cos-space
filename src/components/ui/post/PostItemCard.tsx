import { scrollCardMoveUpVariants } from '@/constants/anim/variants';
import { Routes } from '@/constants/router';
import { defaultCoverList } from '@/constants/site-config';
import { useReadTime } from '@/hooks/util';
import { PostData, PostMetaData } from '@/lib/api/type';
import { parseDate } from '@/lib/datetime';
import { routeBuilder } from '@/lib/route';
import { motion } from 'motion/react';
import matter from 'gray-matter';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { BiSolidTimeFive } from 'react-icons/bi';
import { FaCalendarDays, FaPenNib, FaTags } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';
import Tooltip from '../tooltip';

export type PostItemCardProps = {
  className?: string;
  data?: PostData;
};

export default function PostItemCard({ className, data }: PostItemCardProps) {
  const { id, title, description, createdAt, coverUrl } = data ?? {};
  const { metaData, content } = useMemo(() => {
    if (!data?.content) return {};
    const parsedData = matter(data?.content);
    return {
      metaData: parsedData.data as PostMetaData,
      content: parsedData.content,
    };
  }, [data]);

  const readState = useReadTime(content);
  const cover = useMemo(() => {
    if (coverUrl) return coverUrl;
    return defaultCoverList[Math.floor(Math.random() * defaultCoverList.length)];
  }, [coverUrl]);

  const href = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return window?.origin + routeBuilder(Routes.Post, { id: id ?? '' });
  }, [id]);

  const router = useRouter();
  return (
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }}>
      <motion.div variants={scrollCardMoveUpVariants}>
        <Card
          className={twMerge(
            'hover:shadow-card-darker group flex cursor-pointer gap-2 border-none bg-transparent shadow-card transition-shadow xs:flex-col',
            className,
          )}
          onClick={() => !!id && router.push(routeBuilder(Routes.Post, { id }))}
        >
          <a
            href={href}
            className="relative h-48 max-h-48 w-[calc(50%-2rem)] overflow-hidden rounded-lg clip-path-post-img-left xs:w-full xs:clip-path-none"
          >
            <div className="absolute inset-0 z-10" />
            <img
              src={cover}
              loading="lazy"
              alt="post"
              className="h-full w-full cursor-pointer object-cover opacity-75 transition duration-500 group-hover:scale-110 group-hover:opacity-100"
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
              <CardTitle className="truncate text-primary">{title}</CardTitle>
            </CardHeader>
            <CardDescription className="line-clamp-2 max-h-10 overflow-hidden">
              {description ?? content?.slice(0, 150)}
            </CardDescription>
            <CardFooter className="flex gap-2 p-0">
              {metaData?.tags?.length
                ? metaData.tags.map((tag) => (
                    <Badge key={tag} className="gap-0.5">
                      <FaTags /> {tag}
                    </Badge>
                  ))
                : null}
            </CardFooter>
          </div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
