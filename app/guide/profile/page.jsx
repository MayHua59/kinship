"use client";

import Link from "next/link";
import { useState } from "react";
import { DEMO_DISPLAY_NAME } from "@/data/user";

const PROFILE_KEY = "kinship-guide-profile";

export default function GuideProfilePage() {
  const [profile] = useState(() => {
    const base = {
      bio: "",
      university: "",
      scholarship: "",
      country: "",
      field: "",
    };
    if (typeof window === "undefined") return base;

    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return { ...base, ...(parsed ?? {}) };
      } catch {
        // ignore invalid JSON and try fallback below
      }
    }

    const legacyBio = window.localStorage.getItem("kinship-guide-bio");
    return legacyBio ? { ...base, bio: legacyBio } : base;
  });

  const hasAny =
    profile.bio.trim() ||
    profile.university.trim() ||
    profile.scholarship.trim() ||
    profile.country.trim() ||
    profile.field.trim();
  const hasBio = profile.bio.trim().length > 0;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Guide profile
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">
              {DEMO_DISPLAY_NAME}
            </h1>
            <p className="text-gray-600 mt-1">
              This is what seekers will see when they view you.
            </p>
          </div>

          <Link
            href="/guide/bio"
            className="shrink-0 rounded-xl bg-primary text-white font-semibold px-4 py-2 shadow-md shadow-primary/25 ring-1 ring-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 hover:brightness-110"
          >
            {hasAny ? "Edit profile" : "Set up profile"}
          </Link>
        </header>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Details
            </h2>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profile.country.trim() ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Country
                  </p>
                  <p className="text-gray-900 font-semibold mt-1">
                    {profile.country}
                  </p>
                </div>
              ) : null}

              {profile.field.trim() ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Field
                  </p>
                  <p className="text-gray-900 font-semibold mt-1">
                    {profile.field}
                  </p>
                </div>
              ) : null}

              {profile.university.trim() ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    University
                  </p>
                  <p className="text-gray-900 font-semibold mt-1">
                    {profile.university}
                  </p>
                </div>
              ) : null}

              {profile.scholarship.trim() ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Scholarship
                  </p>
                  <p className="text-gray-900 font-semibold mt-1">
                    {profile.scholarship}
                  </p>
                </div>
              ) : null}
            </div>

            {!profile.country.trim() &&
            !profile.field.trim() &&
            !profile.university.trim() &&
            !profile.scholarship.trim() ? (
              <p className="text-sm text-gray-500 mt-3">
                No details yet.
              </p>
            ) : null}
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Bio
            </h2>

            {hasBio ? (
              <p className="text-gray-800 mt-3 leading-relaxed">
                {profile.bio}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mt-3">No bio yet.</p>
            )}
          </div>

          {!hasAny ? (
            <div className="rounded-2xl border border-dashed border-accent/35 bg-accent/5 p-5">
              <p className="text-gray-700 font-semibold">
                Your profile is empty
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Add optional details (university, scholarship, country) so
                seekers understand your background.
              </p>
              <Link
                href="/guide/bio"
                className="inline-flex mt-4 rounded-xl border-2 border-gray-200 bg-white text-gray-800 font-semibold px-4 py-2 transition-all duration-200 hover:border-accent/45 hover:bg-accent/5"
              >
                Set up my profile
              </Link>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

