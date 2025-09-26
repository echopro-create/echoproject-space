import { clsx } from "clsx";
export function Card({ className, children }:{ className?:string; children:React.ReactNode }){
  return <div className={clsx("rounded-2xl border border-border p-4", className)}>{children}</div>;
}
