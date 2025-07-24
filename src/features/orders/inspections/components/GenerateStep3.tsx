//  Versión corregida: guarda todas las respuestas seleccionadas por nivel correctamente y respeta subAnswers anidados
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
import AnswerSign from "./typeQuest/AnswerSign";
import AnswerText from "./typeQuest/AnswerText";
import AnswerOptions from "./typeQuest/AnswerOptions";

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
  const [isSignValid, setIsSignValid] = useState(false);

  const [signUrl, setSignUrl] = useState<string | undefined>(undefined);

  const [showItemModal, setShowItemModal] = useState(false);
  const [modalAnswer, setModalAnswer] = useState<IFullAnswer | null>(null);
  const [initialItems, setInitialItems] = useState<ItemWithQuantity[]>([]);
  const [textResponse, setTextResponse] = useState("");

  const { resetTrigger } = useInspectionFullStore();

  const [showRootPicker, setShowRootPicker] = useState(false);
  const [selectedRootId, setSelectedRootId] = useState<string | null>(null);

  useEffect(() => {
    setSelectedTree([]);
    setTextResponse("");
    setSignUrl(undefined);
    setIsSignValid(false);
  }, [resetTrigger]);

  const originalRoots = fullQuestion?.originalAnswers ?? [];

  const currentAnswers =
    fullQuestion?.originalAnswers ?? fullQuestion?.answers ?? [];

  const isSingle = fullQuestion?.typeQuestion === TypeQuestion.SingleChoice;
  const isMultiple = fullQuestion?.typeQuestion === TypeQuestion.MultipleChoice;
  const isText = fullQuestion?.typeQuestion === TypeQuestion.TextInput;
  const isSign = fullQuestion?.typeQuestion === TypeQuestion.Sign;

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
    const isRoot = !parentId;

    //  SINGLE CHOICE: Solo 1 rama
    if (!isMultiple) {
      if (isRoot) {
        return [{ ...answer, subAnswers: [] }];
      }

      // Solo permite una subrespuesta por nivel
      return tree.map((node) => {
        if (String(node.typeInspectionDetailAnswerId) === parentId) {
          return {
            ...node,
            subAnswers: [{ ...answer, subAnswers: [] }],
          };
        }
        if (node.subAnswers?.length) {
          return {
            ...node,
            subAnswers: toggleAnswer(node.subAnswers, answer, parentId),
          };
        }
        return node;
      });
    }

    //  MULTIPLE CHOICE: una raíz + múltiples ramas
    if (isMultiple) {
      if (isRoot) {
        const exists = tree.find(
          (a) =>
            a.typeInspectionDetailAnswerId ===
            answer.typeInspectionDetailAnswerId
        );
        if (exists) {
          return tree.filter(
            (a) =>
              a.typeInspectionDetailAnswerId !==
              answer.typeInspectionDetailAnswerId
          );
        } else {
          // Si ya hay otra raíz, la reemplaza (solo 1 raíz)
          return [{ ...answer, subAnswers: [] }];
        }
      }

      // Para subniveles, sí permite múltiples
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
    }

    return tree;
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

  const hasRootWithChildren = (tree: IFullAnswer[]) => {
    return tree.some((a) => a.subAnswers?.length);
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

          {answer.subAnswers?.length > 0 && (
            <div
              className={clsx(
                "mt-4 flex flex-row gap-4 pt-4",
                selected
                  ? "border-t border-black/10"
                  : "opacity-40 pointer-events-none"
              )}
            >
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

  const completeSign = () => {
    const store = useInspectionFullStore.getState();
    const current = store.fullInspection;
    const fullQuestion = store.fullQuestion;

    if (!current || !fullQuestion) {
      console.warn("❌ Datos incompletos, no se puede continuar.");
      return;
    }

    const updatedQuestions = current.questions.map((q) => {
      const match =
        q.typeInspectionDetailId === fullQuestion.typeInspectionDetailId;

      if (match) {
        return {
          ...q,
          statusInspectionConfig: true,
        };
      }

      return q;
    });

    store.setFullInspection({
      ...current,
      questions: updatedQuestions,
    });

    store.setStepWizard(2); // ← vuelve al paso 2
  };

  const completeCurrentQuestionWithRoot2 = (rootId: string) => {
    const store = useInspectionFullStore.getState();
    const current = store.fullInspection;
    const fullQuestion = store.fullQuestion;

    if (!current || !fullQuestion) return;

    const selectedRoot = (fullQuestion?.originalAnswers ?? []).find(
      (a) => String(a.typeInspectionDetailAnswerId) === rootId
    );

    const updatedQuestions = current.questions.map((q) => {
      if (q.typeInspectionDetailId === fullQuestion.typeInspectionDetailId) {
        return {
          ...q,
          finalResponse: selectedRoot?.response ?? "",
          statusInspectionConfig: true,
          answers: selectedTree.length > 0 ? selectedTree : q.answers,
        };
      }
      return q;
    });

    store.setFullInspection({
      ...current,
      questions: updatedQuestions,
    });

    toast.success("Pregunta respondida.");
    store.setStepWizard(2);
    setShowRootPicker(false);
  };

  const completeCurrentQuestionWithRoot = (rootLabel: string) => {
    const store = useInspectionFullStore.getState();
    const current = store.fullInspection;
    const fullQuestion = store.fullQuestion;

    if (!current || !fullQuestion) return;

    const updatedQuestions = current.questions.map((q) => {
      if (q.typeInspectionDetailId === fullQuestion.typeInspectionDetailId) {
        return {
          ...q,
          finalResponse: rootLabel, // ✅ guarda el label como "X", "OK", etc.
          statusInspectionConfig: true,
          answers: selectedTree.length > 0 ? selectedTree : q.answers,
        };
      }
      return q;
    });

    console.log("updatedQuestions: ", updatedQuestions);

    store.setFullInspection({
      ...current,
      questions: updatedQuestions,
    });

    toast.success("Pregunta respondida.");
    store.setStepWizard(2);
    setShowRootPicker(false);
  };

  const completeCurrentQuestion = (responseValue: string | null = null) => {
    const store = useInspectionFullStore.getState();
    const current = store.fullInspection;
    const fullQuestion = store.fullQuestion;

    if (!current || !fullQuestion) return;

    let resolvedFinalResponse = responseValue ?? "";

    // 🟢 Si es SingleChoice, obtener el texto de la raíz seleccionada
    if (isSingle && selectedTree.length === 1) {
      resolvedFinalResponse = selectedTree[0].response;
    }

    const updatedQuestions = current.questions.map((q) => {
      if (q.typeInspectionDetailId === fullQuestion.typeInspectionDetailId) {
        return {
          ...q,
          finalResponse: resolvedFinalResponse,
          statusInspectionConfig: true,
          answers: selectedTree.length > 0 ? selectedTree : q.answers,
        };
      }
      return q;
    });

    const currentGroupQuestions = updatedQuestions.filter(
      (q) =>
        q.groupId === fullQuestion.groupId &&
        q.groupName === fullQuestion.groupName
    );

    const groupCompleted = currentGroupQuestions.every(
      (q) => q.statusInspectionConfig
    );

    const updatedInspection = {
      ...current,
      questions: updatedQuestions,
      statusInspectionConfig: updatedQuestions.every(
        (q) => q.statusInspectionConfig
      ),
    };

    store.setFullInspection(updatedInspection);

    if (!groupCompleted) {
      const nextUnanswered = currentGroupQuestions.find(
        (q) => !q.statusInspectionConfig
      );
      if (nextUnanswered) {
        store.setFullQuestion(nextUnanswered);
        store.setGroupId(nextUnanswered.groupId);
        store.setGroupName(nextUnanswered.groupName);
        store.setTitleQuestion(nextUnanswered.question);
        store.setStepWizard(3);
        return;
      }
    }

    toast.success("Grupo finalizado correctamente.");
    store.setStepWizard(2);
  };

  const isLastQuestionInGroup = fullInspection?.questions
    .filter(
      (q) =>
        q.groupId === fullQuestion?.groupId &&
        q.groupName === fullQuestion?.groupName
    )
    .every(
      (q) =>
        q.statusInspectionConfig ||
        q.typeInspectionDetailId === fullQuestion?.typeInspectionDetailId
    );

  const isAnswerInSelectedTree = (id: number, tree: IFullAnswer[]): boolean => {
    for (const node of tree) {
      if (node.typeInspectionDetailAnswerId === id) return true;
      if (node.subAnswers && node.subAnswers.length > 0) {
        if (isAnswerInSelectedTree(id, node.subAnswers)) return true;
      }
    }
    return false;
  };

  useEffect(() => {
    /*  console.log("📡 TREE RESPUESTAS EN TIEMPO REAL:", exportTree(selectedTree));*/
  }, [selectedTree]);

  useEffect(() => {
    if (!fullQuestion || !fullInspection) return;

    // Buscar la pregunta actual
    const q = fullInspection.questions.find(
      (q) => q.typeInspectionDetailId === fullQuestion.typeInspectionDetailId
    );

    // ✅ Siempre hidrata originalAnswers si no existe
    if (q && !q.originalAnswers && fullQuestion.answers) {
      q.originalAnswers = structuredClone(fullQuestion.answers);
    }

    // ✅ Asegúrate de que esté en memoria también
    if (q?.originalAnswers) {
      fullQuestion.originalAnswers = q.originalAnswers;
    }

    // ✅ Hidratar estado visible si ya respondido
    if (q?.statusInspectionConfig) {
      setSelectedTree(q.answers ?? []);
      setTextResponse(q.finalResponse ?? "");
      setSignUrl(q.finalResponse ?? "");
      setIsSignValid(!!q.finalResponse);
    } else {
      // Si es una nueva pregunta, limpiar campos pero usar originalAnswers
      setSelectedTree([]);
      setTextResponse("");
      setSignUrl("");
      setIsSignValid(false);
    }
  }, [fullQuestion?.typeInspectionDetailId]);

  return (
    <>
      <Wizard />
      <div className="card bg-base-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
          <h1 className="text-2xl font-bold order-2 md:order-1">
            Question: {titleQuestion}
          </h1>
          <label className="rounded-full bg-red-400 order-1 md:order-2  md:flex items-center justify-center text-white overflow-hidden px-3 gap-1 py-1  md:min-w-fit flex-row flex">
            <IoIosInformationCircleOutline className="size-6" />
            {fullQuestion?.typeQuestion !== undefined
              ? TypeQuestionLabel[fullQuestion.typeQuestion as TypeQuestion]
              : ""}
          </label>
        </div>

        {isSign && (
          <AnswerSign
            onComplete={(valid, url) => {
              setIsSignValid(valid);
              setSignUrl(url);
            }}
          />
        )}

        {isText && (
          <AnswerText value={textResponse} onChange={setTextResponse} />
        )}

        {(isSingle || isMultiple) && (
          <AnswerOptions
            answers={currentAnswers}
            renderAnswer={renderAnswerRecursive}
          />
        )}

        <div className="text-center mt-6">
          {isText && (
            <button
              disabled={textResponse.length === 0}
              className="btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto text-[13px]"
              onClick={() => completeCurrentQuestion(textResponse)}
            >
              {isLastQuestionInGroup ? "Save" : "Continue"}
            </button>
          )}

          {(isSingle || isMultiple) && (
            <button
              disabled={selectedTree.length === 0}
              className="btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto text-[13px]"
              onClick={() => {
                setShowRootPicker(true);
              }}
            >
              {isLastQuestionInGroup ? "Save" : "Continue"}
            </button>
          )}

          {isSign && (
            <button
              disabled={!isSignValid}
              className="btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto text-[13px]"
              onClick={() => completeCurrentQuestion(signUrl)}
            >
              {isLastQuestionInGroup ? "Save" : "Continue"}
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center mt-5">
        <button
          className="btn font-normal bg-red-600 text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:max-w-[300px] mx-auto text-[13px]"
          onClick={() => useInspectionFullStore.getState().setStepWizard(2)}
        >
          Cancelar
        </button>
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

      {showRootPicker && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">
            <h2 className="text-lg font-bold mb-4">
              ¿Cuál es la respuesta final?
            </h2>
            <div className="flex flex-col gap-4">
              {(fullQuestion?.originalAnswers ?? []).map((root) => (
                <button
                  key={root.typeInspectionDetailAnswerId}
                  onClick={() => {
                    setSelectedRootId(root.response);
                    setShowRootPicker(false);
                    completeCurrentQuestionWithRoot(root.response);
                  }}
                  className="btn w-full min-h-[39px] p-2 rounded-md"
                >
                  {root.response}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GenerateStep3;
