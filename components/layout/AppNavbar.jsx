"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  Bars3Icon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  InboxArrowDownIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const SEEKER_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
    match: (path, hash) => path === "/" && !hash,
  },
  {
    href: "/find-guide",
    label: "Find Guide",
    icon: MagnifyingGlassIcon,
    match: (path) => path.startsWith("/find-guide"),
  },
  {
    href: "/my-requests",
    label: "My Requests",
    icon: ChatBubbleLeftRightIcon,
    match: (path) => path.startsWith("/my-requests"),
  },
  {
    href: "/profile",
    label: "Profile",
    icon: UserCircleIcon,
    match: (path) => path.startsWith("/profile"),
  },
];

const GUIDE_LINKS = [
  {
    href: "/",
    label: "Home",
    icon: HomeIcon,
    match: (path, hash) => path === "/" && (!hash || hash === "#"),
  },
  {
    href: "/#requests",
    label: "Requests",
    icon: InboxArrowDownIcon,
    match: (path, hash) => path === "/" && hash === "#requests",
  },
  {
    href: "/chats",
    label: "Chats",
    icon: ChatBubbleLeftRightIcon,
    match: (path) => path.startsWith("/chats"),
  },
  {
    href: "/guide/profile",
    label: "Profile",
    icon: UserCircleIcon,
    match: (path) =>
      path.startsWith("/guide/profile") || path.startsWith("/guide/bio"),
  },
];

export default function AppNavbar() {
  const pathname = usePathname() ?? "";
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return "seeker";
    const stored = window.localStorage.getItem("kinship-role");
    return stored === "guide" ? "guide" : "seeker";
  });
  const [hash, setHash] = useState(() =>
    typeof window === "undefined" ? "" : window.location.hash || ""
  );
  const [menuOpen, setMenuOpen] = useState(false);

  const syncHash = useCallback(() => {
    if (typeof window === "undefined") return;
    setHash(window.location.hash || "");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleHashChange = () => syncHash();
    const handleStorage = (e) => {
      if (e.key !== "kinship-role") return;
      setRole(e.newValue === "guide" ? "guide" : "seeker");
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("storage", handleStorage);
    };
  }, [syncHash]);

  const links = role === "guide" ? GUIDE_LINKS : SEEKER_LINKS;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-gray-50/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="shrink-0 text-sm font-semibold tracking-tight text-gray-900"
          onClick={() => setMenuOpen(false)}
        >
          <span className="text-primary">Kin</span>
          <span className="text-gray-800">Circle</span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-1 sm:flex"
          aria-label="Main"
        >
          {links.map((item) => {
            const active = item.match(pathname, hash);
            const ItemIcon = item.icon;
            return (
              <Link
                key={item.href + item.label}
                href={item.href}
                className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <ItemIcon className="mr-1.5 inline-block h-4 w-4 opacity-90" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm sm:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-main-nav"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          {menuOpen ? (
            <XMarkIcon className="h-5 w-5" aria-hidden />
          ) : (
            <Bars3Icon className="h-5 w-5" aria-hidden />
          )}
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-main-nav"
          className="border-t border-gray-200/80 bg-gray-50/98 px-4 pb-4 sm:hidden"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((item) => {
              const active = item.match(pathname, hash);
              const ItemIcon = item.icon;
              return (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-medium ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <ItemIcon className="h-5 w-5" aria-hidden />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
