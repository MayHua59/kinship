import Link from "next/link";

export default function RequestCard({ request }) {
  const statusColor = {
    pending: "text-yellow-500",
    accepted: "text-green-600",
    rejected: "text-red-500",
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-4">
      <h3 className="font-semibold text-gray-800">{request.guideName}</h3>

      <p className={`text-sm mt-1 ${statusColor[request.status]}`}>
        {request.status.toUpperCase()}
      </p>

      <p className="text-sm text-gray-600 mt-2">{request.message}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-primary font-semibold">
          {request.credits} credits
        </span>

        {request.status === "accepted" && (
          <Link
            href="/chats"
            className="bg-primary text-white px-3 py-1 rounded-lg"
          >
            Open Chat
          </Link>
        )}
      </div>
    </div>
  );
}

