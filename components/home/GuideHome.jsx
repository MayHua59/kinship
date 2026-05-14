"use client";

import Link from "next/link";
import GuideIncomingRequestsList from "@/components/guide/GuideIncomingRequestsList";
import { DEMO_DISPLAY_NAME } from "@/data/user";
import {
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  CurrencyDollarIcon,
  HandRaisedIcon,
  InboxArrowDownIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

export default function GuideHome() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-16 space-y-10">
      {/* Welcome */}
      <header className="space-y-1">
        <p className="text-sm font-medium uppercase tracking-wide">
          <span className="text-primary">KinCircle</span>
          <span className="text-gray-400"> · </span>
          <span className="text-accent">Guide</span>
        </p>
        <h1 className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-bold text-gray-900">
          <span>Welcome back, {DEMO_DISPLAY_NAME}</span>
          <HandRaisedIcon className="h-7 w-7 text-accent" aria-hidden />
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
          <Link
            href="/requests"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <InboxArrowDownIcon className="h-6 w-6 text-primary" aria-hidden />
            <span className="font-semibold text-gray-800">View Requests</span>
          </Link>
          <a
            href="/guide/profile"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:shadow-accent/15 hover:-translate-y-0.5"
          >
            <AcademicCapIcon className="h-6 w-6 text-accent" aria-hidden />
            <span className="font-semibold text-gray-800">My Profile</span>
          </a>
          <Link
            href="/chats"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:shadow-accent/15 hover:-translate-y-0.5"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-accent" aria-hidden />
            <span className="font-semibold text-gray-800">Active Chats</span>
          </Link>
          <a
            href="/credits"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <CurrencyDollarIcon className="h-6 w-6 text-primary" aria-hidden />
            <span className="font-semibold text-gray-800">My Credits</span>
          </a>
        </div>
      </section>

      {/* Incoming requests — priority */}
      <section id="requests" className="space-y-4 scroll-mt-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">Incoming Requests</h2>
          <StarIcon className="h-5 w-5 text-amber-500" aria-hidden title="Priority" />
        </div>
        <p className="text-sm text-gray-500 -mt-2">
          Who needs your help right now?
        </p>

        <GuideIncomingRequestsList />
      </section>

    </div>
  );
}
