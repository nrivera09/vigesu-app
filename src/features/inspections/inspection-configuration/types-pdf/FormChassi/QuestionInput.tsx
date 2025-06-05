// components/QuestionInput.tsx
import { useFormContext, useFieldArray } from "react-hook-form";
import ResponseTree from "./ResponseTree";

interface Props {
  nestIndex: number;
  remove: () => void;
}

const QuestionInput = ({ nestIndex, remove }: Props) => {
  const { register, control } = useFormContext();
  const {
    fields,
    append,
    remove: removeResponse,
  } = useFieldArray({
    control,
    name: `body_order[${nestIndex}].auto_responses`,
  });

  return (
    <div className="border p-4 rounded-lg bg-base-200">
      <input
        {...register(`body_order[${nestIndex}].description`)}
        placeholder="Descripción"
        className="input input-bordered input-sm w-full mb-2"
      />

      <select
        {...register(`body_order[${nestIndex}].type`)}
        className="select select-bordered select-sm w-full mb-2"
      >
        <option value="Texto">Texto</option>
        <option value="Número">Número</option>
        <option value="Hora">Hora</option>
      </select>

      <label className="label cursor-pointer mb-2">
        <span className="label-text">¿Tiene extra?</span>
        <input
          type="checkbox"
          {...register(`body_order[${nestIndex}].has_extra`)}
          className="checkbox checkbox-sm ml-2"
        />
      </label>

      {fields.map((field, index) => {
        const name = `body_order[${nestIndex}].auto_responses[${index}]`;
        return (
          <div key={field.id} className="bg-base-100 p-2 mb-2 rounded-md">
            <input
              {...register(`${name}.value`)}
              placeholder="Respuesta"
              className="input input-sm input-bordered mr-2"
            />
            <input
              type="color"
              {...register(`${name}.color`)}
              className="w-10 h-8"
            />
            <button
              type="button"
              className="btn btn-xs btn-error ml-2"
              onClick={() => removeResponse(index)}
            >
              Eliminar
            </button>

            <ResponseTree name={name} />
          </div>
        );
      })}

      <button
        type="button"
        className="btn btn-outline btn-xs"
        onClick={() =>
          append({ value: "", color: "#cccccc", subresponses: [] })
        }
      >
        + Respuesta
      </button>

      <button
        type="button"
        onClick={remove}
        className="btn btn-sm btn-outline btn-error ml-2"
      >
        Eliminar Pregunta
      </button>
    </div>
  );
};

export default QuestionInput;
