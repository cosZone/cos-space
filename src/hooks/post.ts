import { useMemo } from 'react';
import readingTime, { type ReadTimeResults } from 'reading-time';

export const useReadTime = (text?: string): ReadTimeResults | null => {
  const stats = useMemo(() => {
    if (!text) return null;
    return readingTime(text ?? '');
  }, [text]);

  return stats;
};
