import StaticPage from "@/app/components/Static/StaticPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Контакты  ECHO",
  description: "Контакты  ECHO",
};

export default function Page() {
  return (
    <StaticPage title="Контакты">
      <p>Связаться можно через форму или email. Тут будет форма.</p>
    </StaticPage>
  );
}
