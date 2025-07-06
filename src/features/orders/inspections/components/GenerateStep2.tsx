import React from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { BsQuestionCircle } from "react-icons/bs";
import Wizard from "./Wizard";
import {
  IFullQuestion,
  IFullTypeInspection,
} from "../types/IFullTypeInspection";

const GenerateStep2 = () => {
  const { fullInspection, groupName, groupId } = useInspectionFullStore();
  console.log("Full Inspection:", fullInspection);

  const goStep = (question: IFullQuestion) => {
    useInspectionFullStore.getState().setStepWizard(2);
    useInspectionFullStore.getState().setCompleteStep1(true);
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
            className="w-full flex flex-row card lg:card-side bg-black/80 shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg mb-5 hover:bg-[#191917] text-white hover:text-white/80"
            key={index}
          >
            <div className="bg-[#191917] w-fit flex items-center justify-center p-2">
              <BsQuestionCircle className="w-[20px] h-[20px]  text-white" />
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
