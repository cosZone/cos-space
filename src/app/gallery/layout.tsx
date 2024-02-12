import Cover from '@/components/ui/cover';
import { PropsWithChildren } from 'react';

export default function GalleryLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Cover />
      <div className="mx-auto flex w-full flex-col p-4">{children}</div>
    </>
  );
}
