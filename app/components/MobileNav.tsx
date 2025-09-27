"use client";

import Link from "next/link";
import { Mail, HelpCircle, Lock, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const tabs = [
  { href: "/messages", icon: Mail, label: "Послания" },
  { href: "/how", icon: HelpCircle, label: "Как это работает" },
  { href: "/security", icon: Lock, label: "Безопасность" },
  { href: "/login", icon: User, label: "Профиль" }
];

export default function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 inset-x-0 border-t border-[var(--colors-border)] bg-white/90 backdrop-blur-md flex justify-around py-2 z-50">
      {tabs.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          className={twMerge(
            "flex flex-col items-center text-xs transition-colors",
            pathname.startsWith(href) ? "text-black" : "text-[var(--colors-muted)]"
          )}
        >
          <Icon size={22} strokeWidth={1.8} />
          <span className="mt-1">{label}</span>
        </Link>
      ))}
    </nav>
  );
}