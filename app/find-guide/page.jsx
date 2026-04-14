import GuideList from "@/components/guide/GuideList";

export default function FindGuidePage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Find a Guide 🔍</h1>
          <p className="text-gray-500 mt-1">
            Connect with someone who has walked your path.
          </p>
        </div>

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

