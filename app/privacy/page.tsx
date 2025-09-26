export const dynamic = "force-static";
import StaticPage from "@/app/components/Static/StaticPage";
export const metadata = { title: "Политика приватности — ECHO" };
export default function Page(){
  return (
    <StaticPage title="Политика приватности">
      <p>Эта страница статическая, рендерится один раз при сборке и грузится мгновенно.</p>
      <p>Здесь будет развернутый текст о разделе «Политика приватности» с аккуратной типографикой.</p>
    </StaticPage>
  );
}
