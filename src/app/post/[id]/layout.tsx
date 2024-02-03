import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<{}>) {
  return <div className="mx-auto flex w-full flex-col">{children}</div>;
}
