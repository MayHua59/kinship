export default function Button({ children, onClick, type = "button" }) {
    return (
      <button
        type={type}
        onClick={onClick}
        className="w-full py-3 rounded-xl bg-primary text-white font-semibold hover:opacity-90 transition"
      >
        {children}
      </button>
    );
  }