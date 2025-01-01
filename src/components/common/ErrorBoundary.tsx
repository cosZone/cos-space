'use client';

import type { FC, PropsWithChildren } from 'react';
import { ErrorBoundary as ErrorBoundaryLib } from 'react-error-boundary';
import { HiOutlineMail } from 'react-icons/hi';
import { Button } from '../ui/button';

const FallbackComponent = () => {
  return (
    <div className="flex-center-y w-full gap-2 py-6">
      Oops, Something wrong! Please contract to{' '}
      <a href="mailto:i@cosine.ren" className="flex-center gap-1 text-blue-500">
        <HiOutlineMail /> i@cosine.ren
      </a>
      or
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Reload Page
      </Button>
    </div>
  );
};
export const ErrorBoundary: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundaryLib
      FallbackComponent={FallbackComponent}
      onError={(e) => {
        console.error(e);
      }}
    >
      {children}
    </ErrorBoundaryLib>
  );
};
