import { type ClassValue, clsx } from 'clsx';
import sanitizeHtml from 'sanitize-html';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSanitizeHtml = (html: string) => {
  return sanitizeHtml(html, {
    // https://stackoverflow.com/questions/12229572/php-generated-xml-shows-invalid-char-value-27-message
    textFilter: (text) => text.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, ''),
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  });
};
