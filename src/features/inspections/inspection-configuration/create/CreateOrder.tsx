"use client";
import { COMPANY_INFO } from "@/config/constants";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const workItemSchema = z.object({
  code: z.string().optional(),
  description: z.string().min(1, "Required"),
  labor_time: z.string().min(1, "Required"),
  parts: z.string().optional(),
  total: z.string().optional(),
});

const orderSchema = z.object({
  customer_header: z.string().min(1, "Required"),
  order_title: z.string().min(1, "Required"),
  customer_order: z.string().min(1, "Required"),
  location_of_repair: z.string().min(1, "Required"),
  time_start_service: z.string().optional(),
  equipment_order: z.string().min(1, "Required"),
  datate_of_repair: z.string().min(1, "Required"),
  time_finish_service: z.string().optional(),
  license_plate: z.string().min(1, "Required"),
  po_number: z.string().optional(),
  vin_number: z.string().optional(),
  mechanic_name: z.string().min(1, "Required"),
  tires: z.object({
    rif: z.string().optional(),
    rof: z.string().optional(),
    rir: z.string().optional(),
    ror: z.string().optional(),
    lif: z.string().optional(),
    lof: z.string().optional(),
    lir: z.string().optional(),
    lor: z.string().optional(),
  }),
  work_items: z.array(workItemSchema).min(1, "Add at least one row"),
});

type OrderForm = z.infer<typeof orderSchema>;

interface CreateOrderProps {
  changeTitle?: (newTitle: string) => void;
}

const CreateOrder = ({ changeTitle }: CreateOrderProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      order_title: "Work Order",
      customer_header: `${COMPANY_INFO.name} Maintenance service ${COMPANY_INFO.phone} ${COMPANY_INFO.email}`,
      work_items: [],
      tires: {
        rif: "",
        rof: "",
        rir: "",
        ror: "",
        lif: "",
        lof: "",
        lir: "",
        lor: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_items",
  });

  const onSubmit = (data: OrderForm) => {
    console.log("\ud83d\udce6 Formulario enviado:", data);
  };

  const handleAddRow = () => {
    append({ code: "", description: "", labor_time: "", parts: "", total: "" });
  };

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5  p-2 mb-2 rounded-md">
        <div className="flex flex-row gap-2 items-center justify-center col-span-2">
          <span className="font-semibold w-[30%] md:w-[20%] break-words ">
            CLIENT
          </span>
          <input
            {...register("customer_order")}
            type="text"
            className={inputClass(!!errors.customer_order)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center col-span-1">
          <span className="font-semibold w-[30%] md:w-[20%] break-words">
            STATUS
          </span>
          <select
            defaultValue="Pick a color"
            className={` ${inputClass(
              !!errors.customer_order
            )}  appearance-auto`}
          >
            <option disabled={true}>Pick a color</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5  p-2 mb-6 rounded-md">
        <div className="flex flex-row gap-2 items-center justify-center col-span-2">
          <span className="font-semibold w-[30%] md:w-[20%] break-words ">
            NAME
          </span>
          <input
            {...register("customer_order", {
              onChange: (e) => {
                if (changeTitle) {
                  changeTitle(e.target.value);
                }
              },
            })}
            type="text"
            className={inputClass(!!errors.customer_order)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center col-span-1">
          <span className="font-semibold w-[30%] md:w-[20%] break-words">
            THEME
          </span>
          <select
            defaultValue="Pick a color"
            className={` ${inputClass(
              !!errors.customer_order
            )}  appearance-auto`}
          >
            <option disabled={true}>Pick a color</option>
            <option>Crimson</option>
            <option>Amber</option>
            <option>Velvet</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto"
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
