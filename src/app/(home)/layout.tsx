import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return <div className="mx-auto 2xl:container">{children}</div>;
}
