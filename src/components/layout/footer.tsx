'use client';

import { twMerge } from 'tailwind-merge';

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={twMerge('flex items-center justify-center gap-2 py-1 text-sm', className)}>
      Powered by{' '}
      <a className="text-blue-400" href="https://github.com/yusixian">
        cosine
      </a>
    </footer>
  );
}
