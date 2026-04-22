/** Signup / onboarding role choices (Seeker vs Guide). */
import { AcademicCapIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export const signupRoles = [
  {
    id: "seeker",
    icon: UserCircleIcon,
    label: "Seeker",
    hint: "I need guidance",
  },
  {
    id: "guide",
    icon: AcademicCapIcon,
    label: "Guide",
    hint: "I want to help others",
  },
];
