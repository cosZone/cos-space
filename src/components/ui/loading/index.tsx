import { cn } from '@lib/utils';
import type { ReactNode } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export type LoadingProps = {
  /** 显示与否 */
  show?: boolean;
  /** 自定义Loading图标 */
  renderIcon?: () => ReactNode;
  /** 旋转容器额外的 CSS className */
  className?: string;
  /** 旋转容器额外的 CSS style */
  style?: React.CSSProperties;
  /** 图标额外的 CSS className */
  iconClassName?: string;
  /** 图标容器额外的 CSS style */
  iconStyle?: React.CSSProperties;
};

const Loading = ({ show = true, renderIcon, className, style, iconClassName, iconStyle }: LoadingProps) => {
  const _renderIcon = (): ReactNode => {
    if (renderIcon) return renderIcon();
    return <AiOutlineLoading3Quarters className={cn('h-full w-full', iconClassName)} style={iconStyle} />;
  };
  return (
    <>
      {show ? (
        <div className={cn('inline-block animate-spin text-base', className)} style={style}>
          {_renderIcon()}
        </div>
      ) : null}
    </>
  );
};
export default Loading;
