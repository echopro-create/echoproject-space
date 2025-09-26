export const dynamic = 'force-static';
export const metadata = { title: 'Вход — ECHO' };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight md:text-3xl">Вход</h1>
      <form className="space-y-4">
        <label className="block">
          <span className="mb-1 block text-sm">Email</span>
          <input className="h-control w-full rounded-xl border px-3" placeholder="you@example.com" />
        </label>
        <button type="button" className="h-control w-full rounded-xl border px-4 font-medium">
          Продолжить
        </button>
      </form>
      <p className="mt-4 text-sm text-neutral-600">
        Это заглушка формы входа. Без бэкенда. Вёрстка устойчива и проверена на экстремальный ввод.
      </p>
    </div>
  );
}
