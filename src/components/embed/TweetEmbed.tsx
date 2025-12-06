/**
 * Tweet embed component using react-tweet
 * Provides a lightweight, theme-aware Twitter/X embed
 */

import { Tweet } from 'react-tweet';
import { useEffect, useState } from 'react';

interface TweetEmbedProps {
  tweetId: string;
}

export function TweetEmbed({ tweetId }: TweetEmbedProps) {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setMounted(true);

    // Read theme from document
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };

    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <div className="my-6 flex justify-center" aria-busy="true" aria-label="正在加载 Tweet">
        <div className="bg-muted/50 w-full max-w-[550px] animate-pulse rounded-xl p-4">
          <div className="mb-2 flex items-center gap-2">
            <div className="bg-muted h-12 w-12 rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="bg-muted h-4 w-32 rounded"></div>
              <div className="bg-muted h-3 w-24 rounded"></div>
            </div>
          </div>
          <div className="bg-muted mt-4 h-20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="not-prose my-6 flex justify-center" data-theme={theme}>
      <Tweet id={tweetId} />
    </div>
  );
}

export default TweetEmbed;
