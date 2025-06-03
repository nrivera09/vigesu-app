"use client";

import BackButton from "@/shared/components/shared/BackButton";
import React, { useState } from "react";
import { FaMinus, FaPlus, FaPlusCircle } from "react-icons/fa";

const initialForm = {
  header: {
    title: "Visegu Maintenance service",
    phone: "(510)719-1444",
    email: "percyruiz@visegu.com",
  },
  work_order: {
    customer: "",
    location_of_repair: "",
    time_start_service: "",
    equipment: "",
    date_of_repair: "",
    time_finish_service: "",
    license_plate: "",
    po_number: "",
    vin: "",
    mechanic_name: "",
  },
  tasks: {
    dynamic: true,
    items: [
      { code: "", work_description: "", labor_time: "", parts: "", total: "" },
    ],
  },
  tire_tread_depth: {
    RIF: "",
    ROF: "",
    RIR: "",
    ROR: "",
    LIF: "",
    LOF: "",
    LIR: "",
    LOR: "",
  },
};

const Page = () => {
  const [form, setForm] = useState(initialForm);

  type SectionKey = "header" | "work_order" | "tire_tread_depth";
  type HeaderField = keyof typeof initialForm.header;
  type WorkOrderField = keyof typeof initialForm.work_order;
  type TireTreadField = keyof typeof initialForm.tire_tread_depth;

  const handleChange = (
    section: SectionKey,
    field: HeaderField | WorkOrderField | TireTreadField,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as SectionKey],
        [field]: value,
      },
    }));
  };

  type TaskKey = "code" | "work_description" | "labor_time" | "parts" | "total";

  const handleTaskChange = (index: number, key: TaskKey, value: string) => {
    const updated = [...form.tasks.items];
    updated[index][key] = value;
    setForm((prev) => ({ ...prev, tasks: { ...prev.tasks, items: updated } }));
  };

  const addTask = () => {
    setForm((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        items: [
          ...prev.tasks.items,
          {
            code: "",
            work_description: "",
            labor_time: "",
            parts: "",
            total: "",
          },
        ],
      },
    }));
  };

  const removeTask = () => {
    setForm((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        items: prev.tasks.items.slice(0, -1),
      },
    }));
  };

  const handleSave = () => {
    console.log("Datos del formulario:", form);
  };

  return (
    <>
      <div className="gap-4 flex flex-col  min-h-full ">
        <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
          <BackButton />
        </div>
        <div className="body-app overflow-y-auto pb-[100px]">
          <div className="container max-w-full">
            {/* WORK ORDER SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(form.work_order).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                  <legend className=" fieldset-legend text-lg font-normal capitalize">
                    {key.replace(/_/g, " ")}
                  </legend>
                  <input
                    id={key}
                    value={val}
                    onChange={(e) =>
                      handleChange(
                        "work_order",
                        key as WorkOrderField,
                        e.target.value
                      )
                    }
                    className="input input-lg w-full text-lg bg-[#f8f8f8] border border-[#00000003]"
                    type="text"
                  />
                </div>
              ))}
            </div>

            {/* TASKS SECTION */}
            <div className="overflow-x-auto my-5">
              <table className="table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Work Description</th>
                    <th>Labor Time</th>
                    <th>Parts</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {form.tasks.items.map((item, i) => (
                    <tr key={i} className=" odd:bg-base-200">
                      {Object.entries(item).map(([key, val]) => (
                        <td key={key}>
                          <input
                            type="text"
                            className="input input-lg text-lg w-full "
                            value={val}
                            onChange={(e) =>
                              handleTaskChange(
                                i,
                                key as TaskKey,
                                e.target.value
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex gap-2 mt-2">
                <button className="btn " onClick={addTask}>
                  <FaPlus className="size-4" />
                </button>
                {form.tasks.items.length > 1 && (
                  <button className="btn " onClick={removeTask}>
                    <FaMinus className="size-4 " />
                  </button>
                )}
              </div>
            </div>

            {/* TIRE TREAD SECTION */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(form.tire_tread_depth).map(([key, val]) => (
                <div key={key} className="flex flex-col">
                  <label htmlFor={key} className="font-semibold">
                    {key}
                  </label>
                  <input
                    id={key}
                    value={val}
                    onChange={(e) =>
                      handleChange(
                        "tire_tread_depth",
                        key as TireTreadField,
                        e.target.value
                      )
                    }
                    className="input input-lg text-lg w-full bg-[#f8f8f8] border border-[#00000003]"
                    type="text"
                  />
                </div>
              ))}
            </div>

            {/* SAVE BUTTON */}
            <div className="pt-8">
              <button
                className="btn font-normal bg-black text-white rounded-full pr-3 py-6  sm:flex border-none flex-1 w-full md:w-[300px] mx-auto"
                onClick={handleSave}
              >
                <span className=" py-1 px-4 text-white font-normal rounded-full  md:block text-[13px] ">
                  Guardar
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
