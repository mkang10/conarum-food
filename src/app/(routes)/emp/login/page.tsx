"use client";

import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthForm } from "@/components/v1/auth/signin/use-login-form";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const { form, handleChange, handleSubmit, loading, error } = useAuthForm();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-hidden">
      {/* --- Header đỏ với logo --- */}
      <div
        className={`relative bg-[var(--color-primary)] h-[28vh] flex items-center justify-center rounded-b-[40px] transition-all duration-700 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center -mt-2">
          <div className="flex items-center gap-1">
            <span className="text-white text-5xl font-extrabold tracking-wide">
              Fo
            </span>
            <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <div className="w-5 h-5 bg-[var(--color-primary)] rounded-full" />
            </div>
            <span className="text-white text-5xl font-extrabold">d</span>
            <div className="ml-1 w-1 h-6 bg-white rounded-full rotate-[25deg]" />
          </div>
          <p className="text-white mt-1 tracking-wide font-medium text-sm">
            Conarum Welcome Back!
          </p>
        </div>
      </div>

      {/* --- Form login --- */}
      <div
        className={`flex-1 flex flex-col justify-center px-8 py-6 transition-all duration-700 delay-200 ease-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[var(--color-primary)] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm outline-none focus:border-[#FF6B00] transition"
              required
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
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-full px-4 py-3 text-sm outline-none focus:border-[#FF6B00] transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-[var(--color-primary)] text-sm font-medium"
              >
                Forgot password?
              </button>
            </div>
          </div>

          {/* Checkbox */}
          <div className="flex items-start gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              className="mt-[3px] accent-[var(--color-primary)]"
            />
            <span>
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

          {/* Hiển thị lỗi nếu có */}
          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          {/* Sign in button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-full font-semibold text-sm shadow-md active:scale-95 transition-all ${
              loading
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-[var(--color-primary)] text-white hover:opacity-90"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {/* --- Sign up --- */}
        <div className="flex flex-col items-center mt-8 space-y-4">
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
      </div>
    </div>
  );
}
