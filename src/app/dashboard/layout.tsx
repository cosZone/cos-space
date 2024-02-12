import Cover from '@/components/ui/cover';
import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col">
      <Cover />
      {children}
    </div>
  );
}
