"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { SidebarSectionProps } from "@/shared/types/TGeneral";

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, links }) => {
  const pathname = usePathname();
  const cleanPath = pathname?.replace(/^\/(es|en|fr)(\/|$)/, "/");

  // Encuentra el href más específico que coincide, sin reordenar
  let activeHref: string | undefined;

  for (const link of links) {
    if (cleanPath === link.href || cleanPath?.startsWith(link.href + "/")) {
      if (!activeHref || link.href.length > activeHref.length) {
        activeHref = link.href;
      }
    }
  }

  return (
    <ul className="mb-5">
      <li>
        <p className="uppercase text-sm text-gray-400 tracking-[.5px] font-light mb-2">
          {title}
        </p>
        <ul className="flex flex-col gap-1">
          {links.map((link, index) => {
            const isActive = link.href === activeHref;

            return (
              <li key={index}>
                <Link
                  href={link.href}
                  className={clsx(
                    "text-white font-light w-full flex items-center justify-start min-h-[40px] px-4 rounded-sm gap-3",
                    "hover:bg-[#ffffff1f] hover:text-white hover:shadow-xl hover:pl-5 transition-all",
                    {
                      "bg-[#ffffff1f] text-white": isActive,
                    }
                  )}
                >
                  {link.icon && <span className="text-xl">{link.icon}</span>}
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </li>
    </ul>
  );
};

export default SidebarSection;
