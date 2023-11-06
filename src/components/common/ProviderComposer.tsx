'use client';

import { FC, ReactElement, cloneElement } from 'react';

type ProviderComposerProps = {
  contexts: JSX.Element[];
  children: ReactElement;
};
export const ProviderComposer: FC<ProviderComposerProps> = ({ contexts, children }) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return cloneElement(parent, { children: kids });
  }, children);
};
