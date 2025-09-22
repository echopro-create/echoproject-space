export const dynamic = "force-static";
export default function Health(){
  return (
    <main className="p-8 text-center space-y-4">
      <div>OK ✓</div>
      <a className="underline" href="/api/supa" target="_blank" rel="noreferrer">роверить Supabase</a>
    </main>
  );
}
