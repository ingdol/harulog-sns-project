"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

export default function ModalBackButton() {
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };
  return (
    <button
      className="absolute top-4 right-4"
      aria-label="Close modal"
      onClick={handleBack}
    >
      <XMarkIcon className="w-6 h-6 text-gray-500" />
    </button>
  );
}
