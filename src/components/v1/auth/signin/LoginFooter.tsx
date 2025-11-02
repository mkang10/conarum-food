"use client";

import { useRouter } from "next/navigation";

export default function LoginFooter() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center mt-8 space-y-4 text-center">
      <p className="text-sm text-gray-600">
        Don’t have an account?{" "}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-[var(--color-primary)] font-semibold"
        >
          Sign Up
        </button>
      </p>
    </div>
  );
}
