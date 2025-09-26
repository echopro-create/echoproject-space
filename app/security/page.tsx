export const dynamic = "force-static";
import StaticPage from "@/app/components/Static/StaticPage";
export const metadata = { title: "Безопасность — ECHO" };
export default function Page(){
  return (
    <StaticPage title="Безопасность">
      <p>Эта страница статическая, рендерится один раз при сборке и грузится мгновенно.</p>
      <p>Здесь будет развернутый текст о разделе «Безопасность» с аккуратной типографикой.</p>
    </StaticPage>
  );
}
