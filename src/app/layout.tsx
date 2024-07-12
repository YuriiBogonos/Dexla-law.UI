import type { Metadata } from 'next';

import Header from '@/components/Header/Header';

import './globals.css';

export const metadata: Metadata = {
  title: 'Next App',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='h-full'>
      <body className='h-full overflow-hidden'>
        <Header />
        <main className='h-full'>{children}</main>
      </body>
    </html>
  );
}
