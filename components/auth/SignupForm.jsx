"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SignupForm() {
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    router.push("/signup/role");
  }

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-lg relative z-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
        Join Kinship
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Create an account and build something together.
      </p>

      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Create a password"
          autoComplete="new-password"
        />
        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          autoComplete="new-password"
        />
        <Button type="submit">Create account</Button>
      </form>

      <p className="text-sm text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-semibold hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
