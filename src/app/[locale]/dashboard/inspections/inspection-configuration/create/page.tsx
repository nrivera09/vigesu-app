"use client";
import CreateOrder from "@/features/inspections/inspection-configuration/create/CreateOrder";
import AlertInfo from "@/shared/components/shared/AlertInfo";
import BackButton from "@/shared/components/shared/BackButton";
import React, { useState } from "react";

const Page = () => {
  const [title, setTitle] = useState<string>("");
  const changeTitle = (newTitle: string) => {
    setTitle(newTitle);
  };
  return (
    <>
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <BackButton title={!title ? "New Inspection configuration" : title} />
      </div>
      <div className="body-app overflow-y-auto pt-[20px]">
        <div className="container max-w-full mb-5">
          <AlertInfo>
            All the grey spaces are editable, meaning you can write on them and
            add the required data.
          </AlertInfo>
          <CreateOrder changeTitle={changeTitle} />
        </div>
      </div>
    </>
  );
};

export default Page;
