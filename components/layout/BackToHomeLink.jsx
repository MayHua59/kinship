import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function BackToHomeLink({ className = "" }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-2 ${className}`}
    >
      <ArrowLeftIcon className="h-4 w-4 shrink-0" aria-hidden />
      Home
    </Link>
  );
}
