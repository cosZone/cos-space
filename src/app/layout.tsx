import Root from '@/components/layout/root';
import { fontVariants } from '@/constants/font';
import { cn } from '@/lib/utils';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
import Providers from './providers';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import { seoConfig } from '@/constants/site-config';

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
      <html lang="zh-CN" suppressHydrationWarning>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600;700&display=swap" rel="stylesheet" />
        </head>
        <body className={cn('vertical-scrollbar m-0 h-full overscroll-none p-0', ...fontVariants)}>
          <Providers>
            <Root>{children}</Root>
          </Providers>
          <ToastContainer />
        </body>
      </html>
    </ClerkProvider>
  );
}
