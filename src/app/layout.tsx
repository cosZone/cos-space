import Root from '@/components/layout/root';
import { seoConfig } from '@/constants';
import { fontVariants } from '@/constants/font';
import clsx from 'clsx';
import '@/styles/globals.css';
import { ClerkProvider } from '@clerk/nextjs';

type Props = {
  children: React.ReactNode;
};

export const metadata = {
  metadataBase: seoConfig.url,

  title: seoConfig.title,
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  openGraph: {
    title: {
      default: seoConfig.title,
    },
    description: seoConfig.description,
    siteName: `${seoConfig.title}`,
    locale: 'zh_CN',
    type: 'website',
    url: seoConfig.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.title,
    description: seoConfig.description,
  },
};

export default async function RootLayout(props: Props) {
  const { children } = props;
  return (
    <ClerkProvider>
      <html lang="zh-CN">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={clsx('vertical-scrollbar m-0 h-full p-0', ...fontVariants)}>
          <Root>{children}</Root>
        </body>
      </html>
    </ClerkProvider>
  );
}
