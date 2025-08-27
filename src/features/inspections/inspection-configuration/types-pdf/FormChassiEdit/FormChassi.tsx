import React, { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import InspectionModal from "./InspectionModal";
import { AnswerNode } from "./AnswerTree";
import { IoAddCircleOutline } from "react-icons/io5";

import { UseFormRegister, FieldErrors } from "react-hook-form";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { GrDuplicate } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import {
  ExportedAnswer,
  ExportedQuestion,
} from "@/shared/types/inspection/ITypes";

// --------- Estados backend ----------
const STATUS_ACTIVE = 0 as const;
const STATUS_DELETED = 1 as const;

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

// --- draft que le pasaremos al modal para prellenado ---
type ModalDraft = {
  questionText: string;
  answers: AnswerNode[];
  groupId: number;
  selectedQuestion: {
    templateInspectionQuestionId: number;
    question: string;
    typeQuestion: number;
  };
};

// --------- mapeos Answer <-> AnswerNode (para el prefill del modal) ----------
const toAnswerNodes = (answers: ExportedAnswer[] = []): AnswerNode[] =>
  (answers ?? []).map((a) => ({
    // importante: si viene id numérico del backend lo guardamos como string
    id: a.id != null ? String(a.id) : newLocalId(),
    label: a.response,
    color: a.color,
    useParts: !!a.usingItem,
    children: toAnswerNodes(a.subTypeInspectionDetailAnswers ?? []),
  }));

/**
 * Convierte AnswerNode[] a ExportedAnswer[].
 * - Si preserveIds=true y el node.id es numérico => se preserva como id.
 * - Si el node.id no es numérico => id undefined (nuevo).
 */
const nodesToExportedAnswers = (
  nodes: AnswerNode[] = [],
  preserveIds: boolean
): ExportedAnswer[] =>
  (nodes ?? []).map((n) => ({
    id: preserveIds && /^\d+$/.test(n.id) ? Number(n.id) : undefined, // nuevo si no es numérico
    response: n.label,
    color: n.color,
    usingItem: !!n.useParts,
    isPrintable: true,
    subTypeInspectionDetailAnswers: nodesToExportedAnswers(
      n.children ?? [],
      preserveIds
    ),
  }));

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

  // estado para saber si estamos editando o creando/duplicando
  const [editingLocalId, setEditingLocalId] = useState<string | null>(null);

  // draft para prellenar el modal en editar/duplicar
  const [modalDraft, setModalDraft] = useState<ModalDraft | null>(null);

  // ---------- UTILIDADES ----------
  const countOccurrences = (
    templateInspectionQuestionId: number,
    excludeLocalId?: string
  ) =>
    questions.filter(
      (q) =>
        q.status !== STATUS_DELETED &&
        q.templateInspectionQuestionId === templateInspectionQuestionId &&
        (!excludeLocalId || q._localId !== excludeLocalId)
    ).length;

  const buildDraftFromLocalQuestion = (q: LocalQuestion): ModalDraft => ({
    questionText: q.question,
    answers: toAnswerNodes(q.typeInspectionDetailAnswers ?? []),
    groupId: q.groupId,
    selectedQuestion: {
      templateInspectionQuestionId: q.templateInspectionQuestionId,
      question: q.question,
      typeQuestion: q.typeQuestion,
    },
  });

  // ---------- ABRIR MODAL (crear) ----------
  const openCreate = () => {
    setEditingLocalId(null);
    setModalDraft(null); // modal vacío
    setOpenModal(true);
  };

  // ---------- GUARDAR DESDE MODAL (crear o editar) ----------
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

    const tplId = selectedQuestion.templateInspectionQuestionId;

    if (editingLocalId) {
      // --- EDITAR ---
      // Validación: misma pregunta no más de 2 (excluyendo este localId)
      const occ = countOccurrences(tplId, editingLocalId);
      if (occ + 1 > 2) {
        alert(
          "Esta pregunta ya está usada dos veces. Cambie la selección de pregunta antes de guardar."
        );
        return;
      }

      // En edición: PRESERVAR ids existentes (si el node.id es numérico)
      const formattedAnswers = dedupeAnswers(
        nodesToExportedAnswers(validAnswers, true)
      );

      setQuestions((prev) =>
        prev.map((q) => {
          if (q._localId !== editingLocalId) return q;
          return {
            ...q,
            templateInspectionQuestionId: tplId,
            question,
            typeQuestion: selectedQuestion.typeQuestion,
            groupId: group.groupId,
            status: STATUS_ACTIVE,
            typeInspectionDetailAnswers: formattedAnswers,
          };
        })
      );

      setEditingLocalId(null);
      setModalDraft(null);
      setOpenModal(false);
      return;
    }

    // --- CREAR (nuevo o duplicado) ---
    // Validación: misma pregunta no más de 2
    const occ = countOccurrences(tplId);
    if (occ + 1 > 2) {
      alert(
        "Esta pregunta ya está usada dos veces. Cambie la selección de pregunta antes de guardar."
      );
      return;
    }

    // En creación/duplicado: NO preservar ids (todas las respuestas nuevas)
    const formattedAnswers = dedupeAnswers(
      nodesToExportedAnswers(validAnswers, false)
    );

    const newEntry: LocalQuestion = {
      _localId: newLocalId(),
      typeInspectionDetailId: undefined, // NUEVO (backend asigna)
      templateInspectionQuestionId: tplId,
      question,
      typeQuestion: selectedQuestion.typeQuestion,
      groupId: group.groupId,
      status: STATUS_ACTIVE,
      typeInspectionDetailAnswers: formattedAnswers,
    };

    setQuestions((prev) => [...prev, newEntry]);
    setModalDraft(null);
    setOpenModal(false);
  };

  // ---------- DUPLICAR ----------
  // Copia completa pero SIN ids, y abre modal con prellenado
  const handleDuplicateById = (localId: string) => {
    const original = questions.find((q) => q._localId === localId);
    if (!original) return;

    const occ = countOccurrences(original.templateInspectionQuestionId);
    if (occ >= 2) {
      alert(
        "Esta pregunta ya está usada dos veces. Se abrirá el formulario para que cambie la selección."
      );
    }

    const draft = buildDraftFromLocalQuestion(original);
    // NOTA: no removemos aquí ids; se remueven al guardar por estar en modo 'crear'
    setEditingLocalId(null);
    setModalDraft(draft);
    setOpenModal(true);
  };

  // ---------- EDITAR ----------
  const handleEditById = (localId: string) => {
    const q = questions.find((x) => x._localId === localId);
    if (!q) return;

    const draft = buildDraftFromLocalQuestion(q);
    setEditingLocalId(localId);
    setModalDraft(draft);
    setOpenModal(true);
  };

  // ---------- ELIMINAR ----------
  const handleDeleteById = (localId: string) => {
    setQuestions((prev) => {
      const idx = prev.findIndex((q) => q._localId === localId);
      if (idx === -1) return prev;
      const q = prev[idx];

      if (!q.typeInspectionDetailId || q.typeInspectionDetailId === 0) {
        return prev.filter((x) => x._localId !== localId);
      }

      const next = [...prev];
      next[idx] = { ...q, status: STATUS_DELETED };
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
      onQuestionsChange(questions.some((q) => q.status !== STATUS_DELETED));
  }, [questions, onQuestionsChange]);

  // 2) exportar al padre (manda TODO; los status=1 irán al backend para eliminar)
  useEffect(() => {
    if (!onQuestionsExport) return;

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
  }, [questions, onQuestionsExport]);

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
  }, [initialQuestions]);

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  const labelClass = () => `font-medium w-[30%] break-words`;

  const visibleRows = questions
    .filter((q) => q.status !== STATUS_DELETED)
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
            onClick={openCreate}
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
                        {/* EDITAR */}
                        <ActionButton
                          icon={
                            <MdEdit className="w-[20px] h-[20px] opacity-70 " />
                          }
                          label="Editar"
                          onClick={() => handleEditById(localId)}
                        />
                        {/* DUPLICAR */}
                        <ActionButton
                          icon={
                            <GrDuplicate className="w-[20px] h-[20px] opacity-70 " />
                          }
                          label="Duplicar"
                          onClick={() => handleDuplicateById(localId)}
                        />
                        {/* ELIMINAR */}
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
              onClick={() => {
                setOpenModal(false);
                setEditingLocalId(null);
                setModalDraft(null);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>

      {openModal && (
        <InspectionModal
          onClose={() => {
            setOpenModal(false);
            setEditingLocalId(null);
            setModalDraft(null);
          }}
          onSave={handleSave}
          templateId={templateId}
          // prellenado para editar/duplicar
          initialData={
            modalDraft
              ? {
                  question: modalDraft.questionText,
                  answers: modalDraft.answers,
                  group: { groupId: modalDraft.groupId },
                  selectedQuestion: modalDraft.selectedQuestion,
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default FormChassi;
