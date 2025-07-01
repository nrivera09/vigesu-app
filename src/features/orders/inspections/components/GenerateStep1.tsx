"use client";
import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import {
  CustomerOption,
  TypeInspectionOption,
} from "@/features/orders/inspections/types/IInspectionSelect";
import { debounce } from "lodash";
import {
  IFullQuestion,
  IFullTypeInspection,
} from "../types/IFullTypeInspection";
import Loading from "@/shared/components/shared/Loading";

const GenerateStep1 = () => {
  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOption | null>(null);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const inputCustomerRef = useRef<HTMLInputElement>(null);

  const [typeOptions, setTypeOptions] = useState<TypeInspectionOption[]>([]);
  const [selectedType, setSelectedType] = useState<TypeInspectionOption | null>(
    null
  );

  const [inspectionData, setInspectionData] =
    useState<IFullTypeInspection | null>(null);

  const [objFilterForm, setObjFilterForm] = useState({ client: "" });

  // Búsqueda en tiempo real con debounce
  const debouncedSearchCustomer = useRef(
    debounce(async (value: string) => {
      if (value.length >= 3) {
        try {
          const response = await axiosInstance.get<CustomerOption[]>(
            `/QuickBooks/Customers/GetCustomerAll?search=${encodeURIComponent(
              value
            )}`
          );
          const filtered = (response.data ?? []).filter((item) =>
            item.name.toLowerCase().startsWith(value.toLowerCase())
          );
          setCustomerOptions(filtered);
          setShowCustomerDropdown(true);
        } catch (error) {
          console.error("Error buscando clientes:", error);
          setCustomerOptions([]);
        }
      } else {
        setCustomerOptions([]);
        setShowCustomerDropdown(false);
      }
    }, 500)
  ).current;

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setObjFilterForm({ client: value });
    debouncedSearchCustomer(value);

    // Si se borra el campo, reinicia todo
    if (!value.trim()) {
      resetFields();
    }
  };

  const handleCustomerSelect = (option: CustomerOption) => {
    setSelectedCustomer(option);
    setObjFilterForm({ client: option.name });
    setShowCustomerDropdown(false);
    setCustomerOptions([]);
    fetchTypeInspections(option.id);
  };

  const fetchTypeInspections = async (customerId: string) => {
    try {
      const res = await axiosInstance.get<{ items: TypeInspectionOption[] }>(
        "/TypeInspection"
      );
      const filtered = res.data.items.filter(
        (item) => item.customerId === customerId || item.customerId === "0"
      );
      setTypeOptions(filtered);
    } catch (err) {
      console.error("Error cargando tipos de inspección", err);
    }
  };

  const handleTypeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const found = typeOptions.find(
      (type) => type.typeInspectionId === parseInt(e.target.value)
    );
    setSelectedType(found ?? null);

    if (found) {
      try {
        const res = await axiosInstance.get<IFullTypeInspection>(
          `/TypeInspection/GetFullTypeInspectionId?TypeInspectionId=${found.typeInspectionId}`
        );
        setInspectionData(res.data);
      } catch (err) {
        console.error("Error al obtener datos completos de inspección", err);
      }
    } else {
      setInspectionData(null);
    }
  };

  const resetFields = () => {
    setSelectedCustomer(null);
    setSelectedType(null);
    setTypeOptions([]);
    setInspectionData(null);
    setObjFilterForm({ client: "" });
    if (inputCustomerRef.current) inputCustomerRef.current.value = "";
    setCustomerOptions([]);
    setShowCustomerDropdown(false);
  };

  return (
    <>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend text-lg">Generator options</legend>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
          {/* Client */}
          <div className="flex flex-col">
            <legend className="fieldset-legend text-lg font-normal">
              Client
            </legend>
            <div className="relative">
              <input
                type="text"
                className="input input-lg text-lg w-full"
                name="customer_order"
                value={objFilterForm.client}
                onChange={handleCustomerChange}
                ref={inputCustomerRef}
                autoComplete="off"
              />
              {showCustomerDropdown && customerOptions.length > 0 && (
                <ul className="bg-base-100 w-full rounded-box shadow-md z-50 max-h-60 overflow-y-auto relative mt-1">
                  {customerOptions.map((option) => (
                    <li key={option.id} className="cursor-pointer text-sm">
                      <button
                        type="button"
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleCustomerSelect(option)}
                      >
                        {option.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Tipo de inspección */}
          <div className="flex flex-col">
            <legend className="fieldset-legend text-lg font-normal">
              Tipo de inspección
            </legend>
            <select
              className="select w-full text-lg input-lg"
              disabled={!typeOptions.length}
              onChange={handleTypeChange}
            >
              <option value="">Seleccione una opción</option>
              {typeOptions.map((type) => (
                <option
                  key={type.typeInspectionId}
                  value={type.typeInspectionId}
                >
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Botones */}
          <div className="flex flex-col !hidden">
            <legend className="fieldset-legend text-lg font-normal hidden md:flex min-h-[32px]">
              {" "}
            </legend>
            <div className="flex flex-row items-center justify-center gap-2">
              <button
                className="btn bg-black rounded-full pr-3 py-6 sm:flex border-none flex-1"
                onClick={() => console.log({ selectedCustomer, selectedType })}
              >
                <IoSearchOutline className="text-xl text-white" />
                <span className="py-1 px-4 text-white font-normal rounded-full md:block text-[13px]">
                  Search
                </span>
              </button>
              <button
                className="btn bg-black/50 rounded-full pr-3 py-6 sm:flex border-none w-[50px]"
                onClick={resetFields}
              >
                <MdOutlineSettingsBackupRestore className="text-2xl text-white" />
              </button>
            </div>
          </div>
        </div>
      </fieldset>

      {!inspectionData && <Loading height="h-[300px]" />}
      {/* Grupos (cards) */}
      <div className="cont my-5 flex flex-col gap-4">
        {inspectionData &&
          Object.entries(
            inspectionData.questions.reduce((acc, question) => {
              if (!acc[question.groupName]) acc[question.groupName] = [];
              acc[question.groupName].push(question);
              return acc;
            }, {} as Record<string, IFullQuestion[]>)
          ).map(([groupName, questions]) => (
            <div
              key={groupName}
              className="cursor-pointer border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white hover:shadow-sm transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-300 rounded-full" />
                <h2 className="text-lg font-medium">Grupo {groupName}</h2>
              </div>
              <span
                className={`text-xl font-bold ${
                  questions.length >= 2 ? "text-red-500" : "text-green-500"
                }`}
              >
                {questions.length}
              </span>
            </div>
          ))}
      </div>
    </>
  );
};

export default GenerateStep1;
