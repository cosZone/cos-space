import { PropsWithChildren } from 'react';

export default function DashboardLayout({ children }: PropsWithChildren<{}>) {
  return <div className="mx-auto flex flex-col p-4 2xl:container">{children}</div>;
}
