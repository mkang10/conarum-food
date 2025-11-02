"use client"

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react"

export interface SidebarLinkItem {
  label: string
  href: string
  icon: React.ReactNode
}

export const sidebarLinks: SidebarLinkItem[] = [
  {
    label: "Dashboard",
    href: "/adm/dashboard",
    icon: (
      <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Profile",
    href: "/adm/profile",
    icon: (
      <IconUserBolt className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Settings",
    href: "/adm/setting",
    icon: (
      <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
  {
    label: "Logout",
    href: "#",
    icon: (
      <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
    ),
  },
]
