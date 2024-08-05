"use client";
import { MenuInterface } from "@/constants/sidebarMenu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const SideBarMenu = ({ menu }: { menu: MenuInterface }) => {
  const pathname = usePathname();
  return (
    <Link
      href={menu.href}
      className={cn(
        pathname === menu.href ? "bg-green-700 text-white" : "text-neutral-800",
        `flex gap-4 items-center hover:bg-green-700 hover:text-white px-4 py-3 rounded-lg font-medium`
      )}
    >
      {menu.icon}
      {menu.title}
    </Link>
  );
};

export default SideBarMenu;
