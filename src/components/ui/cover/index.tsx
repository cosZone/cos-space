'use client';

import { defaultCoverList, siteConfig } from '@/constants/site-config';
import { useCallback, useEffect, useState } from 'react';
import WaveSvg from './wave';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { PostData, PostMetaData } from '@/lib/api/type';
import { FaCalendarDays, FaPenNib } from 'react-icons/fa6';
import { parseDate } from '@/lib/datetime';
import readingTime from 'reading-time';
import matter from 'gray-matter';
import { BiSolidTimeFive } from 'react-icons/bi';

type CoverProps = {
  postData?: PostData;
  covers?: string[];
};

const coverImageVariants = {
  hidden: { scale: 1, opacity: 0 },
  visible: { scale: 1.2, opacity: 1, transition: { duration: 8 } },
  exit: { scale: 1.3, opacity: 0, transition: { duration: 2 } },
};
3;
export default function Cover({ postData, covers = defaultCoverList }: CoverProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % covers.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [covers, current]);

  const renderContent = useCallback(() => {
    if (postData) {
      const { title, createdAt, content } = postData;
      const parsedData = matter(content ?? '');
      const readState = readingTime(parsedData?.content ?? ''); // TODO: standardize add readState to postDataWrapped

      return (
        <>
          <h1 className="shadow-text text-4.5xl font-bold">{title}</h1>
          <p className="flex items-center justify-center gap-4">
            <span className="flex items-center gap-1">
              <FaCalendarDays />
              发表于 {parseDate(createdAt, 'YYYY-MM-DD')}
            </span>
            <span className="flex items-center gap-1">
              <FaPenNib /> {readState?.words} 字
            </span>
            <span className="flex items-center gap-1">
              <BiSolidTimeFive /> {readState?.text}
            </span>
          </p>
        </>
      );
    }
    return (
      <>
        <h2 className="shadow-text font-fg text-5xl">{siteConfig?.alternate}</h2>
        <h1 className="shadow-text text-4.5xl font-bold">{siteConfig?.title}</h1>
        <p className="shadow-text text-sm">= {siteConfig?.subtitle} =</p>
      </>
    );
  }, []);

  return (
    <div className="relative -z-10 flex h-[60vh] max-h-[35rem] overflow-hidden">
      <div className="absolute inset-0 h-full bg-black/40" />
      <div className="absolute inset-0 z-10 -mt-10 flex flex-col items-center justify-center gap-3 text-white">
        {renderContent()}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div
          key={covers[current]}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={coverImageVariants}
          className="-z-10 h-full min-h-[15rem] w-full"
        >
          <Image
            className="-z-10 h-full min-h-[15rem] w-full select-none object-cover"
            draggable={false}
            src={covers[current]}
            alt=""
            fill
          />
        </motion.div>
      </AnimatePresence>
      <WaveSvg />
    </div>
  );
}
