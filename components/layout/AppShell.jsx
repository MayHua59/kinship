"use client";

import { usePathname } from "next/navigation";
import AppNavbar from "./AppNavbar";

export default function AppShell({ children }) {
  const pathname = usePathname() ?? "";
  const hideNav =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/signup/");

  return (
    <>
      {!hideNav ? <AppNavbar /> : null}
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </>
  );
}
