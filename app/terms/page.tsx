import StaticPage from "@/app/components/Static/StaticPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Условия использования  ECHO",
  description: "Условия использования  ECHO",
};

export default function Page() {
  return (
    <StaticPage title="Условия использования">
      <p>Нормальный человеческий договор, без адвокатского шаманства.</p>
    </StaticPage>
  );
}
