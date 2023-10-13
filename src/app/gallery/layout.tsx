import { PropsWithChildren } from 'react';

export default function GalleryLayout({ children }: PropsWithChildren<{}>) {
  return <div className="mx-auto flex w-full flex-col gap-12 p-4 2xl:container">{children}</div>;
}
