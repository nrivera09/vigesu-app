import React from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";

const Wizard = () => {
  const {
    stepWizard,
    completeStep1,
    completeStep2,
    completeStep3,
    setStepWizard,
    setCompleteStep1,
    setCompleteStep2,
    setCompleteStep3,
  } = useInspectionFullStore();
  return (
    <ul className="steps w-full mb-10 transition-all">
      <li
        onClick={() => [
          completeStep1 && setStepWizard(1),
          setCompleteStep1(false),
        ]}
        className={`step ${stepWizard > 0 && `step-neutral`} transition-all ${
          completeStep1 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        Select a question
      </li>
      <li
        onClick={() => [
          completeStep1 && setStepWizard(2),
          setCompleteStep2(false),
        ]}
        className={`step ${stepWizard > 1 && `step-neutral`}  transition-all  ${
          completeStep2 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        Set an answer
      </li>
      <li
        onClick={() => completeStep2 && setStepWizard(3)}
        className={`step ${stepWizard > 2 && `step-neutral`} transition-all  ${
          completeStep2 ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        Config. final step
      </li>
    </ul>
  );
};

export default Wizard;
