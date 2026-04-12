"use client";

import { useEffect, useState } from "react";
import GuideHome from "./GuideHome";
import SeekerHome from "./SeekerHome";

export default function HomePage() {
  const [role, setRole] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored =
      typeof window !== "undefined"
        ? window.localStorage.getItem("kinship-role")
        : null;
    setRole(stored === "guide" ? "guide" : "seeker");
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      {role === "guide" ? <GuideHome /> : <SeekerHome />}
    </div>
  );
}
