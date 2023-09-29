import { PropsWithChildren } from 'react';

export default function AboutLayout({ children }: PropsWithChildren<{}>) {
  return <div className="mx-auto flex flex-col gap-12 p-4 2xl:container">{children}</div>;
}
