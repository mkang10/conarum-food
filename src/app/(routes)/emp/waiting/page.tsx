"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WaitingPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      const isLoggedIn = localStorage.getItem("token");
      if (isLoggedIn) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }, 5000); // 5 giây chờ

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#E53E3E] text-center animate-fadeIn">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-white text-7xl md:text-8xl font-extrabold tracking-wide leading-none drop-shadow-lg">
          Booking
        </h1>
        <h2 className="text-black text-6xl md:text-7xl font-extrabold italic drop-shadow-sm">
          Meals
        </h2>
        <p className="text-white/80 text-sm md:text-base mt-6 tracking-wide">
          Fresh, fast & delicious — just for you!
        </p>
      </div>
    </div>
  );
}
