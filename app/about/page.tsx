import StaticPage from "@/app/components/Static/StaticPage";

export const dynamic = "force-static";

export const metadata = {
  title: "О проекте  ECHO",
  description: "О проекте  ECHO",
};

export default function Page() {
  return (
    <StaticPage title="О проекте">
      <p>Почему ECHO существует и что мы пытаемся сделать лучше.</p>
    </StaticPage>
  );
}
