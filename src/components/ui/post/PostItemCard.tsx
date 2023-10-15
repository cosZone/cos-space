import { clickableProps } from '@/lib/anim';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { BiSolidTimeFive } from 'react-icons/bi';
import { FaCalendarDays, FaPenNib, FaTags } from 'react-icons/fa6';
import { twMerge } from 'tailwind-merge';
import { Badge } from '../badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../card';

export type PostItemCardProps = {
  className?: string;
  data?: {
    title?: string;
    cover?: string;
    description?: string;
  };
};

export default function PostItemCard({ className, data }: PostItemCardProps) {
  const router = useRouter();
  return (
    <Card
      className={twMerge('flex cursor-pointer gap-2 transition-shadow hover:shadow-card xs:flex-col', className)}
      onClick={() => router.push('/about')}
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
          <p className="flex-center gap-1">
            <FaCalendarDays />
            2023-09-23
          </p>
          <p className="flex-center gap-1">
            <FaPenNib /> 21k 字
          </p>
          <p className="flex-center gap-1">
            <BiSolidTimeFive /> 19 分钟
          </p>
        </div>
        <CardHeader className="p-0">
          <CardTitle className="font-noto-sc truncate text-primary">NestJS 学习之优秀项目分析与最佳实践</CardTitle>
        </CardHeader>
        <CardDescription className="line-clamp-2 max-h-10 overflow-hidden">
          # 前言 进入 NestJS 的世界可能会让你感到不知所措，尤其是当你面对众多的模块和概念时。本文不仅会深入分析优秀的 NestJS
          项目，介绍常用的 Nest 内置模块，还
        </CardDescription>
        <CardFooter className="p-0">
          <Badge className="gap-0.5">
            <FaTags /> 后端
          </Badge>
        </CardFooter>
      </div>
    </Card>
  );
}
