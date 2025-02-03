import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export default function Divider({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center', className)}>
      <span className="bg-foreground/40 h-px grow" />
      {children ? <h1 className="text-foreground/40 mx-4 text-2xl font-bold tracking-widest">{children}</h1> : null}
      <span className="bg-foreground/50 h-px grow" />
    </div>
  );
}
