import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import InspectionModal from "./InspectionModal";
import { AnswerNode } from "./AnswerTree";
import { IoAddCircleOutline } from "react-icons/io5";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { GrDuplicate } from "react-icons/gr";
import {
  ExportedAnswer,
  ExportedQuestion,
} from "@/shared/types/inspection/ITypes";
import { InspectionStatus } from "../../models/typeInspection";

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
  onQuestionsExport?: (questions: ExportedQuestion[]) => void;
}

const FormChassi: React.FC<FormChassiProps> = ({
  register,
  errors,
  onQuestionsChange,
  templateName,
  templateId,
  onQuestionsExport,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState<ExportedQuestion[]>([]);

  const handleSave = (
    question: string,
    answers: AnswerNode[],
    group: { groupId: number },
    selectedQuestion: {
      templateInspectionQuestionId: number;
      question: string;
      typeQuestion: number;
    }
  ) => {
    const validAnswers = answers.filter((a) => a.label.trim() !== "");
    if (validAnswers.length === 0) {
      alert("Debe agregar al menos una respuesta válida");
      return;
    }

    const mapAnswersRecursive = (nodes: AnswerNode[]): ExportedAnswer[] => {
      return nodes.map((a) => ({
        response: a.label,
        color: a.color,
        usingItem: a.useParts ?? false,
        isPrintable: true,
        subTypeInspectionDetailAnswers: mapAnswersRecursive(a.children ?? []),
      }));
    };

    const formattedAnswers = mapAnswersRecursive(validAnswers);

    const newEntry: ExportedQuestion = {
      templateInspectionQuestionId:
        selectedQuestion.templateInspectionQuestionId,
      question,
      typeQuestion: selectedQuestion.typeQuestion,
      groupId: group.groupId,
      status: InspectionStatus.Active,
      typeInspectionDetailAnswers: formattedAnswers,
    };

    setQuestions((prev) => [...prev, newEntry]);
  };

  const handleDuplicateQuestion = (index: number) => {
    const original = questions[index];
    const duplicated = {
      ...original,
      question: original.question + " (copy)",
      templateInspectionQuestionId: original.templateInspectionQuestionId, // conserva ID
      groupId: original.groupId,
      status: 1,
      typeInspectionDetailAnswers: JSON.parse(
        JSON.stringify(original.typeInspectionDetailAnswers)
      ),
    };
    setQuestions((prev) => [...prev, duplicated]);
  };

  const handleDeleteQuestion = (index: number) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const getFirstLevelAnswers = (answers: ExportedAnswer[]) => {
    return (answers ?? [])
      .filter((a) => a.response.trim() !== "")
      .map((a) => a.response)
      .join(", ");
  };

  useEffect(() => {
    if (onQuestionsChange) {
      onQuestionsChange(questions.length > 0);
    }
  }, [questions]);

  useEffect(() => {
    if (onQuestionsChange) onQuestionsChange(questions.length > 0);
    if (onQuestionsExport) onQuestionsExport(questions);
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
          <pre className="!hidden">{JSON.stringify(questions, null, 2)}</pre>
          <div className="overflow-x-auto rounded-box border-[#00000014] border-1 ">
            <table className="table w-full">
              <thead className="bg-[#191917]">
                <tr className="border-b-[#00000014]">
                  <th className=" text-center w-[30%] text-white font-medium">
                    Description
                  </th>
                  <th className=" text-center w-[15%] text-white font-medium">
                    Tipo
                  </th>
                  <th className=" text-center w-[30%] text-white font-medium">
                    Respuestas automáticas
                  </th>
                  <th className=" text-center w-[25%] text-white font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={index}>
                    <td className="text-center">
                      <div
                        className="w-[300px] overflow-hidden text-ellipsis"
                        aria-label="question"
                      >
                        <span className="truncate ">{q.question}</span>
                      </div>
                    </td>
                    <td className="text-center">
                      <span className="text-sm font-medium">
                        {q.typeQuestion}
                      </span>
                    </td>

                    <td className="text-center">
                      <span className="text-sm font-medium">
                        {getFirstLevelAnswers(q.typeInspectionDetailAnswers)}
                      </span>
                    </td>
                    <td className="text-right">
                      <div className="flex w-full flex-row gap-2 items-center justify-end">
                        <ActionButton
                          icon={
                            <GrDuplicate className="w-[20px] h-[20px] opacity-70" />
                          }
                          label="Duplicar"
                          onClick={() => handleDuplicateQuestion(index)}
                        />
                        <ActionButton
                          icon={
                            <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                          }
                          label="Delete"
                          onClick={() => handleDeleteQuestion(index)}
                        />
                      </div>
                    </td>
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
          templateId={templateId}
        />
      )}
    </>
  );
};

export default FormChassi;
