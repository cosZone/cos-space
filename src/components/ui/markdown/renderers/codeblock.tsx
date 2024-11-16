import { codeToHtml } from '@/lib/shiki';
import { useTheme } from 'next-themes';
import { useLayoutEffect, useState } from 'react';

interface CodeBlockProps {
  id: string;
  className?: string;
  children: React.ReactNode;
}

export const MCodeBlock = (props: CodeBlockProps) => {
  const { children, className } = props;
  const [renderedHighLightHTML, setRenderedHighLightHTML] = useState<string>();
  const { theme } = useTheme();

  useLayoutEffect(() => {
    if (!className?.includes('lang-')) return;
    const lang = className.slice(5).toLocaleLowerCase();
    codeToHtml({
      code: children?.toString() ?? '',
      lang,
      theme: theme === 'light' ? 'github-light' : 'github-dark',
    }).then((html) => setRenderedHighLightHTML(html));
  }, [children, className, theme]);

  return renderedHighLightHTML ? (
    <div
      dangerouslySetInnerHTML={{
        __html: renderedHighLightHTML,
      }}
    />
  ) : (
    <span className="rounded-sm px-2 py-1 font-mono text-primary dark:bg-zinc-900">{children}</span>
  );
};
