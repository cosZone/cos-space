import { useState, useCallback } from 'react';

export enum ImageStatus {
  Loading = 'LOADING',
  Loaded = 'LOADED',
  Error = 'ERROR',
}

export type ImageLoadState = {
  status: ImageStatus;
  onImageLoaded: () => void;
  onImageError: () => void;
  resetImageState: () => void;
};

function useImageLoadState(): ImageLoadState {
  const [status, setStatus] = useState<ImageStatus>(ImageStatus.Loading);

  const onImageLoaded = useCallback(() => {
    setStatus(ImageStatus.Loaded);
  }, []);

  const onImageError = useCallback(() => {
    setStatus(ImageStatus.Error);
  }, []);

  const resetImageState = useCallback(() => {
    setStatus(ImageStatus.Loading);
  }, []);

  return {
    status,
    onImageLoaded,
    onImageError,
    resetImageState,
  };
}

export default useImageLoadState;
