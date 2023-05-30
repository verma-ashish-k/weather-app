import './globals.css';
import { Montserrat, Teko, Kumbh_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const teko = Teko({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-teko',
});

const kumbhSans = Kumbh_Sans({
  weight: ['100', '400', '500', '600', '700', '800'],
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
    <html
      lang='en'
      className={`${montserrat.variable} ${teko.variable} ${kumbhSans.variable}`}
    >
      <body className='bg-sky-50'>{children}</body>
    </html>
  );
}
