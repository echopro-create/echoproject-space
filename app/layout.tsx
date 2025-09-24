import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AnonInit from './AnonInit';

export const metadata: Metadata = {
  title: 'ECHO - Послания, которые переживут вас',
  description: 'Сохраняйте важные письма и передавайте их, когда придёт время.',
  metadataBase: new URL('https://www.echoproject.space'),
  openGraph: {
    type: 'website',
    title: 'ECHO',
    url: 'https://www.echoproject.space'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="font-sans bg-white text-gray-900">
        <AnonInit />
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
