import React, { useEffect, useState } from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { isColorLight } from "@/shared/utils/utils";
import { IFullAnswer } from "../types/IFullTypeInspection";
import Wizard from "./Wizard";
import ModalUsingItem from "./ModalUsingItem";
import Loading from "@/shared/components/shared/Loading";
import { GoChecklist } from "react-icons/go";
import clsx from "clsx";
import { TypeQuestion, TypeQuestionLabel } from "../../models/workOrder.types";
import { IoIosInformationCircleOutline } from "react-icons/io";

interface ItemWithQuantity {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

const GenerateStep3 = () => {
  const { fullInspection, groupName, groupId, titleQuestion, fullQuestion } =
    useInspectionFullStore();

  const [selectedPath, setSelectedPath] = useState<IFullAnswer[][]>([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalAnswer, setModalAnswer] = useState<IFullAnswer | null>(null);
  const [initialItems, setInitialItems] = useState<ItemWithQuantity[]>([]);

  const currentAnswers =
    fullInspection?.questions
      .filter(
        (item) => item.groupName === groupName && item.groupId === groupId
      )
      .flatMap((question) => question.answers) ?? [];

  const openItemModal = (answer: IFullAnswer) => {
    setModalAnswer({ ...answer });
    setInitialItems(answer.selectedItems ?? []);
    setShowItemModal(true);
  };

  const toggleAnswerSelection = (
    answer: IFullAnswer,
    level: number,
    rootId: string
  ) => {
    const existingGroupIndex = selectedPath.findIndex(
      (group) => group[0]?.parentRootId === rootId
    );

    const isSingle = fullQuestion?.typeQuestion === TypeQuestion.SingleChoice;
    const isMultiple =
      fullQuestion?.typeQuestion === TypeQuestion.MultipleChoice;

    let updatedPath = [...selectedPath];

    if (existingGroupIndex !== -1) {
      const selectedAtLevel = updatedPath[existingGroupIndex][level];
      const isSame =
        selectedAtLevel?.typeInspectionDetailAnswerId ===
        answer.typeInspectionDetailAnswerId;

      if (isSame) {
        updatedPath[existingGroupIndex] = updatedPath[existingGroupIndex].slice(
          0,
          level
        );
      } else {
        updatedPath[existingGroupIndex] = [
          ...updatedPath[existingGroupIndex].slice(0, level),
          { ...answer, parentRootId: rootId },
        ];
      }
    } else {
      updatedPath.push([{ ...answer, parentRootId: rootId }]);
    }

    if (isSingle) {
      updatedPath = updatedPath.filter(
        (group) => group[0]?.parentRootId === rootId
      );
    }

    setSelectedPath(updatedPath);
  };

  const renderAnswerBlock = (
    answers: IFullAnswer[],
    level: number,
    rootId: string
  ): React.ReactElement => {
    const groupPath =
      selectedPath.find((group) => group[0]?.parentRootId === rootId) ?? [];

    const selectedAnswer = groupPath[level];

    return (
      <>
        <legend
          key={`level-${level}-${rootId}`}
          className="border h-auto border-black/8 rounded-lg p-4 mt-4 flex flex-row flex-nowrap overflow-x-auto gap-2"
        >
          {answers.map((answer, index) => {
            const backgroundColor =
              answer.color === "#ffffff" ? "#171717" : answer.color;
            const isLight = isColorLight(backgroundColor);
            const textColor = isLight ? "#000000" : "#ffffff";
            const isSelected =
              selectedAnswer?.typeInspectionDetailAnswerId ===
              answer.typeInspectionDetailAnswerId;

            return (
              <div key={index} className="flex flex-col items-start">
                <div className="flex flex-row items-center justify-center">
                  <div
                    className="flex flex-row items-center gap-0 cursor-pointer group"
                    onClick={() =>
                      toggleAnswerSelection(answer, level, String(rootId))
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
                          type="radio"
                          name={`radio-level-${level}-${rootId}`}
                          checked={isSelected}
                          readOnly
                          className="radio bg-white checked:bg-white checked:text-green-600 checked:border-green-500"
                        />
                      </div>
                      <div className="flex flex-row items-center justify-center min-w-auto h-[45px] overflow-hidden">
                        <p className="truncate">{answer.response}</p>
                      </div>
                    </div>
                  </div>

                  {answer.usingItem && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openItemModal(answer);
                      }}
                      className="bg-[#35353382] h-full cursor-pointer flex items-center rounded-tr-full rounded-br-full justify-center px-3 min-w-[45px]"
                    >
                      <GoChecklist className="size-7 text-black/50 transition-all hover:text-black" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </legend>

        {selectedAnswer?.subAnswers?.length > 0 &&
          renderAnswerBlock(
            selectedAnswer.subAnswers,
            level + 1,
            String(rootId)
          )}
      </>
    );
  };

  useEffect(() => {
    const result = selectedPath.map((group) =>
      group.map((answer, index) => ({
        level: index + 1,
        root: answer.parentRootId,
        response: answer.response,
        usingItem: answer.usingItem,
        selectedItems: answer.selectedItems ?? [],
      }))
    );
    console.log("📡 Estado actualizado:", result);
  }, [selectedPath]);

  if (fullQuestion?.typeQuestion === TypeQuestion.TextInput)
    return (
      <>
        <Wizard />
        <div className="card bg-base-200 p-6 shadow-xs">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-center text-2xl font-bold">
              Question: {titleQuestion}
            </h1>
            <label
              htmlFor=""
              className="rounded-full bg-red-400 hidden md:flex items-center justify-center text-white overflow-hidden px-3 gap-1 py-1"
            >
              <IoIosInformationCircleOutline className="size-6" />
              {fullQuestion?.typeQuestion
                ? TypeQuestionLabel[fullQuestion.typeQuestion as TypeQuestion]
                : ""}
            </label>
          </div>
          <legend className="border h-auto border-black/8 rounded-lg p-4 mt-4 flex flex-row flex-nowrap overflow-x-auto gap-2">
            <div className="relative grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4 w-full">
              <div className="flex-1 w-full col-span-1 md:col-span-2">
                <label
                  htmlFor=""
                  className="fieldset-legend text-lg font-normal"
                >
                  Set your answer
                </label>
                <input type="text" className="input input-lg text-lg w-full" />
              </div>
              <div className="min-w-full md:min-w-[150px]">
                <label
                  htmlFor=""
                  className=" hidden md:block fieldset-legend text-lg font-normal min-h-[33px]"
                >
                  {""}
                </label>
                <button className="btn bg-black rounded-full min-h-[39px] w-full  sm:flex border-none flex-1">
                  <span className=" py-1 px-4 text-white font-normal rounded-full  md:block text-[13px] ">
                    Save
                  </span>
                </button>
              </div>
            </div>
          </legend>
        </div>
      </>
    );

  return (
    <>
      <Wizard />
      <div className="card bg-base-200 p-6 shadow-xs">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-center text-2xl font-bold">
            Question: {titleQuestion}
          </h1>
          <label
            htmlFor=""
            className="rounded-full bg-red-400 hidden md:flex items-center justify-center text-white overflow-hidden px-3 gap-1 py-1"
          >
            <IoIosInformationCircleOutline className="size-6" />
            {fullQuestion?.typeQuestion
              ? TypeQuestionLabel[fullQuestion.typeQuestion as TypeQuestion]
              : ""}
          </label>
        </div>

        {currentAnswers.map((answer, index) =>
          renderAnswerBlock(
            [answer],
            0,
            String(answer.typeInspectionDetailAnswerId)
          )
        )}

        <div className="text-center mt-6">
          <button
            className="btn btn-success btn-lg"
            onClick={() => {
              const result = selectedPath.map((group) =>
                group.map((answer, index) => ({
                  level: index + 1,
                  root: answer.parentRootId,
                  response: answer.response,
                  usingItem: answer.usingItem,
                  selectedItems: answer.selectedItems ?? [],
                }))
              );
              console.log("🚀 JSON FINAL:", result);
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

            const updated = selectedPath.map((group) =>
              group.map((a) =>
                a.typeInspectionDetailAnswerId ===
                modalAnswer.typeInspectionDetailAnswerId
                  ? { ...a, selectedItems: items }
                  : a
              )
            );

            setSelectedPath(updated);
            setShowItemModal(false);
          }}
          initialItems={initialItems}
        />
      )}
    </>
  );
};

export default GenerateStep3;
