"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

const PROFILE_KEY = "kinship-guide-profile";

export default function GuideBioPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [bio, setBio] = useState("");
  const [university, setUniversity] = useState("");
  const [scholarship, setScholarship] = useState("");
  const [country, setCountry] = useState("");
  const [field, setField] = useState("");
  const maxChars = 220;

  useEffect(() => {
    setMounted(true);
    const raw =
      typeof window !== "undefined"
        ? window.localStorage.getItem(PROFILE_KEY)
        : null;

    if (!raw) return;

    try {
      const existing = JSON.parse(raw);
      setBio(existing?.bio ?? "");
      setUniversity(existing?.university ?? "");
      setScholarship(existing?.scholarship ?? "");
      setCountry(existing?.country ?? "");
      setField(existing?.field ?? "");
    } catch {
      // If old/invalid data exists, ignore it.
    }
  }, []);

  const remaining = useMemo(() => maxChars - bio.length, [bio.length]);
  const canSave = mounted && bio.length <= maxChars;

  function handleSave() {
    if (!canSave) return;
    window.localStorage.setItem(
      PROFILE_KEY,
      JSON.stringify({
        bio: bio.trim(),
        university: university.trim(),
        scholarship: scholarship.trim(),
        country: country.trim(),
        field: field.trim(),
      })
    );
    router.push("/guide/profile");
  }

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 rounded-full border-2 border-accent/50 border-t-primary animate-spin" />
      </div>
    );
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
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Example: South Korea 🇰🇷"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">Field</label>
              <input
                value={field}
                onChange={(e) => setField(e.target.value)}
                placeholder="Example: Computer Science"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                University
              </label>
              <input
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Example: KAIST"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-800">
                Scholarship
              </label>
              <input
                value={scholarship}
                onChange={(e) => setScholarship(e.target.value)}
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
              value={bio}
              onChange={(e) => setBio(e.target.value)}
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

