export const dynamic = "force-static";
import StaticPage from "@/app/components/Static/StaticPage";
export const metadata = { title: "Как работает ECHO — ECHO" };
export default function Page(){
  return (
    <StaticPage title="Как работает ECHO">
      <p>Эта страница статическая, рендерится один раз при сборке и грузится мгновенно.</p>
      <p>Здесь будет развернутый текст о разделе «Как работает ECHO» с аккуратной типографикой.</p>
    </StaticPage>
  );
}
