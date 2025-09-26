import { ReactNode } from 'react';
export function Stack({ children }: { children: ReactNode }) {
  return <div className="[&>*+*]:mt-4">{children}</div>;
}
