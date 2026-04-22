"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

const PROFILE_KEY = "kinship-guide-profile";

export default function GuideBioPage() {
  const router = useRouter();
  const [profile, setProfile] = useState(() => {
    const base = {
      bio: "",
      university: "",
      scholarship: "",
      country: "",
      field: "",
    };
    if (typeof window === "undefined") return base;
    const raw = window.localStorage.getItem(PROFILE_KEY);
    if (!raw) return base;
    try {
      const existing = JSON.parse(raw);
      return {
        ...base,
        ...(existing ?? {}),
      };
    } catch {
      return base;
    }
  });
  const maxChars = 220;

  const remaining = useMemo(() => maxChars - profile.bio.length, [profile.bio.length]);
  const canSave = profile.bio.length <= maxChars;

  function handleSave() {
    if (!canSave) return;
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({
        bio: profile.bio.trim(),
        university: profile.university.trim(),
        scholarship: profile.scholarship.trim(),
        country: profile.country.trim(),
        field: profile.field.trim(),
      })
    );
    router.push("/guide/profile");
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Guide profile
          </p>
          <h1 className="text-2xl font-bold text-gray-900 mt-1">
            Set up your profile
          </h1>
          <p className="text-gray-600 mt-2">
            All fields are optional — add what you want seekers to see.
          </p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Country
              </label>
              <input
                value={profile.country}
                onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
                placeholder="Example: South Korea"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Field</label>
              <input
                value={profile.field}
                onChange={(e) => setProfile((p) => ({ ...p, field: e.target.value }))}
                placeholder="Example: Computer Science"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                University
              </label>
              <input
                value={profile.university}
                onChange={(e) => setProfile((p) => ({ ...p, university: e.target.value }))}
                placeholder="Example: KAIST"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Scholarship
              </label>
              <input
                value={profile.scholarship}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, scholarship: e.target.value }))
                }
                placeholder="Example: MEXT / Fulbright / KAIST Scholarship"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              Your bio
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
              rows={5}
              maxLength={maxChars}
              placeholder="Example: CS student at KAIST — I can help with scholarship applications, essays, and interview prep."
              className="w-full resize-none rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">
                Keep it friendly and specific.
              </span>
              <span
                className={remaining < 0 ? "text-red-600" : "text-gray-500"}
              >
                {remaining} left
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button type="button" onClick={handleSave} disabled={!canSave}>
              Save profile
            </Button>

            <button
              type="button"
              onClick={() => router.push("/guide/profile")}
              className="w-full py-3 rounded-xl border-2 border-gray-200 bg-white text-gray-800 font-semibold transition-all duration-200 hover:border-accent/45 hover:bg-accent/5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

