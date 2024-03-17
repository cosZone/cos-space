import { cn } from '@/lib/utils';
import { TbExternalLink } from 'react-icons/tb';
import Tooltip from '../../tooltip';

interface LinkProps {
  className?: string;
  href?: string;
  title?: string;
  children: React.ReactNode;
}

export const MLink = (props: LinkProps) => {
  const { children, className, href, ...rest } = props;

  return (
    <Tooltip title={<p className="shadow-card-darker max-w-lg truncate">{href}</p>}>
      <a
        href={href}
        target="_blank"
        className={cn(
          'not-prose after:contents-[""] relative text-blue-500 after:absolute after:-bottom-1 after:left-1/2 after:block after:h-0.5 after:w-0 after:origin-center after:bg-blue-500 after:transition-[width_0.3s_ease_0s,left_0.3s_ease_0s] hover:after:left-0 hover:after:w-full',
          className,
        )}
        {...rest}
      >
        {children}
        <TbExternalLink className="-mt-0.5 ml-0.5 inline-block align-middle" />
      </a>
    </Tooltip>
  );
};
