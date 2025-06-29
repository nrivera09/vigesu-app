// ✅ Nuevo formulario con Zod y react-hook-form para validación cruzada
"use client";

import { COMPANY_INFO } from "@/config/constants";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm, UseFormRegister, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormChassi from "../types-pdf/FormChassiEdit/FormChassi";
import { debounce } from "lodash";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { CustomerOption } from "@/shared/utils/orderMapper";
import { WorkOrderStatusLabel } from "../../models/inspections.types";
import {
  ExportedAnswer,
  ExportedQuestion,
} from "@/shared/types/inspection/ITypes";
import Loading from "@/shared/components/shared/Loading";
import AlertInfo from "@/shared/components/shared/AlertInfo";
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";
import {
  InspectionStatus,
  InspectionStatusLabel,
} from "../models/typeInspection";
import { MdEdit } from "react-icons/md";

interface EditOrderProps {
  changeTitle?: (newTitle: string) => void;
  isLoadingStatus?: () => void;
}

const baseSchema = z.object({
  client: z.string().min(1, "Client is required"),
  status: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  theme: z.string().min(1, "Template is required"),
  description: z.string().optional(),
});

const EditOrder = ({ changeTitle }: EditOrderProps) => {
  const { id } = useParams<{ id: string }>();
  const initialQuestionsRef = useRef<ExportedQuestion[] | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const [exportedQuestions, setExportedQuestions] = useState<
    ExportedQuestion[]
  >([]);

  const [templates, setTemplates] = useState<{ id: number; name: string }[]>(
    []
  );
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>("");

  const [selectedCustomer, setSelectedCustomer] =
    useState<CustomerOption | null>(null);

  const [customerOptions, setCustomerOptions] = useState<CustomerOption[]>([]);
  const [showCustomerDropdown, setShowCustomerDropdown] = useState(false);
  const [hasAtLeastOneQuestion, setHasAtLeastOneQuestion] = useState(false);
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
      description: "",
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
  const currentTemplateId = watch("theme");

  const getCustomerName = async (customerId: string) => {
    if (!customerId) return "";
    const res = await axiosInstance.get(
      `/QuickBooks/Customers/GetCustomerId?CustomerId=${customerId}&RealmId=9341454759827689`
    );
    return res.data?.name ?? "";
  };

  useEffect(() => {
    trigger();
  }, [currentTheme]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [templateRes, inspectionRes] = await Promise.all([
          axiosInstance.get("/TemplateInspection"),
          axiosInstance.get(
            `/TypeInspection/GetTypeInspectionId?TypeInspectionId=${id}`
          ),
        ]);

        const items = templateRes.data.items;
        setTemplates(
          items.map((t: { templateInspectionId: number; name: string }) => ({
            id: t.templateInspectionId,
            name: t.name,
          }))
        );

        const data = inspectionRes.data;

        setValue("client", data.customerName);
        setValue("status", String(data.status));
        setValue("name", data.name);
        setValue("theme", String(data.templateInspectionId));
        setValue("description", data.description ?? "");

        const customerName = await getCustomerName(String(data.customerId));

        setSelectedCustomer({
          id: Number(data.customerId),
          name: customerName,
        });

        setObjFilterForm((prev) => ({
          ...prev,
          client: customerName,
        }));

        setValue("client", customerName);

        const mappedQuestions: ExportedQuestion[] =
          data.typeInspectionQuestions.map((q: ExportedQuestion) => ({
            typeInspectionDetailId: q.typeInspectionDetailId ?? 0,
            templateInspectionQuestionId: q.templateInspectionQuestionId,
            question: q.question,
            typeQuestion: q.typeQuestion,
            groupId: q.groupId,
            status: q.status,
            typeInspectionDetailAnswers: q.typeInspectionDetailAnswers.map(
              (a: ExportedAnswer) => ({
                response: a.response,
                color: a.color,
                usingItem: a.usingItem,
                isPrintable: a.isPrintable,
                subTypeInspectionDetailAnswers:
                  a.subTypeInspectionDetailAnswers ?? [], // ← ahora string[]
              })
            ),
          }));

        if (!initialQuestionsRef.current) {
          initialQuestionsRef.current = mappedQuestions;
          setExportedQuestions(mappedQuestions);
          setHasAtLeastOneQuestion(mappedQuestions.length > 0);
        }
        setHasAtLeastOneQuestion(mappedQuestions.length > 0);
      } catch (err) {
        console.error("Error al cargar datos iniciales", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const selected = templates.find((t) => String(t.id) === currentTemplateId);
    setSelectedTemplateName(selected?.name ?? "");
  }, [currentTemplateId, templates]);

  useEffect(() => {
    console.log("ExportedQuestions actualizados:", exportedQuestions);
  }, [exportedQuestions]);

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;
  const labelClass = () => `font-medium w-[30%] break-words`;

  const onSubmit = async (data: z.infer<typeof baseSchema>) => {
    if (!hasAtLeastOneQuestion) {
      alert("Debe agregar al menos una pregunta con respuestas");
      return;
    }

    const payload = {
      typeInspectionId: Number(id), // ✅ aquí lo agregamos
      templateInspectionId: Number(currentTemplateId),
      customerId: String(selectedCustomer?.id ?? ""),
      customerName: data.client,
      name: data.name,
      description: data.description,
      status: Number(data.status) || InspectionStatus.Active,
      typeInspectionQuestions: exportedQuestions,
    };

    try {
      await axiosInstance.put(`/TypeInspection/${id}`, payload);
      toast.success("Orden editada correctamente");
      router.push("../");
    } catch (error) {
      toast.error("Error al guardar los cambios");
      console.error(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <AlertInfo>
        All the grey spaces are editable, meaning you can write on them and add
        the required data.
      </AlertInfo>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
            <div className="flex flex-row gap-2 items-center justify-center col-span-1">
              <span className="font-medium w-[30%] break-words">Client</span>

              {selectedCustomer ? (
                <div className="flex flex-1 items-center gap-2">
                  <span className="truncate w-0 flex-1 px-2">
                    {selectedCustomer.name}
                  </span>
                  <button
                    type="button"
                    className="btn p-2 btn-xs bg-transparent hover:shadow-none border-none flex items-center justify-center"
                    onClick={() => {
                      setSelectedCustomer(null);
                      setValue("client", "");
                      setObjFilterForm((prev) => ({ ...prev, client: "" }));
                      setCustomerOptions([]);
                      if (inputCustomerRef.current)
                        inputCustomerRef.current.value = "";
                    }}
                  >
                    <MdEdit className="text-2xl" />
                  </button>
                </div>
              ) : (
                <div className="relative flex-1">
                  <input
                    type="text"
                    className={inputClass(!!errors.client)}
                    {...register("client")}
                    value={objFilterForm.client}
                    onChange={handleCustomerChange}
                    ref={inputCustomerRef}
                    autoComplete="off"
                  />
                  {showCustomerDropdown && (
                    <ul className="bg-base-100 w-full rounded-box shadow-md z-50 max-h-60 overflow-y-auto absolute mt-1 flex flex-col !cursor-pointer">
                      {customerOptions.map((option) => (
                        <li key={option.id} className="text-sm">
                          <button
                            type="button"
                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                            onClick={() => {
                              if (inputCustomerRef.current) {
                                inputCustomerRef.current.value = option.name;
                                setObjFilterForm((prev) => ({
                                  ...prev,
                                  client: option.name,
                                }));
                                setValue("client", option.name);
                                setSelectedCustomer(option);
                                setShowCustomerDropdown(false);
                                setCustomerOptions([]);
                                debouncedSearchCustomer.cancel();
                                trigger("client");
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
              )}
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
                {Object.entries(InspectionStatusLabel).map(([key, label]) => (
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
                disabled
                className={inputClass(!!errors.theme)}
                {...register("theme")}
              >
                <option disabled value="">
                  Select a template
                </option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 mt-3 p-2">
            <div className="flex flex-col gap-2 items-left justify-center">
              <span className={`${labelClass()} !w-full`}>Description</span>
              <textarea
                className={`!text-left p-2 ${inputClass(!!errors.description)}`}
                rows={3}
                placeholder="Write work description..."
                {...register("description")}
              />

              <button
                type="button"
                className="!hidden btn min-w-[30px] min-h-[39px] p-2 rounded-md mt-3"
              >
                Add group
              </button>
            </div>
          </div>
        </div>

        {selectedTemplateName && (
          <FormChassi
            register={register}
            errors={errors}
            onQuestionsChange={(hasQuestions) =>
              setHasAtLeastOneQuestion(hasQuestions)
            }
            onQuestionsExport={(updatedQuestions) => {
              setExportedQuestions(updatedQuestions);
            }}
            templateName={selectedTemplateName}
            templateId={Number(currentTemplateId)}
            initialQuestions={initialQuestionsRef.current || []}
          />
        )}

        <div className="pt-4">
          <button
            type="submit"
            disabled={!isValid || !hasAtLeastOneQuestion}
            className="disabled:cursor-not-allowed disabled:!text-black btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto"
          >
            <span className="py-1 px-2 text-white font-normal rounded-full md:block text-[13px]">
              Save
            </span>
          </button>
        </div>
      </form>
    </>
  );
};

export default EditOrder;
