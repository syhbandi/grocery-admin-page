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
        pathname === menu.href
          ? "bg-primary text-primary-foreground"
          : "text-secondary-foreground",
        `flex gap-4 items-center hover:bg-primary hover:text-primary-foreground px-4 py-3 rounded-lg`
      )}
    >
      {menu.icon}
      {menu.title}
    </Link>
  );
};

export default SideBarMenu;
