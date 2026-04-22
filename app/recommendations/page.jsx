import SeekerRecommendations from "@/components/recommendations/SeekerRecommendations";
import { SparklesIcon } from "@heroicons/react/24/solid";

export default function RecommendationsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <header className="space-y-1">
          <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-800">
            <span>Recommendations</span>
            <SparklesIcon className="h-6 w-6 text-primary" aria-hidden />
          </h1>
          <p className="text-gray-500">
            Tell us your goals and we’ll suggest programs, scholarships, or
            universities.
          </p>
        </header>

        <SeekerRecommendations />
      </div>
    </main>
  );
}

