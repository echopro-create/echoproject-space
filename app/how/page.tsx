import StaticPage from "@/app/components/Static/StaticPage";

export const dynamic = "force-static";

export const metadata = {
  title: "Как работает ECHO  ECHO",
  description: "Как работает ECHO  ECHO",
};

export default function Page() {
  return (
    <StaticPage title="Как работает ECHO">
      <p>Здесь будет подробное объяснение DMS и доставки посланий.</p>
    </StaticPage>
  );
}
