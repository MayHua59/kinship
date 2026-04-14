export default function GuideCard({ guide }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>

      <p className="text-sm text-gray-500">
        {guide.country} • {guide.field}
      </p>

      <p className="text-sm text-gray-600 mt-2">{guide.bio}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-yellow-500">⭐ {guide.rating}</span>

        <span className="text-primary font-semibold">
          {guide.credits} credits
        </span>
      </div>

      <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition">
        Request Chat
      </button>
    </div>
  );
}

