import { DEMO_DISPLAY_NAME } from "@/data/user";
import Link from "next/link";
import {
  ChatBubbleLeftRightIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  HandRaisedIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import GuideCard from "@/components/guide/GuideCard";
import { guides } from "@/data/guide";

export default function SeekerHome() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-16 space-y-10">
      <header className="space-y-1">
        <p className="text-sm font-medium uppercase tracking-wide">
          <span className="text-primary">KinCircle</span>
          <span className="text-gray-400"> · </span>
          <span className="text-accent">Seeker</span>
        </p>
        <h1 className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-bold text-gray-900">
          <span>Welcome back, {DEMO_DISPLAY_NAME}</span>
          <HandRaisedIcon className="h-7 w-7 text-accent" aria-hidden />
        </h1>
        <p className="text-gray-600">
          Find guidance, ask questions, and move toward your goals—together.
        </p>
      </header>

      <section aria-labelledby="seeker-quick-actions">
        <h2
          id="seeker-quick-actions"
          className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3"
        >
          Quick actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/find-guide"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-primary" aria-hidden />
            <span className="font-semibold text-gray-800">Find a guide</span>
          </Link>
          <a
            href="#requests"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:shadow-accent/15 hover:-translate-y-0.5"
          >
            <ClipboardDocumentListIcon className="h-6 w-6 text-accent" aria-hidden />
            <span className="font-semibold text-gray-800">My requests</span>
          </a>
          <Link
            href="/chats"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
          >
            <ChatBubbleLeftRightIcon className="h-6 w-6 text-primary" aria-hidden />
            <span className="font-semibold text-gray-800">My chats</span>
          </Link>
          <a
            href="/credits"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-accent/50 hover:shadow-md hover:shadow-accent/15 hover:-translate-y-0.5"
          >
            <CurrencyDollarIcon className="h-6 w-6 text-accent" aria-hidden />
            <span className="font-semibold text-gray-800">My credits</span>
          </a>
        </div>
      </section>

      <section aria-labelledby="seeker-recommended-guides" className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2
              id="seeker-recommended-guides"
              className="text-sm font-semibold text-gray-500 uppercase tracking-wide"
            >
              Recommended guides
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              A few high-rated guides to get you started (dummy data).
            </p>
          </div>
          <Link
            href="/find-guide"
            className="shrink-0 text-sm font-semibold text-primary hover:underline underline-offset-2"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {guides.slice(0, 4).map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      </section>

      <section
        id="browse"
        className="rounded-2xl border border-dashed border-accent/35 bg-white/80 p-8 text-center scroll-mt-8"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Ready when you are
        </h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Browse guides and send a request when you’ve picked someone who fits
          your journey. (Coming soon in the demo.)
        </p>
      </section>
    </div>
  );
}
