"use client";
import { COMPANY_INFO } from "@/config/constants";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ImageUploader from "./ImageUploader";
import { TbArrowDownToArc } from "react-icons/tb";
import { IoAddCircleOutline } from "react-icons/io5";

const workItemSchema = z.object({
  description: z.string().min(1, "Required"),
  parts: z.string().min(1, "Required"),
  quantity: z.string().min(1, "Required"),
});

const orderSchema = z.object({
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
    cif: z.string().optional(),
    cof: z.string().optional(),
    cir: z.string().optional(),
    co: z.string().optional(),
  }),
  work_items: z.array(workItemSchema).min(1, "Add at least one row"),
});

type OrderForm = z.infer<typeof orderSchema>;

const CreateOrder = () => {
  const [newItem, setNewItem] = useState({
    description: "",
    parts: "",
    quantity: "",
  });
  const [newItemError, setNewItemError] = useState<string | null>(null);

  const [files, setFiles] = useState<File[]>([]);

  const getTodayLocalDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

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
        cif: "",
        cof: "",
        cir: "",
        co: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_items",
  });

  const onSubmit = (data: OrderForm) => {
    const imagesData = files.map((file) => ({ nombre: file.name }));

    const payload = {
      ...data,
      createWorkOrderImages: imagesData,
      customerId: 0,
    };

    console.log("📦 Formulario enviado:", payload);
  };

  const handleAddRow = () => {
    const result = workItemSchema.safeParse(newItem);
    if (!result.success) {
      setNewItemError(result.error.issues[0]?.message || "Invalid input");
      return;
    }
    append(result.data);
    setNewItem({ description: "", parts: "", quantity: "" });
    setNewItemError(null);
  };

  const handleNewItemChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({ ...prev, [name]: value }));
  };

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  const labelClass = () => `font-medium w-[30%] break-words`;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div role="alert" className="alert alert-info alert-soft mb-5 text-lg">
        <span>
          All the grey spaces are editable, meaning you can write on them and
          add the required data.
        </span>
      </div>

      <div className=" border-[#00000014] border-1 p-2 mb-6 rounded-md flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Customer</span>
            <input
              {...register("customer_order")}
              type="text"
              className={inputClass(!!errors.customer_order)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Location of repair</span>
            <input
              {...register("location_of_repair")}
              type="text"
              className={inputClass(!!errors.location_of_repair)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Time start service</span>
            <input
              {...register("time_start_service")}
              type="time"
              defaultValue={getCurrentTime()}
              className={inputClass(!!errors.time_start_service)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Equipment#</span>
            <input
              {...register("equipment_order")}
              type="text"
              className={inputClass(!!errors.equipment_order)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Date of Repair</span>
            <input
              {...register("datate_of_repair")}
              type="date"
              defaultValue={getTodayLocalDate()}
              className={inputClass(!!errors.datate_of_repair)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Time finish service</span>
            <input
              {...register("time_finish_service")}
              type="time"
              className={inputClass(!!errors.time_finish_service)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>License plate #</span>
            <input
              {...register("license_plate")}
              type="text"
              className={inputClass(!!errors.license_plate)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>PO#</span>
            <input
              {...register("po_number")}
              type="text"
              className={inputClass(!!errors.po_number)}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>VIN#</span>
            <input
              {...register("vin_number")}
              type="text"
              className={inputClass(!!errors.vin_number)}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Mechanic name</span>
            <input
              {...register("mechanic_name")}
              type="text"
              className={inputClass(!!errors.mechanic_name)}
            />
          </div>
        </div>
      </div>

      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-4 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Service/Parts</span>
            <input
              name="parts"
              value={newItem.parts}
              onChange={handleNewItemChange}
              className={inputClass(
                !!newItemError && newItem.parts.trim() === ""
              )}
              type="text"
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className={labelClass()}>Quantity</span>
            <input
              name="quantity"
              value={newItem.quantity}
              onChange={handleNewItemChange}
              className={inputClass(
                !!newItemError && newItem.quantity.trim() === ""
              )}
              type="number"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <div className="flex flex-col gap-2 items-left justify-center">
            <span className={`${labelClass()} !w-full`}>Work description</span>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleNewItemChange}
              className={`!text-left p-2 ${inputClass(
                !!newItemError && newItem.description.trim() === ""
              )}`}
              rows={3}
              placeholder="Write work description..."
            ></textarea>

            <button
              type="button"
              onClick={handleAddRow}
              className="btn min-w-[30px] min-h-[39px] p-2 rounded-md mt-3"
            >
              <IoAddCircleOutline className="text-2xl" />
              Add row
            </button>
          </div>
        </div>
        <div className="overflow-x-auto rounded-box border-[#00000014] border-1 ">
          <table className="table w-full">
            <thead className="bg-[#191917]">
              <tr className="border-b-[#00000014]">
                <th className=" text-center w-[40%] text-white font-medium">
                  Work description
                </th>
                <th className=" text-center w-[15%] text-white font-medium">
                  Service/parts
                </th>
                <th className=" text-center w-[15%] text-white font-medium">
                  Quantity
                </th>
                <th className=" text-center w-[5%] text-white font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {fields.map((field, index) => (
                <tr key={field.id} className="border-b-[#00000014]">
                  <td className="text-center">
                    <input
                      {...register(`work_items.${index}.parts`)}
                      type="text"
                      readOnly
                      className={`${inputClass(
                        false
                      )} bg-white border-none focus:outline-none focus:ring-0 focus:border-none`}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      {...register(`work_items.${index}.quantity`)}
                      type="text"
                      className={`${inputClass(
                        false
                      )} bg-white border-none focus:outline-none focus:ring-0 focus:border-none`}
                    />
                  </td>
                  <td className="text-center">
                    <input
                      {...register(`work_items.${index}.description`)}
                      type="text"
                      className={`${inputClass(
                        false
                      )} bg-white border-none focus:outline-none focus:ring-0 focus:border-none`}
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
        </div>
      </div>

      <div>
        <p className="font-bold mb-2">Tires Tread Deep</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 gap-y-4 border-[#00000014] border-1 p-3 mb-6 rounded-md">
          {(
            [
              "rif",
              "rof",
              "rir",
              "ror",
              "lif",
              "lof",
              "lir",
              "lor",
              "cif",
              "cof",
              "cir",
              "co",
            ] as const
          ).map((key) => (
            <div
              key={key}
              className="flex flex-row gap-2 items-center justify-center"
            >
              <span className={labelClass()}>{key.toUpperCase()}</span>
              <input
                {...register(`tires.${key}` as const)}
                type="text"
                className={`input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden">
        <ImageUploader
          onFilesChange={(files) => setFiles(files)}
          accept={{
            "image/*": [],
            "application/pdf": [],
            "application/msword": [],
          }}
        />
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
