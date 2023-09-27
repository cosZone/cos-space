import { Poppins } from 'next/font/google';

export const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-poppins' });

export const fontVariants = [poppins.className, poppins.variable];
