"use client";
import TableList from "@/shared/components/shared/TableList";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import React from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";

const Page = () => {
  const pageTitle = usePageTitle();

  return (
    <div className="gap-4 flex flex-col  min-h-full ">
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <h1 className=" font-bold text-xl md:text-2xl lg:text-3xl">
          {pageTitle}
        </h1>
        <div className="flex flex-row gap-2">
          <button className="btn bg-[#60285a] rounded-full pr-3 py-6 sm:flex items-center justify-center border-none">
            <FiPlus className="text-xl text-white" />
            <span className="bg-[#7c3174] py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px]">
              New
            </span>
          </button>
          <button className="btn bg-[#60285a] rounded-full pr-3 py-6 sm:flex items-center justify-center border-none">
            <IoSearchOutline className="text-xl text-white" />
            <span className="bg-[#7c3174] py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px]  ">
              Search
            </span>
          </button>
          <button className="btn bg-red-600 rounded-full pr-3 py-6 sm:flex items-center justify-center border-none">
            <FiTrash2 className="text-xl text-white" />
            <span className="bg-red-500 py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px] ">
              Delete
            </span>
          </button>
        </div>
      </div>
      <div className="boddy-app overflow-y-auto pb-[100px]">
        <div className="container mt-0 max-w-full">
          <TableList></TableList>
        </div>
      </div>
    </div>
  );
};

export default Page;
