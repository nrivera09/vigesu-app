import React from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { BsQuestionCircle } from "react-icons/bs";
import Wizard from "./Wizard";
import {
  IFullQuestion,
  IFullTypeInspection,
} from "../types/IFullTypeInspection";
import Lottie from "lottie-react";
import checkLottie from "@/assets/lotties/check.json";
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";

const GenerateStep2 = () => {
  const { fullInspection, groupName, groupId } = useInspectionFullStore();
  console.log("Full Inspection:", fullInspection);

  const goStep = (question: IFullQuestion) => {
    useInspectionFullStore.getState().setStepWizard(3);
    useInspectionFullStore.getState().setCompleteStep2(true);
    useInspectionFullStore.getState().setTitleQuestion(question.question);
    useInspectionFullStore.getState().setFullQuestion(question);
  };

  return (
    <>
      <Wizard />
      <div className="flex flex-col my-10 text-center justify-items-center">
        <h1 className="font-bold text-2xl">{fullInspection?.name ?? ""}</h1>
        <p>{fullInspection?.description ?? ""}</p>
      </div>

      {fullInspection?.questions
        .filter(
          (item) => item.groupName === groupName && item.groupId === groupId
        )
        .map((item, index) => (
          <button
            onClick={() => goStep(item)}
            className={clsx(
              `w-full flex flex-row card lg:card-side  shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg mb-5  text-white `,
              !item.statusInspectionConfig
                ? `bg-black/80 hover:bg-[#191917] hover:text-white/80`
                : `bg-green-800/80 hover:bg-green-800 hover:text-white/80`
            )}
            key={index}
          >
            <div
              className={clsx(
                ` w-fit flex items-center justify-center p-2`,
                item.statusInspectionConfig ? `bg-green-800` : `bg-[#191917]`
              )}
            >
              {item.statusInspectionConfig ? (
                <FaCheckCircle className="w-[20px] h-[20px]  text-green-400 mx-auto" />
              ) : (
                <BsQuestionCircle className="w-[20px] h-[20px]  text-white mx-auto" />
              )}
            </div>

            <div className="card-body flex flex-row justify-between gap-5">
              <div>
                <h2 className="card-title">{item.question}</h2>
              </div>
            </div>
          </button>
        ))}
    </>
  );
};

export default GenerateStep2;
