'use client';

import { useIsMounted } from '@/hooks/useIsMounted';
import { PropsWithChildren } from 'react';

export const ClientOnly = (props: PropsWithChildren) => {
  const isMounted = useIsMounted();
  if (!isMounted) return null;
  return <>{props.children}</>;
};
