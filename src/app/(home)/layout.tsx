import { PropsWithChildren } from 'react';

export default function HomeLayout({ children }: PropsWithChildren<{}>) {
  return <div className="flex flex-col">{children}</div>;
}
