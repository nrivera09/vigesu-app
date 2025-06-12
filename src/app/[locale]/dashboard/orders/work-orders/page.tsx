"use client";
import TableList from "@/features/orders/TableList";
import BackButton from "@/shared/components/shared/BackButton";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import { DayPicker } from "react-day-picker";
import {
  WorkOrderStatus,
  WorkOrderStatusLabel,
} from "@/features/orders/models/workOrder.types";

const Page = () => {
  const pathname = usePathname();
  const pageTitle = usePageTitle();

  const [date, setDate] = useState<Date | undefined>();

  const [objFilterForm, setObjFilterForm] = useState({
    client: "",
    status: "",
    workorder: "",
    worker: "",
    creationdate: undefined as Date | undefined,
  });

  const [objFilterApplied, setObjFilterApplied] = useState({
    client: "",
    status: "",
    workorder: "",
    worker: "",
    creationdate: undefined as Date | undefined,
  });

  const resetTableList = () => {
    setObjFilterForm({
      client: "",
      status: "",
      workorder: "",
      worker: "",
      creationdate: undefined,
    });
    setObjFilterApplied({
      client: "",
      status: "",
      workorder: "",
      worker: "",
      creationdate: undefined,
    });
  };

  return (
    <>
      <div className="gap-4 flex flex-col  min-h-full ">
        <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
          <BackButton />
          <div className="flex flex-row gap-2">
            <Link
              href={`${pathname}/create`}
              className="btn bg-black rounded-full pr-3 py-6  sm:flex border-none"
            >
              <FiPlus className="text-xl text-white" />
              <span className="bg-gray-800 py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px]">
                New
              </span>
            </Link>
            <button className="btn bg-black rounded-full pr-3 py-6  sm:flex items-center justify-center border-none !hidden">
              <IoSearchOutline className="text-xl text-white" />
              <span className="bg-gray-800 py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px] ">
                Search
              </span>
            </button>
            <button className="btn bg-red-600 rounded-full pr-3 py-6 hidden sm:flex items-center justify-center border-none !hidden">
              <FiTrash2 className="text-xl text-white" />
              <span className="bg-red-500 py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px] ">
                Delete
              </span>
            </button>
          </div>
        </div>
        <div className="body-app overflow-y-auto">
          <div className="container max-w-full mb-5">
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
              <legend className="fieldset-legend text-lg">
                Search options
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <legend className="fieldset-legend text-lg font-normal">
                    Client
                  </legend>
                  <input
                    type="text"
                    className="input input-lg text-lg w-full"
                    placeholder="My awesome page"
                    onChange={(e) =>
                      setObjFilterForm({
                        ...objFilterForm,
                        client: e.target.value,
                      })
                    }
                    value={objFilterForm.client}
                  />
                </div>
                <div className="flex flex-col">
                  <legend className="fieldset-legend text-lg font-normal">
                    Status
                  </legend>
                  <select
                    defaultValue=""
                    className="select w-full text-lg input-lg"
                    onChange={(e) =>
                      setObjFilterForm({
                        ...objFilterForm,
                        status: e.target.value,
                      })
                    }
                  >
                    <option disabled={true} value="">
                      Pick a status
                    </option>

                    {Object.entries(WorkOrderStatusLabel).map(
                      ([key, label]) => (
                        <option key={key} value={key}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="flex flex-col">
                  <legend className="fieldset-legend text-lg font-normal">
                    Nro. Work order
                  </legend>
                  <input
                    type="text"
                    className="input input-lg text-lg w-full"
                    placeholder="My awesome page"
                    onChange={(e) =>
                      setObjFilterForm({
                        ...objFilterForm,
                        workorder: e.target.value,
                      })
                    }
                    value={objFilterForm.workorder}
                  />
                </div>
                <div className="flex flex-col">
                  <legend className="fieldset-legend text-lg font-normal">
                    Worker
                  </legend>
                  <input
                    type="text"
                    className="input input-lg text-lg w-full"
                    placeholder="My awesome page"
                    onChange={(e) =>
                      setObjFilterForm({
                        ...objFilterForm,
                        worker: e.target.value,
                      })
                    }
                    value={objFilterForm.worker}
                  />
                </div>
                <div className="flex flex-col">
                  <legend className="fieldset-legend text-lg font-normal">
                    Creation date
                  </legend>
                  <button
                    popoverTarget="rdp-popover"
                    className="input input-border input-lg text-lg w-full"
                    style={{ anchorName: "--rdp" } as React.CSSProperties}
                  >
                    {date ? date.toLocaleDateString() : "Pick a date"}
                  </button>
                  <div
                    popover="auto"
                    id="rdp-popover"
                    className="dropdown"
                    style={{ positionAnchor: "--rdp" } as React.CSSProperties}
                  >
                    <DayPicker
                      className="react-day-picker"
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <legend className="fieldset-legend text-lg font-normal hidden md:flex min-h-[32px]">
                    {" "}
                  </legend>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <button
                      className="btn bg-black rounded-full pr-3 py-6  sm:flex border-none flex-1"
                      onClick={() =>
                        setObjFilterApplied({
                          ...objFilterForm,
                          creationdate: date,
                        })
                      }
                    >
                      <IoSearchOutline className="text-xl text-white" />
                      <span className=" py-1 px-4 text-white font-normal rounded-full  md:block text-[13px] ">
                        Search
                      </span>
                    </button>
                    <button
                      className="btn bg-black/50 rounded-full pr-3 py-6  sm:flex border-none w-[50px]"
                      onClick={() => resetTableList()}
                    >
                      <MdOutlineSettingsBackupRestore className="text-2xl text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
          <div className="container mt-0 max-w-full">
            <TableList
              objFilter={{
                ...objFilterApplied,
                workorder: Number(objFilterApplied.workorder),
                creationdate: objFilterApplied.creationdate ?? new Date(),
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
