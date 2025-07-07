// ✅ Versión corregida: guarda todas las respuestas seleccionadas por nivel correctamente y respeta subAnswers anidados
import React, { useEffect, useState } from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { isColorLight } from "@/shared/utils/utils";
import { IFullAnswer } from "../types/IFullTypeInspection";
import Wizard from "./Wizard";
import ModalUsingItem from "./ModalUsingItem";
import { GoChecklist } from "react-icons/go";
import clsx from "clsx";
import { TypeQuestion, TypeQuestionLabel } from "../../models/workOrder.types";
import { IoIosInformationCircleOutline } from "react-icons/io";
import Lottie from "lottie-react";

import checkLottie from "@/assets/lotties/check.json";
import { toast } from "sonner";

interface ItemWithQuantity {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

interface ExportedAnswer {
  response: string;
  usingItem: boolean;
  selectedItems: ItemWithQuantity[];
  subAnswers: ExportedAnswer[];
}

const GenerateStep3 = () => {
  const { fullInspection, groupName, groupId, titleQuestion, fullQuestion } =
    useInspectionFullStore();
  const [selectedTree, setSelectedTree] = useState<IFullAnswer[]>([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalAnswer, setModalAnswer] = useState<IFullAnswer | null>(null);
  const [initialItems, setInitialItems] = useState<ItemWithQuantity[]>([]);
  const [textResponse, setTextResponse] = useState("");

  const currentAnswers =
    fullInspection?.questions
      .filter(
        (item) =>
          item.groupName === groupName &&
          item.groupId === groupId &&
          item.templateInspectionQuestionId ===
            fullQuestion?.templateInspectionQuestionId
      )
      .flatMap((question) => question.answers) ?? [];

  const isMultiple = fullQuestion?.typeQuestion === TypeQuestion.MultipleChoice;
  const isText = fullQuestion?.typeQuestion === TypeQuestion.TextInput;

  const openItemModal2 = (answer: IFullAnswer) => {
    const findAnswerInTree = (tree: IFullAnswer[]): IFullAnswer | null => {
      for (const node of tree) {
        if (
          node.typeInspectionDetailAnswerId ===
          answer.typeInspectionDetailAnswerId
        ) {
          return node;
        }
        if (node.subAnswers?.length) {
          const found = findAnswerInTree(node.subAnswers);
          if (found) return found;
        }
      }
      return null;
    };

    const nodeInTree = findAnswerInTree(selectedTree);
    setModalAnswer(answer);
    setInitialItems(nodeInTree?.selectedItems ?? []);
    setShowItemModal(true);
  };

  const openItemModal = (answer: IFullAnswer) => {
    const answerId = String(answer.typeInspectionDetailAnswerId);
    const selected = isSelected(answerId, selectedTree);

    if (!selected) {
      toast.error("Primero debes seleccionar la respuesta");
      return;
    }

    const findAnswerInTree = (tree: IFullAnswer[]): IFullAnswer | null => {
      for (const node of tree) {
        if (String(node.typeInspectionDetailAnswerId) === answerId) return node;
        if (node.subAnswers?.length) {
          const found = findAnswerInTree(node.subAnswers);
          if (found) return found;
        }
      }
      return null;
    };

    const nodeInTree = findAnswerInTree(selectedTree);
    setModalAnswer(answer);
    setInitialItems(nodeInTree?.selectedItems ?? []);
    setShowItemModal(true);
  };

  const toggleAnswer = (
    tree: IFullAnswer[],
    answer: IFullAnswer,
    parentId?: string
  ): IFullAnswer[] => {
    if (!parentId) {
      if (!isMultiple) {
        return [{ ...answer, subAnswers: [] }];
      }
      const exists = tree.find(
        (a) =>
          a.typeInspectionDetailAnswerId === answer.typeInspectionDetailAnswerId
      );
      return exists
        ? tree.filter(
            (a) =>
              a.typeInspectionDetailAnswerId !==
              answer.typeInspectionDetailAnswerId
          )
        : [...tree, { ...answer, subAnswers: [] }];
    }

    return tree.map((node) => {
      if (String(node.typeInspectionDetailAnswerId) === parentId) {
        const exists = node.subAnswers?.some(
          (sub) =>
            sub.typeInspectionDetailAnswerId ===
            answer.typeInspectionDetailAnswerId
        );
        const newSubs = exists
          ? node.subAnswers!.filter(
              (sub) =>
                sub.typeInspectionDetailAnswerId !==
                answer.typeInspectionDetailAnswerId
            )
          : [...(node.subAnswers ?? []), { ...answer, subAnswers: [] }];
        return { ...node, subAnswers: newSubs };
      }
      if (node.subAnswers?.length) {
        return {
          ...node,
          subAnswers: toggleAnswer(node.subAnswers, answer, parentId),
        };
      }
      return node;
    });
  };

  const getAnswerFromTree = (
    tree: IFullAnswer[],
    id: string
  ): IFullAnswer | undefined => {
    for (const a of tree) {
      if (String(a.typeInspectionDetailAnswerId) === id) return a;
      if (a.subAnswers?.length) {
        const found = getAnswerFromTree(a.subAnswers, id);
        if (found) return found;
      }
    }
    return undefined;
  };

  const isSelected = (id: string, tree: IFullAnswer[]): boolean => {
    for (const a of tree) {
      if (String(a.typeInspectionDetailAnswerId) === id) return true;
      if (a.subAnswers?.length && isSelected(id, a.subAnswers)) return true;
    }
    return false;
  };

  const updateSelectedItems = (
    tree: IFullAnswer[],
    answerId: string,
    items: ItemWithQuantity[]
  ): IFullAnswer[] => {
    return tree.map((a) => {
      if (String(a.typeInspectionDetailAnswerId) === answerId) {
        return { ...a, selectedItems: items };
      }
      if (a.subAnswers?.length) {
        return {
          ...a,
          subAnswers: updateSelectedItems(a.subAnswers, answerId, items),
        };
      }
      return a;
    });
  };

  const renderAnswerRecursive = (
    answer: IFullAnswer,
    level: number = 0,
    parentId?: string
  ): React.ReactNode => {
    const backgroundColor =
      answer.color === "#ffffff" ? "#171717" : answer.color;
    const isLight = isColorLight(backgroundColor);
    const textColor = isLight ? "#000000" : "#ffffff";
    const selected = isSelected(
      String(answer.typeInspectionDetailAnswerId),
      selectedTree
    );

    const treeAnswer = getAnswerFromTree(
      selectedTree,
      String(answer.typeInspectionDetailAnswerId)
    );
    const hasItems =
      treeAnswer?.selectedItems?.length && treeAnswer.selectedItems.length > 0;

    return (
      <div
        key={answer.typeInspectionDetailAnswerId}
        className="flex flex-col items-center"
      >
        <div className="flex flex-col items-center relative">
          {level > 0 && (
            <div className="absolute top-[-16px] h-4 w-px bg-gray-300" />
          )}

          <div className="flex flex-row items-center justify-start my-2">
            <div
              className="flex flex-row items-center gap-0 cursor-pointer group"
              onClick={() =>
                setSelectedTree((prev) => toggleAnswer(prev, answer, parentId))
              }
            >
              <div
                data-color={answer.color}
                style={{ backgroundColor, color: textColor }}
                className={clsx(
                  !answer.usingItem
                    ? "overflow-hidden rounded-tl-full rounded-full px-5 flex flex-row transition-all group-hover:shadow-lg"
                    : "overflow-hidden rounded-tl-full rounded-bl-full px-5 flex flex-row transition-all group-hover:shadow-lg"
                )}
              >
                <div className="h-[45px] flex items-center justify-center pr-4">
                  <input
                    type={isMultiple ? "checkbox" : "radio"}
                    name={`select-answer-${level}-${parentId ?? "root"}`}
                    checked={selected}
                    readOnly
                    className={clsx(
                      isMultiple
                        ? "checkbox bg-white checked:bg-white checked:text-green-600 checked:border-green-500"
                        : "radio bg-white checked:bg-white checked:text-green-600 checked:border-green-500"
                    )}
                  />
                </div>
                <div className="flex flex-row items-center justify-center min-w-auto h-[45px] overflow-hidden">
                  <p className="truncate">{answer.response}</p>
                </div>
              </div>
            </div>

            {answer.usingItem &&
              (!hasItems ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    openItemModal(answer);
                  }}
                  className={clsx(
                    "h-full cursor-pointer flex items-center rounded-tr-full rounded-br-full justify-center px-3 min-w-[45px] overflow-hidden bg-[#35353382]"
                  )}
                >
                  <GoChecklist className="size-7 text-black/50 transition-all hover:text-black" />
                </div>
              ) : (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    openItemModal(answer);
                  }}
                  className={clsx(
                    "h-full cursor-pointer flex items-center rounded-tr-full rounded-br-full justify-center px-3 min-w-[45px] overflow-hidden bg-green-300"
                  )}
                >
                  <Lottie
                    animationData={checkLottie}
                    style={{ width: 35, height: 35 }}
                    loop={false}
                  />
                </div>
              ))}

            {/* Mostrar cantidad de ítems si existen */}
            {selected &&
              answer.selectedItems &&
              answer.selectedItems.length > 0 && (
                <div className="text-xs text-center mt-1 text-gray-500">
                  {answer.selectedItems.length} ítem
                  {answer.selectedItems.length > 1 ? "s" : ""} agregado
                  {answer.selectedItems.length > 1 ? "s" : ""}
                </div>
              )}
          </div>

          {selected && answer.subAnswers?.length > 0 && (
            <div className="mt-4 flex flex-row gap-4 border-t pt-4 border-black/10">
              {answer.subAnswers.map((sub) => (
                <div
                  key={sub.typeInspectionDetailAnswerId}
                  className="flex flex-col items-center"
                >
                  {renderAnswerRecursive(
                    sub,
                    level + 1,
                    String(answer.typeInspectionDetailAnswerId)
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const exportTree = (answers: IFullAnswer[]): ExportedAnswer[] => {
    return answers.map((a) => ({
      response: a.response,
      usingItem: a.usingItem,
      selectedItems: a.selectedItems ?? [],
      subAnswers: a.subAnswers?.length ? exportTree(a.subAnswers) : [],
    }));
  };

  useEffect(() => {
    console.log("📡 TREE RESPUESTAS EN TIEMPO REAL:", exportTree(selectedTree));
  }, [selectedTree]);

  return (
    <>
      <Wizard />
      <div className="card bg-base-200 p-6 shadow-xs">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Question: {titleQuestion}</h1>
          <label className="rounded-full bg-red-400 hidden md:flex items-center justify-center text-white overflow-hidden px-3 gap-1 py-1">
            <IoIosInformationCircleOutline className="size-6" />
            {fullQuestion?.typeQuestion !== undefined
              ? TypeQuestionLabel[fullQuestion.typeQuestion as TypeQuestion]
              : ""}
          </label>
        </div>

        {isText ? (
          <div className="mt-6">
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Escribe tu respuesta..."
              value={textResponse}
              onChange={(e) => setTextResponse(e.target.value)}
            />
          </div>
        ) : (
          <div className="mt-4 flex flex-row gap-4 flex-nowrap overflow-x-auto">
            {currentAnswers.map((answer) => (
              <div
                key={answer.typeInspectionDetailAnswerId}
                className="flex flex-col items-center"
              >
                {renderAnswerRecursive(answer, 0)}
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-6">
          <button
            className="btn btn-success"
            onClick={() => {
              if (isText) {
                console.log("✏️ TEXT RESPONSE:", textResponse);
              } else {
                console.log("🚀 JSON FINAL TREE:", exportTree(selectedTree));
              }
            }}
          >
            Guardar todo
          </button>
        </div>
      </div>

      {showItemModal && modalAnswer && (
        <ModalUsingItem
          onClose={() => setShowItemModal(false)}
          onSave={(items: ItemWithQuantity[]) => {
            if (!modalAnswer) return;
            const updated = updateSelectedItems(
              selectedTree,
              String(modalAnswer.typeInspectionDetailAnswerId),
              items
            );
            setSelectedTree(updated);
            setShowItemModal(false);
          }}
          initialItems={initialItems}
        />
      )}
    </>
  );
};

export default GenerateStep3;
