"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DEMO_DISPLAY_NAME } from "@/data/user";

export default function SeekerProfilePage() {
  const router = useRouter();
  const [role] = useState(() => {
    if (typeof window === "undefined") return "seeker";
    const stored = window.localStorage.getItem("kinship-role");
    return stored === "guide" ? "guide" : "seeker";
  });

  const isGuide = role === "guide";

  useEffect(() => {
    if (!isGuide) return;
    router.replace("/guide/profile");
  }, [isGuide, router]);

  if (isGuide) {
    return (
      <div className="flex min-h-[50vh] flex-1 items-center justify-center bg-gray-50">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent/50 border-t-primary" />
      </div>
    );
  }

  return (
    <main className="flex-1 bg-gray-50 px-4 py-8 pb-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-600">
          Your seeker account (demo).
        </p>

        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Display name</p>
          <p className="mt-1 text-lg font-semibold text-gray-900">
            {DEMO_DISPLAY_NAME}
          </p>
          <p className="mt-6 text-sm text-gray-600">
            More profile settings can live here as the product grows.
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Are you a guide?{" "}
          <Link
            href="/signup/role"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            Switch role
          </Link>{" "}
          in onboarding.
        </p>
      </div>
    </main>
  );
}
