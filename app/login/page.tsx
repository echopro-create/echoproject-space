export const dynamic = "force-static";
export const metadata = { title: "Вход — ECHO" };
export default function LoginPage(){
  return (
    <section className="container py-16 max-w-md">
      <h1 className="text-2xl font-semibold mb-4">Войти</h1>
      <p className="text-muted mb-4">Введите e-mail, мы пришлем код подтверждения.</p>
      <form className="space-y-3">
        <input type="email" required placeholder="you@example.com" className="w-full border border-border rounded-2xl p-3" />
        <button className="w-full px-5 py-3 rounded-2xl bg-black text-white">Отправить код</button>
      </form>
    </section>
  );
}
