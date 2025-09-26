export const dynamic = "force-static";
import StaticPage from "@/app/components/Static/StaticPage";
export const metadata = { title: "Условия использования — ECHO" };
export default function Page(){
  return (
    <StaticPage title="Условия использования">
      <p>Эта страница статическая, рендерится один раз при сборке и грузится мгновенно.</p>
      <p>Здесь будет развернутый текст о разделе «Условия использования» с аккуратной типографикой.</p>
    </StaticPage>
  );
}
