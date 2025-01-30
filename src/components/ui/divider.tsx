import { cn } from '@lib/utils';
import type { ReactNode } from 'react';

export default function Divider({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center', className)}>
      <span className="h-px flex-grow bg-foreground/40" />
      {children ? <h1 className="mx-4 text-2xl font-bold tracking-widest text-foreground/40">{children}</h1> : null}
      <span className="h-px flex-grow bg-foreground/50" />
    </div>
  );
}
