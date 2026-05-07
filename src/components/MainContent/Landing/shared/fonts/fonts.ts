import localFont from 'next/font/local';
import { Sora } from 'next/font/google';

export const sora = Sora({
    subsets: ['latin'],
    variable: '--font-sora',
    display: 'swap',
});

export const momoSignature = localFont({
    src: '../../../../../../public/fonts/MomoSignature-Regular.ttf',
    variable: '--font-momo',
    display: 'swap',
});
