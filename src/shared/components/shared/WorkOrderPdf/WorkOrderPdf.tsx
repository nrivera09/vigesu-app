// components/WorkOrderPdf.tsx
import React, { forwardRef, useState } from "react";
import { WorkOrder } from "@/shared/types/order/ITypes";
import { formatDate } from "@/shared/utils/utils";

interface Props {
  data: WorkOrder;
  isEditable?: boolean;
}

const WorkOrderPdf = forwardRef<HTMLDivElement, Props>(
  ({ data, isEditable }, ref) => {
    console.log("isEditable: ", isEditable);
    return (
      <div
        ref={ref}
        className=" text-black max-w-full  font-sans bg-white mx-auto pt-[20px]"
      >
        <div className="border border-black text-center py-2">
          <p
            className="font-bold text-2xl"
            contentEditable={isEditable}
            suppressContentEditableWarning
          >
            Visegu Maintenance service (510)719-1444 percyruiz@visegu.com
          </p>
        </div>
        <h1
          className="font-bold text-6xl py-4"
          contentEditable={isEditable}
          suppressContentEditableWarning
        >
          Work Order
        </h1>

        <div className="flex flex-col gap-4 mb-10">
          <div className="grid grid-cols-3 border border-black">
            <div className="flex flex-row p-2 items-center justify-start gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                CUSTOMER:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {data.customerName}
              </span>
            </div>
            <div className="flex flex-row p-2 items-center justify-start border-r-1 border-l-1 gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                LOCATION OF REPAIR:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {data.locationOfRepair}
              </span>
            </div>
            <div className="flex flex-row p-2 items-center justify-start gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                TIME START SERVICE:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {formatDate(data.timeStart)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 border border-black">
            <div className="flex flex-row p-2 items-center justify-start gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                EQUIPMENT#:
              </label>
              <span className="flex flex-1">{data.equipament}</span>
            </div>
            <div className="flex flex-row p-2 items-center justify-start border-r-1 border-l-1 gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                DATE OF REPAIR:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {formatDate(data.dateOfRepair)}
              </span>
            </div>
            <div className="flex flex-row p-2 items-center justify-start gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                TIME FINISH SERVICE:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {formatDate(data.timeFinish)}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 border border-black">
            <div className="flex flex-row p-2 items-center justify-start gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                LICENSE PLATE#:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {data.licencePlate}
              </span>
            </div>
            <div className="flex flex-row p-2 items-center justify-start gap-2 border-l-1 ">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                PO#:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {data.po}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 border border-black">
            <div className="flex flex-row p-2 items-center justify-start gap-2">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                VIN#:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {data.vin}
              </span>
            </div>
            <div className="flex flex-row p-2 items-center justify-start gap-2 border-l-1 ">
              <label
                htmlFor=""
                className="min-w-auto font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                MECHANIC NAME:
              </label>
              <span
                className="flex flex-1"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {data.employeeName}
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto border border-black ">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr className=" border-b-black">
                <th
                  className="font-bold text-black text-center border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  CODE
                </th>
                <th
                  className="font-bold text-black text-center border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  WORK DESCRIPTION
                </th>
                <th
                  className="font-bold text-black text-center border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  LABOR TIME
                </th>
                <th
                  className="font-bold text-black text-center border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  PARTS
                </th>
                <th
                  className="font-bold text-black text-center "
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                >
                  TOTAL
                </th>
              </tr>
            </thead>
            <tbody className="odd:border-b-black ">
              {data.workOrderDetails.map((item, index) => (
                <tr key={index} className="text-center   border-b-black">
                  <td
                    className=""
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                  >
                    {item.itemId ?? ""}
                  </td>
                  <td
                    className="border-r"
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                  >
                    {(item.observation ?? "") + " x" + (item.quantity ?? "")}
                  </td>
                  <td
                    className="border-r"
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                  >
                    {""}
                  </td>
                  <td
                    className="border-r"
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                  >
                    {""}
                  </td>
                  <td
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                  >
                    {""}
                  </td>
                </tr>
              ))}
              <tr className="text-center border-b-black ">
                <td colSpan={2} className="border-r">
                  <p
                    className="font-bold text-left"
                    contentEditable={isEditable}
                    suppressContentEditableWarning
                  >
                    Tires Tread Deep
                  </p>
                </td>
                <td
                  className="border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
                <td
                  className="border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
                <td
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
              </tr>
              <tr className="text-center border-b-black ">
                <td colSpan={2} className="border-r">
                  <div className="grid grid-cols-4">
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        RIF
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.rif}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        ROF
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.rof}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        RIR
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.rir}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        ROR
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.ror}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
                <td
                  className="border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
                <td
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
              </tr>
              <tr className="text-center border-b-black ">
                <td colSpan={2} className="border-r">
                  <div className="grid grid-cols-4">
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        LIF
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.lif}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        LOF
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.lof}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        LIR
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.lir}
                      </span>
                    </div>
                    <div className="flex flex-row gap-2">
                      <span
                        className="min-w-auto font-semibold"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        LOR
                      </span>
                      <span
                        className="flex-1 text-left"
                        contentEditable={isEditable}
                        suppressContentEditableWarning
                      >
                        {data.lor}
                      </span>
                    </div>
                  </div>
                </td>
                <td
                  className="border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
                <td
                  className="border-r"
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
                <td
                  contentEditable={isEditable}
                  suppressContentEditableWarning
                ></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

WorkOrderPdf.displayName = "WorkOrderPdf";
export default WorkOrderPdf;
