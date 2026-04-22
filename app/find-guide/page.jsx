import GuideList from "@/components/guide/GuideList";
import { MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function FindGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <span>Find a Guide</span>
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" aria-hidden />
          </h1>
          <p className="text-gray-500 mt-1">
            Connect with someone who has walked your path.
          </p>
        </div>

        <a
          href="/recommendations"
          className="mb-6 flex items-start justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-0.5"
        >
          <div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Not sure where to start?
            </p>
            <p className="mt-1 text-lg font-bold text-gray-900">
              Get study recommendations
            </p>
            <p className="mt-1 text-sm text-gray-600">
              Answer a few questions (country, degree, budget, field) and get a
              ranked list.
            </p>
          </div>
          <SparklesIcon className="h-7 w-7 text-primary" aria-hidden />
        </a>

        <input
          type="text"
          placeholder="Search by country, field..."
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <GuideList />
      </div>
    </main>
  );
}

