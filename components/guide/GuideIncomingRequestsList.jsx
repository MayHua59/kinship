"use client";

import { useState } from "react";
import { incomingRequestsMock } from "@/data/guide-incoming-requests";

export default function GuideIncomingRequestsList() {
  const [requests, setRequests] = useState(incomingRequestsMock);

  function handleAccept(id) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  function handleDecline(id) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  const hasRequests = requests.length > 0;

  if (!hasRequests) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-gray-500">
        You’re all caught up — no open requests at the moment.
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {requests.map((req) => (
        <li
          key={req.id}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <p className="font-semibold text-gray-900">{req.studentName}</p>
              <p className="text-sm text-gray-700 mt-0.5">{req.goal}</p>
            </div>
            <span className="text-sm font-semibold text-gray-900 whitespace-nowrap bg-accent/25 px-2.5 py-1 rounded-lg">
              {req.credits} credits
            </span>
          </div>
          {req.message ? (
            <blockquote className="text-sm text-gray-600 border-l-2 border-accent pl-3 mb-4">
              “{req.message}”
            </blockquote>
          ) : null}
          <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => handleAccept(req.id)}
              className="flex-1 rounded-xl bg-primary text-white font-semibold py-2.5 px-4 shadow-md shadow-primary/25 ring-1 ring-accent/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20 hover:brightness-110 active:translate-y-0"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={() => handleDecline(req.id)}
              className="flex-1 rounded-xl border-2 border-gray-200 bg-white text-gray-800 font-semibold py-2.5 px-4 transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-800"
            >
              Decline
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
