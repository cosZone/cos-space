// edit https://github.com/lawvs/lawvs.github.io/blob/dba2e51e312765f8322ee87755b4e9c22b520048/src/pages/rss.xml.ts
import rss from '@astrojs/rss';
import { siteConfig } from '@constants/site-config';
import { getSortedPosts } from '@lib/content';
import type { APIContext } from 'astro';
import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';
import type { BlogPost } from 'types/blog';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
  const posts = await getSortedPosts();
  const { site } = context;

  if (!site) {
    throw new Error('Missing site metadata');
  }
  return rss({
    title: siteConfig.title,
    description: siteConfig.subtitle || 'No description',
    site,
    trailingSlash: false,
    stylesheet: '/rss/pretty-feed-v3.xsl', // https://docs.astro.build/en/recipes/rss/#adding-a-stylesheet
    items: posts
      .map((post: BlogPost) => {
        return {
          title: post.data.title,
          pubDate: post.data.date,
          description: post.data.description || '',
          link: `/post/${post.data.link ?? post.slug}`,
          content: sanitizeHtml(parser.render(post.body), {
            // https://stackoverflow.com/questions/12229572/php-generated-xml-shows-invalid-char-value-27-message
            textFilter: (text, tagName) =>
              text.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, ''),
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
          }),
        };
      })
      .slice(0, 20),
  });
}
