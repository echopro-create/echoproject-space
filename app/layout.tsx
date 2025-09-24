import MobileNav from './components/MobileNav';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin','cyrillic'], display: 'swap' });
    param($m)
    $imports = $m.Value
    return $imports + "`r`n" + $interDecl + "`r`n"
  

export const metadata: Metadata = {
  title: "ECHO  Р СџР С•РЎРѓР В»Р В°Р Р…Р С‘РЎРЏ Р С—Р С•РЎРѓР В»Р Вµ Р В¶Р С‘Р В·Р Р…Р С‘",
  description:
    "Р вЂ”Р В°Р С—Р С‘РЎв‚¬Р С‘РЎвЂљР Вµ Р Р†Р В°Р В¶Р Р…РЎвЂ№Р Вµ РЎРѓР В»Р С•Р Р†Р В°  ECHO Р С—Р ВµРЎР‚Р ВµР Т‘Р В°РЎРѓРЎвЂљ Р С‘РЎвЂ¦ РЎвЂљР ВµР С, Р С”РЎвЂљР С• Р Т‘Р С•РЎР‚Р С•Р С–, Р Р† Р Р…РЎС“Р В¶Р Р…РЎвЂ№Р в„– Р СР С•Р СР ВµР Р…РЎвЂљ: Р С—Р С• Р Т‘Р В°РЎвЂљР Вµ, Р С—Р С• РЎРѓР С•Р В±РЎвЂ№РЎвЂљР С‘РЎР‹ Р С‘Р В»Р С‘ Р С—Р С•РЎРѓР В»Р Вµ РЎС“РЎвЂ¦Р С•Р Т‘Р В°.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className="light">
      <head><meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="{${inter.className}}">`r`n        <a href="#main" className="skip-link">Перейти к содержимому</a>
        <header className="header">
          <div className="container">
            <Link href="/" className="logo">ECHO</Link>
          </div>
        </header>

        <main>{children}</main>

        <MobileNav />
        <footer className="footer" />
      </body>
    </html>
  );
}


