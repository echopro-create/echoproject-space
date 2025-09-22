export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  try {
    const res = await fetch(`${url}/auth/v1/health`, {
      headers: { apikey: key! },
      cache: "no-store",
    });
    const ok = res.ok;
    return new Response(ok ? "supabase: OK" : `supabase: FAIL ${res.status}`, {
      status: ok ? 200 : 500,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch (e:any) {
    return new Response(`supabase: ERROR ${e?.message ?? e}`, { status: 500 });
  }
}
