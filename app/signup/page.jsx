import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden px-4">
      <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-accent rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-[-80px] right-[-80px] w-72 h-72 bg-primary rounded-full blur-3xl opacity-40" />

      <SignupForm />
    </div>
  );
}
