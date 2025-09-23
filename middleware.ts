import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // 1) сли пришли по магик-ссылке типа /?code=..., редиректим на /auth/callback
  if (url.searchParams.has("code")) {
    const to = new URL("/auth/callback", url.origin);
    to.search = url.search; // переносим все параметры (?code=..., etc.)
    return NextResponse.redirect(to);
  }

  // 2) наче — обычное обновление auth-куков
  const res = NextResponse.next();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => req.cookies.get(name)?.value,
        set: (name: string, value: string, options: any) => res.cookies.set({ name, value, ...options }),
        remove: (name: string, options: any) => res.cookies.set({ name, value: "", ...options, maxAge: 0 }),
      },
    }
  );
  await supabase.auth.getUser();
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sw.js).*)"],
};
