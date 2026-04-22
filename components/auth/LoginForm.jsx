import Link from "next/link";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { HandRaisedIcon } from "@heroicons/react/24/solid";

export default function LoginForm() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg relative z-10">
      
      {/* Title */}
      <h2 className="flex items-center justify-center gap-2 text-3xl font-bold text-center text-gray-800 mb-2">
        <span>Welcome Back</span>
        <HandRaisedIcon className="h-8 w-8 text-accent" aria-hidden />
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Because no dream should be chased alone.
      </p>

      {/* Form */}
      <form className="flex flex-col gap-5">
        <Input label="Email" type="email" placeholder="Enter your email" />
        <Input label="Password" type="password" placeholder="Enter your password" />
        <Button type="submit">Login</Button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-500 mt-4">
        Don’t have an account?{" "}
        <Link
          href="/signup"
          className="text-accent font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}