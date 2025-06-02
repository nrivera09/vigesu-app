"use client";

import TableList from "@/features/inspections/inspection-configuration/TableList";
import BackButton from "@/shared/components/shared/BackButton";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";

const workOrderTemplate = {
  header: {
    title: { value: "Visegu Maintenance service", type: "text" },
    phone: { value: "(510)719-1444", type: "text" },
    email: { value: "percyruiz@visegu.com", type: "text" },
  },
  work_order: {
    customer: { value: "GSC2", type: "text" },
    location_of_repair: { value: "512", type: "text" },
    time_start_service: { value: "", type: "text" },
    equipment: { value: "GSC2 71260", type: "text" },
    date_of_repair: { value: "7-18-24", type: "text" },
    time_finish_service: { value: "", type: "text" },
    license_plate: { value: "1592637 TIV", type: "text" },
    po_number: { value: "", type: "text" },
    vin: { value: "EISO 91907324", type: "text" },
    mechanic_name: { value: "GUSTAVO", type: "text" },
  },
  tasks: {
    dynamic: true,
    items: [
      {
        code: { value: "", type: "text" },
        work_description: {
          value: "REPLACE ONE TIRE HD225 - RECAP (20F)",
          type: "text",
        },
        labor_time: { value: "", type: "text" },
        parts: { value: "", type: "text" },
        total: { value: "", type: "text" },
      },
    ],
  },
  tire_tread_depth: {
    RIF: { value: "", type: "text" },
    ROF: { value: "", type: "text" },
    RIR: { value: "", type: "text" },
    ROR: { value: "", type: "text" },
    LIF: { value: "", type: "text" },
    LOF: { value: "", type: "text" },
    LIR: { value: "", type: "text" },
    LOR: { value: "", type: "text" },
  },
};

const Page = () => {
  const pathname = usePathname();
  const pageTitle = usePageTitle();

  const [title, setTitle] = useState<string>(pageTitle);
  const [selectedTheme, setSelectedTheme] = useState("");
  const [form, setForm] = useState(workOrderTemplate);

  const handleChange =
    (section, field, index = null) =>
    (e) => {
      const value = e.target.value;
      setForm((prev) => {
        const updated = { ...prev };
        if (index !== null && section === "tasks") {
          updated.tasks.items[index][field].value = value;
        } else {
          updated[section][field].value = value;
        }
        return updated;
      });
    };

  const addTask = () => {
    const newTask = {
      code: { value: "", type: "text" },
      work_description: { value: "", type: "text" },
      labor_time: { value: "", type: "text" },
      parts: { value: "", type: "text" },
      total: { value: "", type: "text" },
    };
    setForm((prev) => ({
      ...prev,
      tasks: {
        ...prev.tasks,
        items: [...prev.tasks.items, newTask],
      },
    }));
  };

  const renderField = (label, value, onChange) => (
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
      <legend className="fieldset-legend capitalize">
        {label.replace(/_/g, " ")}
      </legend>
      <input
        type="text"
        className="input w-full"
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label}`}
      />
    </fieldset>
  );

  return (
    <div className="gap-4 flex flex-col min-h-full">
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <BackButton />
      </div>
      <div className="boddy-app overflow-y-auto pb-[100px]">
        <div className="container max-w-full mb-5">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
            <legend className="fieldset-legend text-lg">
              Template settings
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <legend className="fieldset-legend text-lg font-normal">
                  Client
                </legend>
                <input
                  type="text"
                  className="input input-lg text-lg w-full"
                  placeholder="My awesome page"
                />
              </div>
              <div className="flex flex-col">
                <legend className="fieldset-legend text-lg font-normal">
                  Status
                </legend>
                <select
                  defaultValue="Pick a color"
                  className="select w-full text-lg input-lg"
                >
                  <option disabled={true}>Selected a theme</option>
                  <option>Work box</option>
                  <option>Amber</option>
                  <option>Velvet</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <legend className="fieldset-legend text-lg font-normal">
                  Name
                </legend>
                <input
                  type="text"
                  className="input input-lg text-lg w-full"
                  placeholder="My awesome page"
                />
              </div>
              <div className="flex flex-col">
                <legend className="fieldset-legend text-lg font-normal">
                  Theme
                </legend>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="select w-full text-lg input-lg"
                >
                  <option disabled={true}>Selected a theme</option>
                  <option>Amber</option>
                  <option>Velvet</option>
                  <option>Work order</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <legend className="fieldset-legend text-lg font-normal">
                  Description
                </legend>
                <textarea
                  className="textarea w-full h-24 input-lg text-lg "
                  placeholder="Bio"
                ></textarea>
              </div>
            </div>
          </fieldset>
        </div>

        {selectedTheme === "Work order" && (
          <div className="container renderForm max-w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(form.header).map(([key, val]) =>
                renderField(key, val.value, handleChange("header", key))
              )}
              {Object.entries(form.work_order).map(([key, val]) =>
                renderField(key, val.value, handleChange("work_order", key))
              )}
            </div>

            <div className="grid grid-cols-1 gap-4 my-10">
              {form.tasks.items.map((task, i) => (
                <React.Fragment key={i}>
                  {Object.entries(task).map(([key, val]) =>
                    renderField(
                      `${key} (${i + 1})`,
                      val.value,
                      handleChange("tasks", key, i)
                    )
                  )}
                </React.Fragment>
              ))}
              {form.tasks.dynamic && (
                <button
                  type="button"
                  className="btn btn-primary w-fit"
                  onClick={addTask}
                >
                  Agregar tarea
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(form.tire_tread_depth).map(([key, val]) =>
                renderField(
                  key,
                  val.value,
                  handleChange("tire_tread_depth", key)
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
