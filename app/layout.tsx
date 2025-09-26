import "@/styles/styles.css";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "ECHO  Послания в будущее",
  description: "Послания после жизни. Dead-Man Switch и доставка сообщений тем, кому это будет нужно.",
  metadataBase: new URL("https://echoproject.space"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-dvh bg-background text-text antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2">
          Пропустить к содержимому
        </a>
        <Header />
        <main id="main" className="min-h-[60dvh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
