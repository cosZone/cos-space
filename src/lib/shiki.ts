import { createHighlighter, makeSingletonHighlighter } from 'shiki';
import { bundledLanguages } from 'shiki/bundle/web';

const getHighlighter = makeSingletonHighlighter(createHighlighter);

export const codeToHtml = async ({ code, lang, theme }: { code: string; lang: string; theme: string }) => {
  const highlighter = await getHighlighter({
    themes: ['github-light', 'github-dark'],
    langs: [...Object.keys(bundledLanguages)],
    langAlias: { 
      react: 'tsx',
    },
  });

  return highlighter.codeToHtml(code, {
    lang: lang,
    theme,
  });
};
