import React from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { GiAutoRepair } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import Wizard from "./Wizard";

const GenerateStep2 = () => {
  const { fullInspection, groupName, groupId } = useInspectionFullStore();
  console.log("Full Inspection:", fullInspection);

  const goStep = (question: string) => {
    useInspectionFullStore.getState().setStepWizard(2);
    useInspectionFullStore.getState().setCompleteStep1(true);
    useInspectionFullStore.getState().setTitleQuestion(question);
  };

  return (
    <>
      <Wizard />
      {fullInspection?.questions
        .filter(
          (item) => item.groupName === groupName && item.groupId === groupId
        )
        .map((item, index) => (
          <button
            onClick={() => goStep(item.question)}
            className="w-full card lg:card-side bg-black/80 shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg mb-5 hover:bg-[#191917] text-white hover:text-white/80"
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
