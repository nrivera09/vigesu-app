"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { capitalizeWords, segments } from "../lib/utils";

const Breadcrumb: React.FC = () => {
  const pathname = usePathname();

  const parts = segments(pathname);
  const pageTitle = parts.length > 0 ? capitalizeWords(parts[0]) : "Inicio";

  return (
    <div className="breadcrumb flex flex-col sm:flex-row items-start sm:items-center justify-between min-h-[36px] mb-[18px]">
      <h1 className="font-bold uppercase text-[#495057]">{pageTitle}</h1>
      <div className="">
        <ul>
          {parts.map((segment, index) => {
            const label = capitalizeWords(segment);
            const path = "/" + parts.slice(0, index + 1).join("/");

            const isFirst = index === 0;
            const isLast = index === parts.length - 1;

            const className = isFirst ? "text-black" : "text-gray-400";

            return (
              <li key={index} className={className}>
                {!isLast ? <a href={path}>{label}</a> : <span>{label}</span>}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Breadcrumb;
