import type { HomeSiderSegmentType } from '@constants/enum';
import { HomeSiderSegmentType as SegmentTypeEnum } from '@constants/enum';
import { homeSiderSegmentType } from '@store/app';
import { Segmented, type OptionType } from '@components/ui/segmented';
import React from 'react';
import { RiDashboard3Line, RiListOrdered2, RiArticleLine } from 'react-icons/ri';

type HomeSiderSegmentedProps = {
  defaultValue?: HomeSiderSegmentType; // 默认值
  className?: string;
  indicateClass?: string;
  itemClass?: string;
  id?: string;
  value?: HomeSiderSegmentType; // 受控
};

export const HomeSiderSegmented = (props: HomeSiderSegmentedProps) => {
  const options: OptionType<HomeSiderSegmentType>[] = [
    {
      label: '站点概览',
      value: SegmentTypeEnum.INFO,
      icon: RiDashboard3Line,
    },
    {
      label: '文章目录',
      value: SegmentTypeEnum.DIRECTORY,
      icon: RiListOrdered2,
    },
    {
      label: '系列文章',
      value: SegmentTypeEnum.SERIES,
      icon: RiArticleLine,
    },
  ];

  return (
    <Segmented<HomeSiderSegmentType>
      {...props}
      options={options}
      className={
        props.className ??
        'flex w-fit cursor-pointer rounded-sm bg-black/[0.08] p-1 text-xs font-semibold backdrop-blur-lg select-none'
      }
      onChange={(value) => homeSiderSegmentType.set(value)}
    />
  );
};

HomeSiderSegmented.displayName = 'HomeSiderSegmented';
export default React.memo(HomeSiderSegmented);
