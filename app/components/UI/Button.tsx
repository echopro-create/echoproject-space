import { clsx } from "clsx";
export function Button({ as:Comp="button", variant="primary", className, children, ...props } : any){
  const base="px-4 py-2 rounded-2xl text-sm";
  const styles = variant==="primary" ? "bg-black text-white" : "border border-border";
  return <Comp className={clsx(base, styles, className)} {...props}>{children}</Comp>;
}
