import Cover from '@/components/ui/cover';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="flex flex-col">
      <Cover />
      {children}
    </div>
  );
}
