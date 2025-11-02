"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
          Email Address
        </label>
        <input
          type="email"
          placeholder="Enter your email address"
          className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm outline-none focus:border-[#FF6B00] transition"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm outline-none focus:border-[#FF6B00] transition"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <button
          type="button"
          className="text-[var(--color-primary)] text-sm font-medium mt-2 float-right"
        >
          Forgot password
        </button>
      </div>

      {/* Agreement */}
      <div className="flex items-start gap-2 text-xs text-gray-600 mt-4">
        <input type="checkbox" className="mt-[2px] accent-[var(--color-primary)]" />
        <span className="leading-snug">
          I read and agreed to{" "}
          <a href="#" className="text-[var(--color-primary)] font-semibold">
            User Agreement
          </a>{" "}
          and{" "}
          <a href="#" className="text-[var(--color-primary)] font-semibold">
            privacy policy
          </a>
          .
        </span>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-3 bg-[var(--color-primary)] text-white rounded-full font-semibold text-sm shadow-md active:scale-95 transition-all"
      >
        Sign in
      </button>
    </form>
  );
}
