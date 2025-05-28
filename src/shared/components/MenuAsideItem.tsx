"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";

interface MenuAsideItemProps {
  children: ReactNode;
  href: string;
}

const stripLocale = (path: string) => {
  const parts = path.split("/").filter(Boolean);
  if (parts[0]?.length === 2) {
    parts.shift();
  }
  return "/" + parts.join("/");
};

const MenuAsideItem: FC<MenuAsideItemProps> = ({ children, href }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return stripLocale(pathname) === stripLocale(href);
  };

  return (
    <li>
      <Link
        href={href}
        className={isActive(href) ? "bg-[#09090b] text-white" : ""}
      >
        {children}
      </Link>
    </li>
  );
};

export default MenuAsideItem;
