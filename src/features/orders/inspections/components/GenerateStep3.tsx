import React, { useState } from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { isColorLight } from "@/shared/utils/utils";
import { IFullAnswer } from "../types/IFullTypeInspection";
import Wizard from "./Wizard";
import { IoCheckmarkSharp } from "react-icons/io5";
import ModalUsingItem from "./ModalUsingItem";

interface ItemWithQuantity {
  id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

const GenerateStep3 = () => {
  const { fullInspection, groupName, groupId, titleQuestion } =
    useInspectionFullStore();

  const [selectedPath, setSelectedPath] = useState<IFullAnswer[]>([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [modalAnswer, setModalAnswer] = useState<IFullAnswer | null>(null);

  // Obtener answers del grupo
  const currentAnswers =
    fullInspection?.questions
      .filter(
        (item) => item.groupName === groupName && item.groupId === groupId
      )
      .flatMap((question) => question.answers) ?? [];

  // Función para seleccionar una respuesta en un nivel dado
  const handleAnswerClick = (answer: IFullAnswer, level: number) => {
    const newPath = [...selectedPath.slice(0, level), answer];
    console.log(`CLICK LEVEL ${level}:`, answer);

    setSelectedPath(newPath);

    if (answer.usingItem) {
      setModalAnswer(answer);
      setShowItemModal(true);
    }

    // Muestra la estructura actual completa
    console.log(
      "📦 PATH SELECCIONADO:",
      newPath.map((a) => ({
        id: a.typeInspectionDetailAnswerId,
        response: a.response,
        usingItem: a.usingItem,
        color: a.color,
      }))
    );
  };

  // Renderizar fila de respuestas (por nivel)
  const renderAnswerRow = (
    answers: IFullAnswer[],
    level: number
  ): React.ReactElement => {
    return (
      <legend
        key={level}
        className="border h-auto border-black/8 rounded-lg p-4 mt-4 flex flex-row flex-nowrap gap-5 overflow-x-auto"
      >
        {answers.map((answer, index) => {
          const backgroundColor =
            answer.color === "#ffffff" ? "#171717" : answer.color;
          const isLight = isColorLight(backgroundColor);
          const textColor = isLight ? "#000000" : "#ffffff";

          return (
            <button
              data-color={answer.color}
              key={index}
              onClick={() => handleAnswerClick(answer, level)}
              style={{ backgroundColor, color: textColor }}
              className={`min-w-[250px] min-h-[50px] card shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg flex gap-2 flex-row items-center justify-center p-2 hover:opacity-80 `}
            >
              <p className="flex-1">{answer.response}</p>
              {selectedPath[level]?.typeInspectionDetailAnswerId ===
                answer.typeInspectionDetailAnswerId && (
                <span className="bg-red-500 rounded-full p-1 w-[20px] h-[20px] flex items-center justify-center">
                  <IoCheckmarkSharp className="size-4 font-bold text-white" />
                </span>
              )}
            </button>
          );
        })}
      </legend>
    );
  };

  return (
    <>
      <Wizard />
      <div className="card bg-base-200 p-6 shadow-xs">
        <h1 className="text-center text-2xl font-bold">
          Question: {titleQuestion}
        </h1>
        <div className="flex flex-row gap-5">
          <div className="w-full">
            {/* Nivel 0: respuestas iniciales */}
            {renderAnswerRow(currentAnswers, 0)}

            {/* Niveles recursivos: subAnswers */}
            {selectedPath.map((answer, level) =>
              answer.subAnswers?.length > 0
                ? renderAnswerRow(answer.subAnswers, level + 1)
                : null
            )}
          </div>
          <div className="w-full !hidden">
            {/* Log visual del camino seleccionado */}
            <legend className=" h-auto rounded-lg p-0 mt-4 flex flex-row flex-nowrap gap-5 overflow-x-auto">
              <div className=" bg-white border rounded-lg p-4 shadow-sm w-full">
                <h2 className="text-lg font-semibold mb-2">
                  Respuestas seleccionadas:
                </h2>
                <ul className="space-y-2 pl-4">
                  {selectedPath.map((answer, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-sm font-bold">
                        Nivel {index + 1}:
                      </span>
                      <span className="text-gray-800">{answer.response}</span>
                      {answer.subAnswers?.length > 0 && (
                        <span className="text-blue-600 text-xs font-medium">
                          📂 subniveles
                        </span>
                      )}
                    </li>
                  ))}

                  {selectedPath.length === 0 && (
                    <li className="text-sm text-gray-500 italic">
                      No hay respuestas seleccionadas.
                    </li>
                  )}
                </ul>

                {selectedPath.length > 0 && (
                  <div className="mt-3">
                    <button
                      onClick={() => setSelectedPath([])}
                      className="btn btn-sm btn-outline btn-error"
                    >
                      Limpiar selección
                    </button>
                  </div>
                )}
              </div>
            </legend>
          </div>
        </div>
      </div>
      {showItemModal && modalAnswer && (
        <ModalUsingItem
          onClose={() => setShowItemModal(false)}
          onSave={(items: ItemWithQuantity[]) => {
            modalAnswer.selectedItems = items;
            setShowItemModal(false);

            console.log("✅ Items guardados en answer:", {
              answer: modalAnswer.response,
              items,
            });
          }}
        />
      )}
    </>
  );
};

export default GenerateStep3;
