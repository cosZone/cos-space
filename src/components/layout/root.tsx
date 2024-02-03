'use client';

import FloatGroup from '../widgets/global/FloatGroup';
import { Footer } from './footer';
import { Header } from './header';

export default function Root({ children }: React.PropsWithChildren<{}>) {
  return (
    <div className="dark:bg-gradient-dark flex min-h-screen flex-col bg-gradient text-black dark:text-white">
      <Header />
      <FloatGroup />
      <main className="relative flex flex-grow flex-col">
        {children}
        <Footer className="mt-auto" />
      </main>
    </div>
  );
}
