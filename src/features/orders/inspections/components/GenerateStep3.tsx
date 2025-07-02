import React from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { GiAutoRepair } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import Wizard from "./Wizard";
import { isColorLight } from "@/shared/utils/utils";

const GenerateStep3 = () => {
  const { fullInspection, groupName, groupId, titleQuestion } =
    useInspectionFullStore();
  console.log("Full Inspection:", fullInspection);

  return (
    <>
      <Wizard />
      <div className="card bg-base-200 p-6 shadow-xs ">
        <h1 className="text-center text-2xl font-bold">
          Question: {titleQuestion}
        </h1>
        <legend className="border h-auto border-black/8 rounded-lg p-4 mt-4 flex flex-row flex-nowrap gap-5 overflow-x-auto">
          {fullInspection?.questions
            .filter(
              (item) => item.groupName === groupName && item.groupId === groupId
            )
            .flatMap((question) => question.answers)
            .map((answer, index) => {
              const backgroundColor =
                answer.color === "#ffffff" ? "#171717" : answer.color;
              const isLight = isColorLight(backgroundColor);
              const textColor = isLight ? "#000000" : "#ffffff";

              return (
                <button
                  key={index}
                  style={{
                    backgroundColor,
                    color: textColor,
                  }}
                  className="min-w-[250px] h-[50px] card shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg flex items-center justify-center"
                >
                  <p>{answer.response}</p>
                </button>
              );
            })}
        </legend>
      </div>
    </>
  );
};

export default GenerateStep3;
