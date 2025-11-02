"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop
        closeOnClick
        pauseOnHover
        hideProgressBar={false} 
        toastClassName="bg-[#b20e10] text-white shadow-2xl rounded-lg border-2 "
      />
    </>
  );
}
