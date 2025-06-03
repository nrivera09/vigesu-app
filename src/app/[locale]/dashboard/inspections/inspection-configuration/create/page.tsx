"use client";

import BackButton from "@/shared/components/shared/BackButton";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const pathname = usePathname();
  const pageTitle = usePageTitle();

  return (
    <div className="gap-4 flex flex-col min-h-full">
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <BackButton />
      </div>
      <div className="boddy-app overflow-y-auto ">
        <div className="container max-w-full mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Necessitatibus et aut corrupti in neque, nulla veniam, repudiandae
          sunt, architecto cumque eos. Incidunt consectetur voluptas reiciendis
          magnam eum qui et maxime!
        </div>
      </div>
    </div>
  );
};

export default Page;
