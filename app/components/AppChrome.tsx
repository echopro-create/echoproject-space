"use client";

import { usePathname } from "next/navigation";
import MobileNav from "@/app/components/MobileNav";
import DesktopHeader from "@/app/components/UI/DesktopHeader";

export default function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <>
      {!isHome && <DesktopHeader />}
      <main id="main" className={!isHome ? "pt-0" : ""}>{children}</main>
      {!isHome && (
        <div className="lg:hidden">
          <MobileNav />
        </div>
      )}
    </>
  );
}