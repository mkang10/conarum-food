"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/component/v1/shared/layout/sidebar/Sidebbar";
import { sidebarLinks } from "@/component/v1/shared/layout/sidebar/SidebarLinks";
import { NavbarCom } from "./layout/navbar/Navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col w-screen h-screen bg-gray-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50"
      )}
    >
       
      {/* ✅ Navbar cố định trên cùng */}
      <div className="z-20 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md">
        <NavbarCom />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ✅ Sidebar cố định bên trái */}
        <div className="h-full flex-shrink-0 bg-white dark:bg-neutral-950 border-r border-neutral-200 dark:border-neutral-800">
          <Sidebar open={open} setOpen={setOpen}>
            <SidebarBody className="justify-between gap-10 h-full">
              <div className="flex flex-1 flex-col overflow-x-hidden">
                {/* {open ? <Logo /> : <LogoIcon />} */}
                <div className="mt-8 flex flex-col gap-2">
                  {sidebarLinks.map((link, idx) => (
                    <SidebarLink key={idx} link={link} />
                  ))}
                </div>
              </div>

              <div>
                <SidebarLink
                  link={{
                    label: "Nguyễn Mạnh Cường",
                    href: "#",
                    icon: (
                      <img
                        src="https://assets.aceternity.com/manu.png"
                        className="h-7 w-7 shrink-0 rounded-full"
                        width={50}
                        height={50}
                        alt="Avatar"
                      />
                    ),
                  }}
                />
              </div>
            </SidebarBody>
          </Sidebar>
        </div>

        <main className="flex-1 h-full overflow-y-auto p-6 bg-gray-100 dark:bg-neutral-900">
          <div className="min-h-full w-full rounded-3xl bg-white dark:bg-neutral-950 shadow-md p-6">
            {children}
          </div>
        </main>



      </div>
    </div>
  );
}
