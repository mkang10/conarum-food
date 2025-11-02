"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Background trên cùng với overlay đỏ nhạt */}
      <div className="relative h-[45vh] w-full bg-gradient-to-b from-[#E53E3E]/90 to-[#E53E3E]/70 flex items-center justify-center overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dvbbfcxdz/image/upload/v1761491193/nasigoreng_i2zzrr.png"
          alt="Nasi Goreng"
          width={300}
          height={300}
          className="rounded-full z-10 shadow-lg"
        />
        <div className="absolute inset-0 bg-[#E53E3E]/20 z-0"></div>
      </div>

      {/* Nội dung chính */}
      <div className="flex flex-col items-center justify-between px-6 text-center flex-1 mt-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Rasakan Sensasi <br /> Nasi Goreng Sejati!
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            Temukan Berbagai Cita Rasa Otentik Yang Akan Memanjakan Lidahmu.
            Pesan Mudah, Pengiriman Cepat, Dan Dijamin Bikin Ketagihan.
          </p>
        </div>

        <div className="w-full mt-8 space-y-3">
          <button
            onClick={() => router.push("/auth")}
            className="w-full py-3 border-2 border-[#E53E3E] rounded-full text-[#E53E3E] font-semibold text-sm active:scale-95 transition-all"
          >
            LOGIN / REGISTER
          </button>

          <button
            onClick={() => router.push("/menu")}
            className="w-full py-3 bg-[#E53E3E] text-white rounded-full font-semibold text-sm active:scale-95 transition-all"
          >
            LIHAT MENU SEKARANG
          </button>
        </div>
      </div>
    </div>
  );
}
