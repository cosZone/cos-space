import { springScrollTo } from '@/lib/scroller';
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackTop: React.FC = () => {
  const handleBackTop = () => {
    springScrollTo(0);
  };

  return (
    <div onClick={handleBackTop} className="cursor-pointer px-2.5 py-4 group-hover:text-primary md:p-4">
      <FaArrowUp />
    </div>
  );
};

export default BackTop;
