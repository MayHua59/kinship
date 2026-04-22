"use client";

import { useState } from "react";
import GuideHome from "./GuideHome";
import SeekerHome from "./SeekerHome";

export default function HomePage() {
  const [role] = useState(() => {
    if (typeof window === "undefined") return "seeker";
    const stored = window.localStorage.getItem("kinship-role");
    return stored === "guide" ? "guide" : "seeker";
  });

  return (
    <div className="min-h-full flex flex-col bg-gray-50">
      {role === "guide" ? <GuideHome /> : <SeekerHome />}
    </div>
  );
}
