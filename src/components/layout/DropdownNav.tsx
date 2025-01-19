import { useState } from 'react';
import { type Router } from '@constants/router';
import { cn } from '@lib/utils';
import { Icon } from '@iconify/react';
import Popover from '@components/ui/popover';

interface DropdownNavProps {
  item: Router;
  className?: string;
}

export default function DropdownNav({ item, className }: DropdownNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { name, icon, children } = item;

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
      trigger="hover"
      render={() => (
        <div className="nav-dropdown flex flex-col items-center">
          {children?.length &&
            children.map((child: Router, index) => (
              <a
                key={child.path}
                href={child.path}
                className={cn(
                  'group px-4 py-2 text-base outline-none transition-colors duration-300 hover:bg-gradient-shoka-button',
                  {
                    'rounded-ss-2xl': index === 0,
                    'rounded-ee-2xl': index === children.length - 1,
                  },
                )}
              >
                <div className="flex items-center gap-2 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-muted">
                  {child.icon && <Icon icon={child.icon} className="size-4" />}
                  {child.name}
                </div>
              </a>
            ))}
        </div>
      )}
    >
      <button
        className={cn(
          'inline-flex h-10 items-center px-4 py-2 text-base tracking-wider',
          'relative after:absolute after:bottom-1 after:left-1/2 after:h-0.5 after:w-0',
          'after:-translate-x-1/2 after:bg-white after:transition-all after:duration-300 after:content-[""]',
          className,
        )}
      >
        {icon && <Icon icon={icon} className="mr-1.5" />}
        {name}
        <Icon
          icon="ri:arrow-drop-down-fill"
          className={cn('absolute -right-1.5 size-6 transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </button>
    </Popover>
  );
}
