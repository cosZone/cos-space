'use client';

import FloatGroup from '../widgets/global/FloatGroup';
import { Footer } from './footer';
import { Header } from './header';

export default function Root({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="flex min-h-screen flex-col text-black dark:text-white">
      <Header />
      <FloatGroup />
      <main className="relative flex flex-grow flex-col">{children}</main>
      <Footer className="mt-auto" />
    </div>
  );
}
