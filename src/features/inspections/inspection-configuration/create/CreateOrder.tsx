"use client";
import { COMPANY_INFO } from "@/config/constants";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormChassi from "../types-pdf/FormChassi/FormChassi";

interface CreateOrderProps {
  changeTitle?: (newTitle: string) => void;
}

const CreateOrder = ({ changeTitle }: CreateOrderProps) => {
  const [theme, setTheme] = useState<string>("");
  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  const labelClass = () => `font-medium w-[30%] break-words`;

  return (
    <form>
      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Client</span>
            <input type="text" className={inputClass(false)} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Status</span>
            <select
              defaultValue="Pick a color"
              className={` ${inputClass(false)}  appearance-auto`}
            >
              <option disabled={true}>Pick a color</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Name</span>
            <input type="text" className={inputClass(false)} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Theme</span>
            <select
              defaultValue="Pick a color"
              onChange={(e) => setTheme(e.target.value)}
              className={` ${inputClass(false)}  appearance-auto`}
            >
              <option disabled={true}>Pick a color</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Chassis</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mt-3 p-2">
          <div className="flex flex-col gap-2 items-left justify-center">
            <span className={`${labelClass()} !w-full`}>Description</span>
            <textarea
              className={`!text-left p-2 ${inputClass(false)}`}
              rows={3}
              placeholder="Write work description..."
            ></textarea>

            <button
              type="button"
              className="!hidden btn min-w-[30px] min-h-[39px] p-2 rounded-md mt-3"
            >
              Add group
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
        {theme == "Chassis" && <FormChassi></FormChassi>}
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled
          className="disabled:cursor-not-allowed disabled:!text-black btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto"
        >
          <span className="py-1 px-2 text-white font-normal rounded-full md:block text-[13px]">
            Save
          </span>
        </button>
      </div>
    </form>
  );
};

export default CreateOrder;
