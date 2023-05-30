import './styles/globals.css';
import { Teko, Kumbh_Sans } from 'next/font/google';

const teko = Teko({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-teko',
});

const kumbhSans = Kumbh_Sans({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kumbh-sans',
});

export const metadata = {
  title: 'Weatherly - Weather App',
  description: 'View the weather in your city',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={` ${teko.variable} ${kumbhSans.variable}`}>
      <body className='bg-sky-100'>{children}</body>
    </html>
  );
}
