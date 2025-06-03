"use client";
import { COMPANY_INFO } from "@/config/constants";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const workItemSchema = z.object({
  code: z.string().min(1, "Required"),
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
  time_start_service: z.string().min(1, "Required"),
  equipment_order: z.string().optional(),
  datate_of_repair: z.string().optional(),
  time_finish_service: z.string().optional(),
  license_plate: z.string().optional(),
  po_number: z.string().optional(),
  vin_number: z.string().optional(),
  mechanic_name: z.string().optional(),
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

const CreateOrder = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
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
    `input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div role="alert" className="alert alert-info alert-soft mb-5 text-lg">
        <span>
          All the grey spaces are editable, meaning you can write on them and
          add the required data.
        </span>
      </div>

      <div className="rounded-md">
        <input
          {...register("customer_header")}
          type="text"
          className={inputClass(!!errors.customer_header)}
          value={`${COMPANY_INFO.name} Maintenance service ${COMPANY_INFO.phone} ${COMPANY_INFO.email}`}
        />
      </div>

      <div className="my-3 rounded-md">
        <input
          {...register("order_title")}
          type="text"
          className="input input-lg h-auto w-full border-none text-left font-bold text-7xl transition-all bg-[#f6f3f4]"
          value="Work Order"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 border-[#00000014] border-1 p-2 mb-6 rounded-md">
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">CUSTOMER</span>
          <input
            {...register("customer_order")}
            type="text"
            className={inputClass(!!errors.customer_order)}
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">LOCATION OF REPAIR</span>
          <input
            {...register("location_of_repair")}
            type="text"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">TIME START SERVICE</span>
          <input
            {...register("time_start_service")}
            type="time"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 border-[#00000014] border-1 p-2 rounded-md mb-6">
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">Equipment#</span>
          <input
            {...register("equipment_order")}
            type="text"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">Date of Repair</span>
          <input
            {...register("datate_of_repair")}
            type="datetime-local"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">Time Finish Service</span>
          <input
            {...register("time_finish_service")}
            type="time"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-[#00000014] border-1 p-2 rounded-md mb-6">
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">LICENSE PLATE#</span>
          <input
            {...register("license_plate")}
            type="text"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">PO#</span>
          <input
            {...register("po_number")}
            type="text"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-[#00000014] border-1 p-2 rounded-md mb-6">
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">VIN#</span>
          <input
            {...register("vin_number")}
            type="text"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
        <div className="flex flex-row gap-2 items-center justify-center">
          <span className="font-bold">MECHANIC NAME</span>
          <input
            {...register("mechanic_name")}
            type="text"
            className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-box border-[#00000014] border-1 mb-6">
        <table className="table w-full">
          <thead>
            <tr className="border-b-[#00000014]">
              <th className="text-black text-center w-[10%]">CODE</th>
              <th className="text-black text-center w-[40%]">
                WORK DESCRIPTION
              </th>
              <th className="text-black text-center w-[10%]">LABOR TIME</th>
              <th className="text-black text-center w-[15%]">PARTS</th>
              <th className="text-black text-center w-[15%]">TOTAL</th>
              <th className="text-black text-center w-[5%]"></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => (
              <tr key={field.id} className="border-b-[#00000014]">
                <th className="text-center">
                  <input
                    {...register(`work_items.${index}.code`)}
                    type="text"
                    className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-center text-lg font-normal"
                  />
                </th>
                <td className="text-center">
                  <input
                    {...register(`work_items.${index}.description`)}
                    type="text"
                    className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-center text-lg font-normal"
                  />
                </td>
                <td className="text-center">
                  <input
                    {...register(`work_items.${index}.labor_time`)}
                    type="time"
                    className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-center text-lg font-normal"
                  />
                </td>
                <td className="text-center">
                  <input
                    {...register(`work_items.${index}.parts`)}
                    type="text"
                    className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-center text-lg font-normal"
                  />
                </td>
                <td className="text-center">
                  <input
                    {...register(`work_items.${index}.total`)}
                    type="text"
                    className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-center text-lg font-normal"
                  />
                </td>
                <td className="text-center">
                  <button
                    onClick={() => remove(index)}
                    className="btn min-w-[30px] min-h-[30px] p-2 rounded-md"
                  >
                    <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex flex-row items-center justify-end p-4">
          <button
            type="button"
            onClick={handleAddRow}
            className="btn input-lg text-lg font-normal bg-dark text-white border-none rounded-full"
          >
            Add row
          </button>
        </div>
      </div>

      <div>
        <p className="font-bold mb-2">Tires Tread Deep</p>
        <div className="grid grid-cols-4 gap-2 gap-y-4 border-[#00000014] border-1 p-2 mb-6 rounded-md">
          {(
            ["rif", "rof", "rir", "ror", "lif", "lof", "lir", "lor"] as const
          ).map((key) => (
            <div
              key={key}
              className="flex flex-row gap-2 items-center justify-center"
            >
              <span className="font-bold">{key.toUpperCase()}</span>
              <input
                {...register(`tires.${key}` as const)}
                type="text"
                className={`input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-8">
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
