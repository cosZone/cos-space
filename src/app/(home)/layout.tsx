import Cover from '@/components/ui/cover';
import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return (
    <div className="mb-20 flex flex-col">
      <Cover />
      {children}
    </div>
  );
}
