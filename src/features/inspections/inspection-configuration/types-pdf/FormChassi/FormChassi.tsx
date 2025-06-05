// components/FormChassi.tsx
"use client";

import React from "react";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FullForm, FullFormSchema } from "../../types/types";
import QuestionInput from "./QuestionInput";

const defaultValues: FullForm = {
  header_order: {
    inspection_type: "",
    last_annual_inspection: "",
    new_fmcsa: false,
    last_california_inspection: "",
    new_bit: false,
    license_number: "",
    state: "",
    location: "",
    equipment_mark: "",
    owner_or_lessor: "",
  },
  body_order: [],
};

const FormChassi = () => {
  const methods = useForm<FullForm>({
    resolver: zodResolver(FullFormSchema),
    defaultValues,
  });

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "body_order",
  });

  const onSubmit = (data: FullForm) => {
    console.log("JSON generado:", JSON.stringify(data, null, 2));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
        <h2 className="text-lg font-bold">Preguntas</h2>
        {fields.map((field, index) => (
          <QuestionInput
            key={field.id}
            nestIndex={index}
            remove={() => remove(index)}
          />
        ))}

        <button
          type="button"
          className="btn btn-outline btn-sm"
          onClick={() =>
            append({
              description: "",
              type: "Texto",
              has_extra: false,
              auto_responses: [],
            })
          }
        >
          Agregar Pregunta
        </button>

        <button type="button" className="btn btn-primary ml-4">
          Guardar JSON
        </button>
      </form>
    </FormProvider>
  );
};

export default FormChassi;
