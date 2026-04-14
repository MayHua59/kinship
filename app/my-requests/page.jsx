import RequestList from "@/components/request/RequestList";

export default function MyRequestsPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Requests 💬</h1>
          <p className="text-gray-500 mt-1">
            Track your conversations and requests.
          </p>
        </div>

        <RequestList />
      </div>
    </main>
  );
}

