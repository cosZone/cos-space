import { Noto_Serif_JP, Noto_Serif_SC, Poppins } from 'next/font/google';

export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
export const notoSerifJp = Noto_Serif_JP({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-notoSerifJp',
});
export const fontVariants = [poppins.variable, notoSerifJp.variable, 'font-default'];
