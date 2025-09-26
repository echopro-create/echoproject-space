import "../styles/styles.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ECHO',
  description: 'РџРѕСЃР»Р°РЅРёСЏ РІ Р±СѓРґСѓС‰РµРµ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}