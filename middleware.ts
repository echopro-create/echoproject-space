import { NextResponse } from "next/server";
export function middleware() { return NextResponse.next(); }
// Ничего не матчим (или задай свои маршруты)
export const config = { matcher: [] };