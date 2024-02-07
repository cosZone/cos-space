import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

export default function Divider({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <div className={cn('flex items-center', className)}>
      <span className="h-px flex-grow bg-muted-foreground/50" />
      {children ? <h1 className="mx-4 text-2xl font-bold tracking-widest text-muted-foreground/50">{children}</h1> : null}
      <span className="h-px flex-grow bg-muted-foreground/50" />
    </div>
  );
}
