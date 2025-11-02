"use client";

export default function LoginHeader({ isVisible }: { isVisible: boolean }) {
  return (
    <div
      className={`relative bg-[var(--color-primary)] h-[32vh] flex items-center justify-center rounded-b-[60px] transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-1">
          <span className="text-white text-5xl font-extrabold tracking-wide">Fo</span>
          <div className="relative w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <div className="w-5 h-5 bg-[var(--color-primary)] rounded-full" />
          </div>
          <span className="text-white text-5xl font-extrabold">d</span>
          <div className="ml-1 w-1 h-6 bg-white rounded-full rotate-[25deg]" />
        </div>
        <p className="text-white mt-1 tracking-wide font-medium text-base md:text-lg">
          Conarum Welcome Back!
        </p>
      </div>
    </div>
  );
}
