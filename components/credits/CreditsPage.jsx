"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { guideCreditsDemo, seekerCreditsDemo } from "@/data/credits";
import { DEMO_DISPLAY_NAME } from "@/data/user";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

function ActivityRow({ title, detail, amount, time }) {
  const isPositive = amount > 0;
  const amountClass = isPositive ? "text-emerald-700" : "text-red-600";

  return (
    <li className="flex gap-4 py-4 border-b border-gray-100 last:border-0">
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500 truncate">{detail}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
      <div className={`text-right font-semibold tabular-nums shrink-0 ${amountClass}`}>
        {isPositive ? "+" : ""}
        {amount}
      </div>
    </li>
  );
}

export default function CreditsPage() {
  const [role, setRole] = useState(() => {
    if (typeof window === "undefined") return "seeker";
    const stored = window.localStorage.getItem("kinship-role");
    return stored === "guide" ? "guide" : "seeker";
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleStorage = (e) => {
      if (e.key !== "kinship-role") return;
      setRole(e.newValue === "guide" ? "guide" : "seeker");
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const isGuide = role === "guide";

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      <div className="relative overflow-hidden">
        <div className="absolute top-[-60px] right-[-40px] w-56 h-56 bg-accent/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-[-40px] left-[-20px] w-48 h-48 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto px-4 pt-6 pb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-accent transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden />
            Back to home
          </Link>

          <header className="mb-8">
            <p className="text-sm font-medium uppercase tracking-wide mb-1">
              <span className="text-primary">KinCircle</span>
              <span className="text-gray-400"> · </span>
              <span className="text-accent">{isGuide ? "Guide" : "Seeker"}</span>
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              My credits
            </h1>
            <p className="text-gray-600 mt-1">
              {isGuide
                ? "Credits you’ve earned by helping others."
                : "Your balance and how you’ve used credits."}
            </p>
          </header>

          {/* Balance / earnings hero */}
          <div className="rounded-3xl bg-linear-to-br from-primary to-orange-600 text-white p-6 sm:p-8 shadow-lg ring-2 ring-accent/40 mb-8">
            <p className="text-sm font-medium text-white/90">
              {isGuide ? "Total credits earned" : "Available balance"}
            </p>
            <p className="text-4xl sm:text-5xl font-bold tabular-nums mt-2 tracking-tight">
              {isGuide
                ? guideCreditsDemo.totalEarned
                : seekerCreditsDemo.balance}
            </p>
            <p className="text-sm text-white/85 mt-3 max-w-md">
              {isGuide
                ? `Nice work, ${DEMO_DISPLAY_NAME}. Every session adds up.`
                : `Use credits to connect with guides, ${DEMO_DISPLAY_NAME}.`}
            </p>
          </div>

          {/* Secondary stats — guide only */}
          {isGuide ? (
            <div className="grid grid-cols-2 gap-3 mb-10">
              <div className="rounded-2xl border border-gray-200 border-t-4 border-t-primary bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  This month
                </p>
                <p className="text-2xl font-bold text-primary tabular-nums mt-1">
                  +{guideCreditsDemo.thisMonth}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 border-t-4 border-t-accent bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900 tabular-nums mt-1">
                  {guideCreditsDemo.sessionsCount}
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/80 p-4 mb-10 text-sm text-amber-950">
              <span className="font-semibold">Tip:</span> Top up when you’re
              ready to book longer chats or send more requests.
            </div>
          )}

          {/* Activity */}
          <section aria-labelledby="credits-activity">
            <h2
              id="credits-activity"
              className="text-lg font-bold text-gray-900 mb-1"
            >
              Recent activity
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              {isGuide
                ? "Credits added when you help someone."
                : "Spending and top-ups in one place."}
            </p>
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <ul className="divide-y divide-gray-100 px-4 sm:px-6">
                {(isGuide
                  ? guideCreditsDemo.activity
                  : seekerCreditsDemo.activity
                ).map((row) => (
                  <ActivityRow
                    key={row.id}
                    title={row.title}
                    detail={row.detail}
                    amount={row.amount}
                    time={row.time}
                  />
                ))}
              </ul>
            </div>
          </section>

          {isGuide ? (
            <p className="mt-10 text-center text-sm text-gray-500 italic max-w-md mx-auto">
              Your experience can change someone’s future.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
