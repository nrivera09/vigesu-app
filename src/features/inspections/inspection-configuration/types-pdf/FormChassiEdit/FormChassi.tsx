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

// --------- HELPERS ----------
const dedupeAnswers = (answers: ExportedAnswer[]): ExportedAnswer[] => {
  const seen = new Set<string>();
  const out: ExportedAnswer[] = [];
  for (const a of answers ?? []) {
    const key =
      `${(a.response || "").trim()}|${a.color || ""}|` +
      `${a.usingItem ? 1 : 0}|${a.isPrintable ? 1 : 0}`;
    if (!seen.has(key)) {
      seen.add(key);
      out.push({
        ...a,
        subTypeInspectionDetailAnswers: dedupeAnswers(
          a.subTypeInspectionDetailAnswers ?? []
        ),
      });
    }
  }
  return out;
};

const newLocalId = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `local_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

// --- tipo local interno (no modifica tus tipos globales) ---
type LocalQuestion = ExportedQuestion & { _localId: string };

// ---------------------------------------------------

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
  initialQuestions?: ExportedQuestion[]; // edición
}

const FormChassi: React.FC<FormChassiProps> = ({
  onQuestionsChange,
  templateName,
  templateId,
  onQuestionsExport,
  initialQuestions,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState<LocalQuestion[]>([]);

  // Guarda del modal (agregar nueva)
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

    const mapAnswersRecursive = (nodes: AnswerNode[]): ExportedAnswer[] =>
      (nodes ?? []).map((a) => ({
        // respuestas nuevas sin id (el backend las crea)
        id: undefined,
        response: a.label,
        color: a.color,
        usingItem: a.useParts ?? false,
        isPrintable: true,
        subTypeInspectionDetailAnswers: mapAnswersRecursive(a.children ?? []),
      }));

    const formattedAnswers = dedupeAnswers(mapAnswersRecursive(validAnswers));

    const newEntry: LocalQuestion = {
      _localId: newLocalId(),
      typeInspectionDetailId: undefined, // nueva (el backend asigna)
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

  // Duplicar: conserva IDs (tal como dices que te funciona en Swagger)
  const handleDuplicateById = (localId: string) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q._localId === localId);
      if (idx === -1) return prev;
      const original = prev[idx];

      const duplicated: LocalQuestion = {
        ...original,
        _localId: newLocalId(),
        // 👇 conservamos el MISMO id del detalle y de las respuestas
        //    esto replica exactamente el comportamiento que logras en Swagger
        question: original.question + " (copy)",
        status: InspectionStatus.Active,
      };

      return [...prev, duplicated];
    });
  };

  // Eliminar: si es nuevo se quita; si existe, se mantiene con status=Inactive
  const handleDeleteById = (localId: string) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q._localId === localId);
      if (idx === -1) return prev;
      const q = prev[idx];

      // Si es nueva -> eliminar del array (no viaja en payload)
      if (!q.typeInspectionDetailId || q.typeInspectionDetailId === 0) {
        return prev.filter((x) => x._localId !== localId);
      }

      // Si existe en backend -> mantenerla pero status=Inactive (status=0)
      const next = [...prev];
      next[idx] = { ...q, status: InspectionStatus.Inactive };
      return next;
    });
  };

  const getFirstLevelAnswers = (answers: ExportedAnswer[]) =>
    (answers ?? [])
      .filter((a) => a.response.trim() !== "")
      .map((a) => a.response)
      .join(", ");

  // 1) informar si hay preguntas visibles
  useEffect(() => {
    if (onQuestionsChange)
      onQuestionsChange(
        questions.some((q) => q.status !== InspectionStatus.Inactive)
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // 2) exportar al padre (manda TODO, incluidos Inactive, para que el backend los procese)
  useEffect(() => {
    if (!onQuestionsExport) return;

    // quitamos _localId antes de exportar
    const cleaned: ExportedQuestion[] = questions.map((q) => {
      const { _localId: _omit, ...rest } = q;
      return {
        ...rest,
        typeInspectionDetailAnswers: dedupeAnswers(
          rest.typeInspectionDetailAnswers ?? []
        ),
      };
    });

    onQuestionsExport(cleaned);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  // carga inicial (edición)
  useEffect(() => {
    const copy = JSON.parse(
      JSON.stringify(initialQuestions || [])
    ) as ExportedQuestion[];
    const seeded: LocalQuestion[] = copy.map((q) => ({
      ...q,
      _localId: newLocalId(),
      typeInspectionDetailAnswers: dedupeAnswers(
        q.typeInspectionDetailAnswers ?? []
      ),
    }));
    setQuestions(seeded);
    // solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  const labelClass = () => `font-medium w-[30%] break-words`;

  const visibleRows = questions
    .filter((q) => q.status !== InspectionStatus.Inactive)
    .map((q) => ({ q, localId: q._localId }));

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
                {visibleRows.map(({ q, localId }) => (
                  <tr key={localId}>
                    <td className="text-left">
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
                            <GrDuplicate className="w-[20px] h-[20px] opacity-70 " />
                          }
                          label="Duplicar"
                          onClick={() => handleDuplicateById(localId)}
                        />
                        <ActionButton
                          icon={
                            <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                          }
                          label="Delete"
                          onClick={() => handleDeleteById(localId)}
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
        <div className="modal-box w-11/12 max-w/full">
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
