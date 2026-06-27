import { InboxArrowDownIcon } from "@heroicons/react/24/solid";
import GuideIncomingRequestsList from "@/components/guide/GuideIncomingRequestsList";

export default function GuideRequestsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 pb-8 pt-2 md:px-8 md:pb-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="space-y-1">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Guide
          </p>
          <h1 className="flex flex-wrap items-center gap-2 text-2xl sm:text-3xl font-bold text-gray-900">
            <InboxArrowDownIcon className="h-8 w-8 text-primary shrink-0" aria-hidden />
            <span>Incoming requests</span>
          </h1>
          <p className="text-gray-600 mt-1">
            Upcoming requests from seekers who want your guidance (demo data).
          </p>
        </header>

        <GuideIncomingRequestsList />
      </div>
    </main>
  );
}
