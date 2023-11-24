import { scrollCardMoveUpVariants } from '@/constants/anim/variants';
import { Routes } from '@/constants/router';
import { useReadTime } from '@/hooks/util';
import { clickableProps } from '@/lib/anim';
import { PostData, PostMetaData } from '@/lib/api/type';
import { parseDate } from '@/lib/datetime';
import { routeBuilder } from '@/lib/route';
import { motion } from 'framer-motion';
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
  const { id, title, description, createdAt } = data ?? {};
  const { metaData, content } = useMemo(() => {
    if (!data?.content) return {};
    const parsedData = matter(data?.content);
    return {
      metaData: parsedData.data as PostMetaData,
      content: parsedData.content,
    };
  }, [data]);
  const readState = useReadTime(content);
  console.log(title, { content, metaData });

  const router = useRouter();
  return (
    <motion.div initial="offscreen" whileInView="onscreen" viewport={{ once: true, amount: 0.8 }}>
      <motion.div variants={scrollCardMoveUpVariants}>
        <Card
          className={twMerge('flex cursor-pointer gap-2 transition-shadow hover:shadow-card xs:flex-col', className)}
          onClick={() => !!id && router.push(routeBuilder(Routes.Post, { id }))}
        >
          <div className="max-h-40 w-[calc(50%-2rem)] overflow-hidden rounded-lg clip-path-post-img-left xs:w-full xs:clip-path-none">
            <motion.img
              src="https://fastly.jsdelivr.net/gh/yusixian/imgBed@1.2.1/img/cos_blog/97394501_p0.webp"
              alt="post"
              {...clickableProps()}
              className="h-full w-full cursor-pointer object-cover"
            />
          </div>
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
              <CardTitle className="font-noto-sc truncate text-primary">{title}</CardTitle>
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
