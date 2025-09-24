export const metadata = {
  title: "ECHO — ослания после жизни",
  description: "апишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
  openGraph: {
    title: "ECHO",
    description: "апишите важные слова и отправьте их автоматически тогда, когда это действительно нужно.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}