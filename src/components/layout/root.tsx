'use client';

import { fontVariants } from '@/constants/font';
import clsx from 'clsx';
import { Footer } from './footer';
import { Header } from './header';
import { ThemeProvider } from 'next-themes';
import FloatGroup from '../widgets/global/FloatGroup';

export default function Root({ children }: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider attribute="class">
      <div className={clsx('dark:bg-gradient-dark flex min-h-screen flex-col bg-gradient text-black dark:text-white')}>
        <Header />
        <FloatGroup />
        <main className="relative flex flex-grow flex-col">
          {children}
          <Footer className="mt-auto" />
        </main>
      </div>
    </ThemeProvider>
  );
}
