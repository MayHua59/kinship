"use client";

import { usePathname } from "next/navigation";
import AppNavbar from "./AppNavbar";
import BackToHomeLink from "./BackToHomeLink";

export default function AppShell({ children }) {
  const pathname = usePathname() ?? "";
  const hideNav =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname.startsWith("/signup/");
  const showBackToHome = pathname !== "/";

  return (
    <>
      {!hideNav ? <AppNavbar /> : null}
      <div className="flex min-h-0 flex-1 flex-col">
        {showBackToHome ? (
          <div
            className={`bg-gray-50 px-4 md:px-8 ${hideNav ? "pt-4" : "py-3"}`}
          >
            <div className="mx-auto max-w-4xl">
              <BackToHomeLink />
            </div>
          </div>
        ) : null}
        {children}
      </div>
    </>
  );
}
