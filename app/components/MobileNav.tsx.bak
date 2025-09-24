"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/messages",      label: "Послания",   icon: "/icons/messages.svg",   isActive: (p: string) => p.startsWith("/messages") },
  { href: "/recipients",    label: "Получатели", icon: "/icons/recipients.svg", isActive: (p: string) => p.startsWith("/recipients") },
  { href: "/messages/new",  label: "Создать",    icon: "/icons/plus.svg",       isActive: (p: string) => p === "/messages/new", cta: true },
  { href: "/settings",      label: "Настройки",  icon: "/icons/settings.svg",   isActive: (p: string) => p.startsWith("/settings") },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="mobile-nav" role="navigation" aria-label="Нижняя навигация">
      {items.map(({ href, label, icon, isActive, cta }) => {
        const active = isActive(pathname);
        return (
          <Link
            key={href}
            href={href}
            className={`nav-item ${active ? "active" : ""} ${cta ? "nav-item--cta" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <img src={icon} alt="" aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}