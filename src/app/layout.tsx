import Root from '@/components/layout/root';
import { fontVariants } from '@/constants/font';
import clsx from 'clsx';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout(props: Props) {
  const { children } = props;
  // const shareImage = ''
  return (
    <html lang="zh-CN">
      <head>
        <title>Cos Space</title>
        <meta name="keywords" content="cos, cosine, React, Tailwind, cos_blogs, 博客, 个人空间, 技术, cos-space" />
        <meta
          name="description"
          content="cosSpace 是基于 Next.js (App Router)、Typescript、React 和 Tailwind 开发的个人空间，是 cos_blogs 的重构版，为用户提供同时拥有博客和个人空间的平台。"
        />
        <meta property="og:title" content="Cos Space" key="title" />
        <meta
          property="og:keywords"
          content="cos, cosine, React, Tailwind, cos_blogs, 博客, 个人空间, 技术, cos-space"
          key="keywords"
        />
        <meta
          property="og:description"
          content="cosSpace 是基于 Next.js (App Router)、Typescript、React 和 Tailwind 开发的个人空间，是 cos_blogs 的重构版，为用户提供同时拥有博客和个人空间的平台。"
          key="description"
        />
        <meta property="og:url" content="https://space.cosine.ren/" key="url" />
        {/* <meta property="og:image" content={shareImage} /> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Cos Space" />
        <meta
          name="twitter:description"
          content="cosSpace 是基于 Next.js (App Router)、Typescript、React 和 Tailwind 开发的个人空间，是 cos_blogs 的重构版，为用户提供同时拥有博客和个人空间的平台。"
        />
        {/* <meta name="twitter:image" content={shareImage} /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={clsx('vertical-scrollbar m-0 h-full p-0', ...fontVariants)}>
        <Root>{children}</Root>
      </body>
    </html>
  );
}
