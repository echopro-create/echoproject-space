export const dynamic = "force-static";
import { Card } from "@/app/components/UI/Card";
import Link from "next/link";
export const metadata = { title: "Послания — ECHO" };
export default function MessagesPage(){
  return (
    <section className="container py-12">
      <h1 className="text-2xl font-semibold mb-4">Мои послания</h1>
      <Card className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Черновик #1</div>
            <div className="text-sm text-muted">Текстовое послание</div>
          </div>
          <Link href="/messages/new" className="px-4 py-2 rounded-2xl border border-border">Продолжить</Link>
        </div>
      </Card>
      <Link href="/messages/new" className="px-4 py-2 rounded-2xl bg-black text-white">Оставить послание</Link>
    </section>
  );
}
