'use client';

import { fontVariants } from '@/constants/font';
import clsx from 'clsx';
import { Footer } from './footer';
import { Header } from './header';
import { ThemeProvider } from 'next-themes';

export default function Root({ children }: React.PropsWithChildren<{}>) {
  return (
    <ThemeProvider attribute="class">
      <div
        className={clsx(
          'dark:bg-gradient-dark vertical-scrollbar flex min-h-screen flex-col bg-gradient text-black dark:text-white',
        )}
      >
        <Header />
        <main className="relative flex flex-col">
          {children}
          <Footer className="mt-auto" />
        </main>
      </div>
    </ThemeProvider>
  );
}
