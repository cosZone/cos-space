import { springScrollTo } from '@/lib/scroller';
import { cn } from '@/lib/utils';
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const ToBottom = ({ className }: { className?: string }) => {
  const handleToBottom = () => {
    springScrollTo('bottom');
  };

  return (
    <div onClick={handleToBottom} className={cn('cursor-pointer px-2.5 py-1.5 group-hover:text-primary md:px-4', className)}>
      <FaArrowDown />
    </div>
  );
};

export default ToBottom;
