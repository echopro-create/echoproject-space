import { ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return <section className="rounded-xl border border-neutral-200 p-6 shadow-sm">{children}</section>;
}
