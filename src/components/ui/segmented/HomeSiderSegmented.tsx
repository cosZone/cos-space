import type { HomeSiderSegmentType } from '@constants/enum';
import { homeSiderSegmentType } from '@store/app';
import { Segmented, type OptionType } from '@components/ui/segmented';
import React from 'react';

type HomeSiderSegmentedProps = {
  options: OptionType<HomeSiderSegmentType>[]; // 选项
  defaultValue?: HomeSiderSegmentType; // 默认值
  className?: string;
  indicateClass?: string;
  itemClass?: string;
  id?: string;
  value?: HomeSiderSegmentType; // 受控
};

export const HomeSiderSegmented = (props: HomeSiderSegmentedProps) => {
  return (
    <Segmented<HomeSiderSegmentType>
      {...props}
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
