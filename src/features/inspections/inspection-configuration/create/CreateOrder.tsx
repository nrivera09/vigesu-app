// ✅ Nuevo formulario con Zod y react-hook-form para validación cruzada
"use client";

import { COMPANY_INFO } from "@/config/constants";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormChassi from "../types-pdf/FormChassi/FormChassi";
import { debounce } from "lodash";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { CustomerOption } from "@/shared/utils/orderMapper";
import { WorkOrderStatusLabel } from "../../models/inspections.types";

interface CreateOrderProps {
  changeTitle?: (newTitle: string) => void;
}

const baseSchema = z
  .object({
    client: z.string().min(1, "Client is required"),
    status: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    theme: z.string(),
    licenseNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.theme === "Periodic chassi and trailer inspection" &&
      (!data.licenseNumber || data.licenseNumber.trim() === "")
    ) {
      ctx.addIssue({
        path: ["licenseNumber"],
        code: "custom",
        message: "License number is required when theme is chassi",
      });
    }
  });

const CreateOrder = ({ changeTitle }: CreateOrderProps) => {
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOption | null>(null);

  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const inputCustomerRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
    trigger,
  } = useForm<z.infer<typeof baseSchema>>({
    resolver: zodResolver(baseSchema),
    mode: "onChange",
    defaultValues: {
      client: "",
      status: "",
      name: "",
      theme: "",
      licenseNumber: "",
    },
  });

  const [objFilterForm, setObjFilterForm] = useState({
    client: "",
    status: "",
    workorder: "",
    worker: "",
    creationdate: undefined as Date | undefined,
  });

  // Handle Customer Input
  const searchCustomer = async (name?: string) => {
    try {
      let url = `/QuickBooks/Customers/GetCustomerName?RealmId=9341454759827689`;
      if (name) url += `&Name=${encodeURIComponent(name)}`;
      const response = await axiosInstance.get(url);
      setCustomerOptions(response.data ?? []);
    } catch (error) {
      console.error("Error buscando clientes:", error);
    }
  };

  const debouncedSearchCustomer = useRef(
    debounce((value: string) => {
      if (value.length >= 3) {
        searchCustomer(value);
      } else {
        setCustomerOptions([]);
      }
    }, 500)
  ).current;

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShowCustomerDropdown(true);
    debouncedSearchCustomer(value);
    setObjFilterForm({ ...objFilterForm, client: value });
  };

  const currentTheme = watch("theme");
  const licenseNumberValue = watch("licenseNumber");

  useEffect(() => {
    trigger(); // 👈 fuerza validación general al cambiar theme o license
  }, [currentTheme, licenseNumberValue]);

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;
  const labelClass = () => `font-medium w-[30%] break-words`;

  const onSubmit = (data: z.infer<typeof baseSchema>) => {
    console.log("✅ Valid data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className="font-medium w-[30%] break-words">Client</span>
            <div className="relative flex-1">
              <input
                type="text"
                className={inputClass(!!errors.name)}
                name="customer_order"
                value={objFilterForm.client}
                onChange={handleCustomerChange}
                ref={inputCustomerRef}
                autoComplete="off"
              />
              {showCustomerDropdown && (
                <ul className="bg-base-100 w-full rounded-box shadow-md z-50 max-h-60 overflow-y-auto absolute mt-1">
                  {customerOptions.map((option, idx) => (
                    <li key={option.id} className="cursor-pointer text-sm">
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => {
                          if (inputCustomerRef.current) {
                            inputCustomerRef.current.value = option.name;
                            setObjFilterForm({
                              ...objFilterForm,
                              client: option.name,
                            });
                            setShowCustomerDropdown(false);
                            setCustomerOptions([]);
                            debouncedSearchCustomer.cancel();
                          }
                        }}
                      >
                        {option.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Status</span>
            <select
              defaultValue=""
              className={inputClass(!!errors.status)}
              {...register("status")}
            >
              <option disabled value="">
                Pick a status
              </option>
              {Object.entries(WorkOrderStatusLabel).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Name</span>
            <input
              type="text"
              className={inputClass(!!errors.name)}
              {...register("name")}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Theme</span>
            <select
              defaultValue=""
              className={inputClass(!!errors.theme)}
              {...register("theme")}
            >
              <option disabled value="">
                Pick a theme
              </option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Periodic chassi and trailer inspection</option>
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

      {currentTheme === "Periodic chassi and trailer inspection" && (
        <FormChassi register={register} errors={errors} />
      )}

      <div className="pt-4">
        <button
          type="submit"
          disabled={!isValid}
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
