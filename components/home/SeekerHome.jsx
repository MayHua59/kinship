const DISPLAY_NAME = "Honey";

export default function SeekerHome() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 pb-16 space-y-10">
      <header className="space-y-1">
        <p className="text-sm font-medium text-primary uppercase tracking-wide">
          KinCircle · Seeker
        </p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {DISPLAY_NAME} 👋
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href="#browse"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              🔍
            </span>
            <span className="font-semibold text-gray-800">Find a guide</span>
          </a>
          <a
            href="#requests"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              📋
            </span>
            <span className="font-semibold text-gray-800">My requests</span>
          </a>
          <a
            href="#chats"
            className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
          >
            <span className="text-xl" aria-hidden>
              💬
            </span>
            <span className="font-semibold text-gray-800">My chats</span>
          </a>
        </div>
      </section>

      <section
        id="browse"
        className="rounded-2xl border border-dashed border-gray-200 bg-white/80 p-8 text-center scroll-mt-8"
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
