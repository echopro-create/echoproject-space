import StaticPage from "@/app/components/Static/StaticPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Политика конфиденциальности  ECHO",
  description: "Политика конфиденциальности  ECHO",
};

export default function Page() {
  return (
    <StaticPage title="Политика конфиденциальности">
      <p>Кратко и по делу: как храним и защищаем данные.</p>
    </StaticPage>
  );
}
