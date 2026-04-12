export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3 rounded-xl bg-primary text-white font-semibold shadow-md shadow-primary/25 ring-2 ring-accent/25 ring-offset-0 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/35 hover:shadow-accent/20 hover:ring-accent/50 hover:brightness-110 active:translate-y-0 active:shadow-md active:brightness-100 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:ring-0 disabled:translate-y-0"
    >
      {children}
    </button>
  );
}