"use client";
import CreateOrder from "@/features/inspections/inspection-configuration/create-inspection/CreateOrder";
import EditOrder from "@/features/inspections/inspection-configuration/edit-inspection/EditOrder";
import GenerateStep1 from "@/features/orders/inspections/components/GenerateStep1";
import GenerateStep0 from "@/features/orders/inspections/components/GenerateStep1";
import GenerateStep2 from "@/features/orders/inspections/components/GenerateStep2";
import GenerateStep3 from "@/features/orders/inspections/components/GenerateStep3";
import GenerateStep4 from "@/features/orders/inspections/components/GenerateStep4";
import { useInspectionFullStore } from "@/features/orders/store/inspection/inspectionFullStore";
import AlertInfo from "@/shared/components/shared/AlertInfo";
import BackButton from "@/shared/components/shared/BackButton";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";

const Page = () => {
  const router = useRouter();
  const { fullInspection, groupName, stepWizard, resetFullInspection } =
    useInspectionFullStore();
  return (
    <>
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <BackButton title={groupName || "New Inspection configuration"} />
        <ActionButton
          icon={<IoCloseOutline className="w-[20px] h-[20px] opacity-70" />}
          className="bg-red-400 transition-all hover:bg-red-600 text-white  !rounded-full"
          label="Close configuration"
          onClick={() => {
            resetFullInspection();
            router.push("../workorder");
          }}
        />
      </div>
      <div className="body-app overflow-y-auto pt-[20px]">
        <div className="container max-w-full mb-5">
          {stepWizard === 1 && <GenerateStep1 />}
          {stepWizard === 2 && <GenerateStep2 />}
          {stepWizard === 3 && <GenerateStep3 />}
          {stepWizard === 4 && <GenerateStep4 />}
        </div>
      </div>
    </>
  );
};

export default Page;
