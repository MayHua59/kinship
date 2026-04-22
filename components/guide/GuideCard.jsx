import { StarIcon } from "@heroicons/react/24/solid";

export default function GuideCard({ guide }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-md transition">
      <h3 className="text-lg font-semibold text-gray-800">{guide.name}</h3>

      <p className="text-sm text-gray-500">
        {guide.country} • {guide.field}
      </p>

      <p className="text-sm text-gray-600 mt-2">{guide.bio}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="inline-flex items-center gap-1 text-yellow-500">
          <StarIcon className="h-5 w-5" aria-hidden />
          <span>{guide.rating}</span>
        </span>

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

