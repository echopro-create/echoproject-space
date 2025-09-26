// middleware.ts
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

// Публичные и служебные роуты
const PUBLIC_ROUTES = [
  '/', 
  '/how', 
  '/security', 
  '/about', 
  '/privacy', 
  '/terms', 
  '/login',
  '/verify', 
  '/api/auth/otp', 
  '/api/auth/callback', 
];

// Приватные роуты
const PROTECTED_ROUTES = [
  '/messages',
  '/recipients',
  '/settings',
  '/me',
];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const urlPath = req.nextUrl.pathname;

  // 1. Если пользователь авторизован
  if (session) {
    if (urlPath === '/login') {
      return NextResponse.redirect(new URL('/messages', req.url));
    }
  } 
  // 2. Если пользователь не авторизован
  else {
    if (PROTECTED_ROUTES.some(route => urlPath.startsWith(route))) {
      const redirectUrl = new URL('/login', req.url);
      redirectUrl.searchParams.set('redirect_to', urlPath);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // 3. Для всех остальных случаев
  return res;
}

export const config = {
  // Применяем middleware ко всем роутам, кроме статических файлов и API
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};