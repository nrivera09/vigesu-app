import CreateOrder from "@/features/orders/create-order/CreateOrder";
import BackButton from "@/shared/components/shared/BackButton";
import React from "react";

const page = () => {
  return (
    <>
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <BackButton title="New order" />
      </div>
      <div className="body-app overflow-y-auto pt-[20px]">
        <div className="container max-w-full mb-5">
          <CreateOrder />
        </div>
      </div>
    </>
  );
};

export default page;
