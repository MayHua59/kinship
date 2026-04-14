"use client";

import { useState } from "react";
import { incomingRequestsMock } from "@/data/guide-incoming-requests";
import { DEMO_DISPLAY_NAME } from "@/data/user";

export default function GuideHome() {
  const [requests, setRequests] = useState(incomingRequestsMock);

  function handleAccept(id) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  function handleDecline(id) {
    setRequests((prev) => prev.filter((r) => r.id !== id));
  }

  const hasRequests = requests.length > 0;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-16 space-y-10">
      {/* Welcome */}
      <header className="space-y-1">
        <p className="text-sm font-medium uppercase tracking-wide">
          <span className="text-primary">KinCircle</span>
          <span className="text-gray-400"> · </span>
          <span className="text-accent">Guide</span>
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {DEMO_DISPLAY_NAME} 👋
        </h1>
        <p className="text-gray-600">
          Someone might need your guidance today.
        </p>
      </header>

      {/* Quick actions */}
      <section aria-labelledby="guide-quick-actions">
        <h2
          id="guide-quick-actions"
          className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3"
        >
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <a
            href="#requests"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              📥
            </span>
            <span className="font-semibold text-gray-800">View Requests</span>
          </a>
          <a
            href="/guide/profile"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:shadow-accent/15 hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              🧑‍🏫
            </span>
            <span className="font-semibold text-gray-800">My Profile</span>
          </a>
          <a
            href="/chats"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:shadow-accent/15 hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              💬
            </span>
            <span className="font-semibold text-gray-800">Active Chats</span>
          </a>
          <a
            href="/credits"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              💰
            </span>
            <span className="font-semibold text-gray-800">My Credits</span>
          </a>
        </div>
      </section>

      {/* Incoming requests — priority */}
      <section id="requests" className="space-y-4 scroll-mt-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Incoming Requests</h2>
          <span className="text-amber-500" aria-hidden title="Priority">
            ⭐
          </span>
        </div>
        <p className="text-sm text-gray-500 -mt-2">
          Who needs your help right now?
        </p>

        {!hasRequests ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center text-gray-500">
            You’re all caught up — no open requests at the moment.
          </div>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li
                key={req.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {req.studentName}
                    </p>
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
        )}
      </section>

    </div>
  );
}
