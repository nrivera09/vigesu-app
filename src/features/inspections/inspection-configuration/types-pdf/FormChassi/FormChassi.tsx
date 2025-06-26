import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import InspectionModal from "./InspectionModal";
import { AnswerNode } from "./AnswerTree";
import { IoAddCircleOutline } from "react-icons/io5";

import { UseFormRegister, FieldErrors } from "react-hook-form";

interface FormChassiProps {
  register: UseFormRegister<{
    client: string;
    name: string;
    theme: string;
    status?: string;
  }>;
  errors: FieldErrors<{
    client: string;
    name: string;
    theme: string;
    status?: string;
  }>;
  onQuestionsChange?: (hasQuestions: boolean) => void;
  templateName: string;
  templateId: number;
}

const FormChassi: React.FC<FormChassiProps> = ({
  register,
  errors,
  onQuestionsChange,
  templateName,
  templateId,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState<
    { question: string; answers: AnswerNode[] }[]
  >([]);

  const handleSave = (question: string, answers: AnswerNode[]) => {
    const validAnswers = answers.filter((a) => a.label.trim() !== "");
    if (validAnswers.length === 0) {
      alert("Debe agregar al menos una respuesta válida");
      return;
    }

    const updated = [...questions, { question, answers: validAnswers }];
    setQuestions(updated);
  };

  useEffect(() => {
    if (onQuestionsChange) {
      onQuestionsChange(questions.length > 0);
    }
  }, [questions]);

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  const labelClass = () => `font-medium w-[30%] break-words`;
  return (
    <>
      <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-5">
        {templateName || "Create Inspection"}
      </h2>
      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5  p-2">
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="btn min-w-[30px] min-h-[39px] p-2 rounded-md "
          >
            <IoAddCircleOutline className="text-2xl" />
            Add row
          </button>
          <div className="overflow-x-auto rounded-box border-[#00000014] border-1 ">
            <table className="table w-full">
              <thead className="bg-[#191917]">
                <tr className="border-b-[#00000014]">
                  <th className=" text-center w-[40%] text-white font-medium">
                    Inspection time
                  </th>
                  <th className=" text-center w-[15%] text-white font-medium">
                    Ok
                  </th>
                  <th className=" text-center w-[40%] text-white font-medium">
                    Repair / Replace items
                  </th>
                  <th className=" text-center w-[10%] text-white font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={index}>
                    <td className="text-center">{q.question}</td>
                    <td className="text-center">
                      <span className="text-sm font-medium">
                        {q.answers.map((a) => a.label).join(", ")}
                      </span>
                    </td>
                    <td className="text-center">—</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-full">
          {/** aqui formularios */}
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setOpenModal(!openModal)}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      {openModal && (
        <InspectionModal
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default FormChassi;
