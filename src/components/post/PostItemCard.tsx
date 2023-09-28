import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { motion } from 'framer-motion';
import { clickableProps } from '@/lib/anim';
import { twMerge } from 'tailwind-merge';
import { FaCalendarDays, FaPenNib } from 'react-icons/fa6';
import { BiSolidTimeFive } from 'react-icons/bi';

export type PostItemCardProps = {
  className?: string;
  data?: {
    cover?: string;
    title: string;
    description: string;
  };
};

export default function PostItemCard({ className, data }: PostItemCardProps) {
  return (
    <Card className={twMerge('flex items-center gap-2', className)}>
      <div className="h-full w-[calc(50%-2rem)] overflow-hidden rounded-lg clip-path-post-img-left">
        <motion.img
          src="https://fastly.jsdelivr.net/gh/yusixian/imgBed@1.2.1/img/cos_blog/97394501_p0.webp"
          alt="post"
          {...clickableProps()}
          className="h-auto w-full cursor-pointer object-cover"
        />
      </div>
      <div className="flex w-1/2 flex-col gap-2 p-4">
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
          <CardTitle className="truncate text-primary">NestJS学习之优秀项目分析与最佳实践</CardTitle>
        </CardHeader>
        <CardDescription className="line-clamp-2 max-h-10 overflow-hidden">
          # 前言 进入 NestJS 的世界可能会让你感到不知所措，尤其是当你面对众多的模块和概念时。本文不仅会深入分析优秀的 NestJS
          项目，介绍常用的 Nest 内置模块，还
        </CardDescription>
        <CardFooter className="p-0">Tag: 后端</CardFooter>
      </div>
    </Card>
  );
}

// 2023-09-23
// 21k 字
// 19 分钟
// NestJS学习之优秀项目分析与最佳实践
// # 前言 进入 NestJS 的世界可能会让你感到不知所措，尤其是当你面对众多的模块和概念时。本文不仅会深入分析优秀的 NestJS 项目，介绍常用的 Nest 内置模块，还会解锁一些 NestJS 的高级特性和最佳实践，来帮助你更好地理解和应用这个强大的 Node.js 框架。无论你是一个初学者还是有经验的开发者，这篇文章都将为你提供宝贵的见解和实用的技巧，让你能够更加了解 NestJS。 我将从 GitHub 上的 Awesome NestJS 列表中选取优秀项目进行分析，看它们如何使用 NestJS 的各种功能和模块。 此外，我还将详细介绍一些常用的 Nest 内置模块，如...
// 后端
