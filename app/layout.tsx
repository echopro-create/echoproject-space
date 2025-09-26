// app/layout.tsx
import './styles/styles.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { getCSP } from '../lib/csp'; 
import { Header } from './components/Header'; 
import { Footer } from './components/Footer'; 

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

// --- SEO/OG ---
export const metadata = {
  title: {
    default: 'ECHO 2.0  Послания в будущее',
    template: '%s | ECHO 2.0',
  },
  description: 'ECHO  сервис посланий, которые доставляются адресатам в будущем, в том числе после смерти отправителя. Начните писать своё послание сегодня.',
  metadataBase: new URL('https://echoproject.space'),
  openGraph: {
    title: 'ECHO 2.0  Послания в будущее',
    description: 'ECHO  сервис посланий, которые доставляются адресатам в будущем, в том числе после смерти отправителя.',
    url: 'https://echoproject.space',
    siteName: 'ECHO 2.0',
    images: [{ url: '/og_image.jpg', width: 1200, height: 630, alt: 'ECHO Project', }],
    locale: 'ru_RU',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Установка CSP заголовка
  const nonce = headers().get('x-nonce') ?? '';
  const cspHeader = getCSP(nonce);

  return (
    <html lang='ru' className={inter.className}>
      <head>
        <meta charSet='utf-8' /> 
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='Content-Security-Policy' content={cspHeader} />
      </head>
      <body className='bg-white text-primary-text min-h-screen flex flex-col pt-16' style={{ scrollPaddingTop: '4rem' }}>
        <Header />
        <main className='flex-grow'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
export const runtime = 'edge';
