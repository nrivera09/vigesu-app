// components/ResponseTree.tsx
import { useFieldArray, useFormContext } from "react-hook-form";
import React from "react";

interface Props {
  name: string; // Ejemplo: body_order[0].auto_responses[1].subresponses
}

const ResponseTree = ({ name }: Props) => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${name}.subresponses` as const,
  });

  return (
    <div className="ml-6 border-l pl-4">
      {fields.map((field, index) => {
        const path = `${name}.subresponses[${index}]`;
        return (
          <div key={field.id} className="mb-2">
            <input
              {...register(`${path}.value`)}
              placeholder="Subrespuesta"
              className="input input-bordered input-sm mr-2"
            />
            <input
              {...register(`${path}.color`)}
              type="color"
              className="input input-sm w-10 h-8"
            />
            <button
              type="button"
              className="btn btn-xs btn-error ml-2"
              onClick={() => remove(index)}
            >
              Eliminar
            </button>

            <ResponseTree name={path} />
          </div>
        );
      })}

      <button
        type="button"
        className="btn btn-xs btn-outline mt-2"
        onClick={() =>
          append({
            value: "",
            color: "#cccccc",
            subresponses: [],
          })
        }
      >
        + Subrespuesta
      </button>
    </div>
  );
};

export default ResponseTree;
