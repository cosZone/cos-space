import Cover from '@/components/ui/cover';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Cover />
      <div className="mx-auto flex w-full flex-col gap-12 p-4 2xl:container">{children}</div>
    </>
  );
}
