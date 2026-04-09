export default function Input({ label, type = "text", placeholder, ...props }) {
    return (
      <div className="flex flex-col gap-1">
        <label className="text-gray-700 font-medium">{label}</label>
        <input
          type={type}
          placeholder={placeholder}
          {...props}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
        />
      </div>
    );
  }