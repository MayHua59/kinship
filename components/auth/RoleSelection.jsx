"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../ui/Button";

const ROLES = [
  {
    id: "seeker",
    emoji: "👤",
    label: "Seeker",
    hint: "I need guidance",
  },
  {
    id: "guide",
    emoji: "🎓",
    label: "Guide",
    hint: "I want to help others",
  },
];

export default function RoleSelection() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);

  function handleContinue() {
    if (!selected) return;
    if (typeof window !== "undefined") {
      window.localStorage.setItem("kinship-role", selected);
    }
    router.push("/");
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg relative z-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-2">
        How do you want to use Kinship?
      </h2>
      <p className="text-center text-gray-500 mb-8">
        Choose the option that fits you best. You can change this later.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        {ROLES.map((role) => {
          const isActive = selected === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelected(role.id)}
              aria-pressed={isActive}
              className={`text-left rounded-2xl border-2 p-5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                isActive
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-200 hover:border-gray-300 bg-white"
              }`}
            >
              <span className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-2xl shrink-0" aria-hidden>
                  {role.emoji}
                </span>
                <span>
                  <span className="font-semibold text-gray-800">{role.label}</span>
                  <span className="text-gray-500"> ({role.hint})</span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        disabled={!selected}
        onClick={handleContinue}
      >
        Continue
      </Button>
    </div>
  );
}
