"use client";
import TableList from "@/shared/components/pages/dashboard/word-orders/orders-theme/TableList";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

import { useParams } from "next/navigation";

const Page = () => {
  const pathname = usePathname();
  const pageTitle = usePageTitle();

  const params = useParams();
  const id = params?.id;

  const [objFilterForm, setObjFilterForm] = useState({
    client: "",
    status: "",
    name: "",
  });

  const [objFilterApplied, setObjFilterApplied] = useState({
    client: "",
    status: "",
    name: "",
  });

  const resetTableList = () => {
    setObjFilterForm({
      client: "",
      status: "",
      name: "",
    });
    setObjFilterApplied({
      client: "",
      status: "",
      name: "",
    });
  };

  return (
    <>
      <div className="gap-4 flex flex-col  min-h-full ">
        <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
          <h1 className=" font-bold text-xl md:text-2xl lg:text-3xl">
            {pageTitle}
          </h1>
          <div className="flex flex-row gap-2">
            <button className="btn bg-red-600 rounded-full pr-3 py-6 hidden sm:flex items-center justify-center border-none">
              <FiTrash2 className="text-xl text-white" />
              <span className="bg-red-500 py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px] ">
                Delete
              </span>
            </button>
          </div>
        </div>
        <div className="boddy-app overflow-y-auto pb-[100px]">
          <div className="container mt-0 max-w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            aliquid officiis reprehenderit dolore earum, nostrum modi
            asperiores, officia vero ipsum provident in necessitatibus veritatis
            sit perspiciatis deserunt sequi illo itaque?
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
