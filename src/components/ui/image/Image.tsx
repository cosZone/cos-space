import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

export enum ImageLoadStatus {
  Loading = 'loading',
  Loaded = 'loaded',
  Error = 'error',
}

export type ImageProps = {
  src: string;
  alt?: string;
  width: number;
  height: number;
  className?: string;
};

export default function Image({ src, alt, width, height, className }: ImageProps) {
  const [loadStatus, setLoadStatus] = useState<ImageLoadStatus>(ImageLoadStatus.Loading);

  return (
    <div
      className={clsx('relative', className, {
        'bg-gray-200': loadStatus === ImageLoadStatus.Loading,
      })}
      style={{ width, height }}
    >
      {loadStatus === ImageLoadStatus.Loading && <div className="absolute inset-0 animate-pulse bg-gray-200"></div>}
      {loadStatus === ImageLoadStatus.Loaded && (
        <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
      )}
      {loadStatus === ImageLoadStatus.Error && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500">Error loading image</div>
      )}
    </div>
  );
}
