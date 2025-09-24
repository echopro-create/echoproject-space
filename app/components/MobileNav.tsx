"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// ??????? helper ??? ??????? ??? ????????? ?????
function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

type Item = {
  href: string;
  label: string;
  cta?: boolean;
  icon: React.ReactNode;
};

const items: Item[] = [
  {
    href: "/",
    label: "???????",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/messages",
    label: "????????",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M4 4h16a1 1 0 0 1 1 1v12l-4-3H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/messages/new",
    label: "?????",
    cta: true,
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M11 4h2v7h7v2h-7v7h-2v-7H4v-2h7V4z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/recipients",
    label: "??????????",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "?????????",
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
        <path d="M19.14 12.936a7.99 7.99 0 0 0 .06-.936 7.99 7.99 0 0 0-.06-.936l2.03-1.578a.5.5 0 0 0 .12-.648l-1.92-3.324a.5.5 0 0 0-.6-.228l-2.39.96a7.992 7.992 0 0 0-1.62-.936l-.36-2.544A.5.5 0 0 0 13 1h-4a.5.5 0 0 0-.5.42l-.36 2.544a7.992 7.992 0 0 0-1.62.936l-2.39-.96a.5.5 0 0 0-.6.228L1.61 7.012a.5.5 0 0 0 .12.648l2.03 1.578c-.04.308-.06.624-.06.936s.02.628.06.936l-2.03 1.578a.5.5 0 0 0-.12.648l1.92 3.324a.5.5 0 0 0 .6.228l2.39-.96c.5.39 1.04.71 1.62.936l.36 2.544A.5.5 0 0 0 9 23h4a.5.5 0 0 0 .5-.42l.36-2.544c.58-.226 1.12-.546 1.62-.936l2.39.96a.5.5 0 0 0 .6-.228l1.92-3.324a.5.5 0 0 0-.12-.648l-2.03-1.578zM11 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" fill="currentColor"/>
      </svg>
    ),
  },
];

export default function MobileNav() {
  const pathname = usePathname() || "/";
  return (
    <nav className="mobile-nav" role="navigation" aria-label="?????? ?????????">
      {items.map(({ href, label, icon, cta }) => {
        const active = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className={cn("nav-item", active && "active", cta && "nav-item--cta")}
          >
            <span className="nav-icon" aria-hidden="true">{icon}</span>
            <span className="nav-label">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}


