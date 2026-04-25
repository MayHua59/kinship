export default function GuideCard({
  guide,
  requestStatus = "idle",
  onRequest,
  onCancelClick,
}) {
  const isSending = requestStatus === "sending";
  const isPending = requestStatus === "pending";
  const label = isSending ? "Sending request…" : isPending ? "Cancel Request" : "Request Chat";
  const buttonClass = isPending
    ? "bg-red-600 hover:bg-red-700"
    : "bg-primary hover:opacity-90";

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>

      <p className="text-sm text-gray-500">
        {guide.country} • {guide.field}
      </p>

      <p className="text-sm text-gray-600 mt-2">{guide.bio}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-primary font-semibold">
          {guide.credits} credits
        </span>
      </div>

      <button
        type="button"
        onClick={() => (isPending ? onCancelClick?.() : onRequest?.())}
        disabled={isSending || (!isPending && !onRequest) || (isPending && !onCancelClick)}
        className={`mt-4 w-full ${buttonClass} text-white py-2 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {label}
      </button>
    </div>
  );
}

