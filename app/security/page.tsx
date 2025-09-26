import StaticPage from "@/app/components/Static/StaticPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Безопасность  ECHO",
  description: "Безопасность  ECHO",
};

export default function Page() {
  return (
    <StaticPage title="Безопасность">
      <p>Архитектура, шифрование и практика. Без маркетинговой пены.</p>
    </StaticPage>
  );
}
