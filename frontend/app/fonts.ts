import { Inter, M_PLUS_1p, M_PLUS_Rounded_1c } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

// 本文・見出し用。丸ゴシックで親しみやすく、日本語が読みやすい。
export const bodyFont = M_PLUS_Rounded_1c({
  weight: ['400', '500', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const logoFont = M_PLUS_1p({
  weight: ['700', '800'],
  subsets: ['latin'],
});
