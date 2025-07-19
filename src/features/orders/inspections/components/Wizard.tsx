import React from "react";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";

const Wizard = () => {
  const {
    stepWizard,
    completeStep1,
    completeStep2,
    completeStep3,
    setStepWizard,
  } = useInspectionFullStore();

  const goToStep = (step: number) => {
    const store = useInspectionFullStore.getState();
    switch (step) {
      case 1:
        if (completeStep1) store.setStepWizard(1);
        break;
      case 2:
        if (completeStep1) store.setStepWizard(2);
        break;
      case 3:
        if (completeStep2) store.setStepWizard(3);
        break;
      case 4:
        if (completeStep3) store.setStepWizard(4);
        break;
    }
  };

  return (
    <ul className="steps w-full mb-10 transition-all">
      <li
        onClick={() => goToStep(1)}
        className={`step transition-all ${
          stepWizard >= 1 ? "step-neutral" : ""
        } ${completeStep1 ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        Select a group
      </li>
      <li
        onClick={() => goToStep(2)}
        className={`step transition-all ${
          stepWizard >= 2 ? "step-neutral" : ""
        } ${completeStep1 ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        Select a question
      </li>
      <li
        onClick={() => goToStep(3)}
        className={`step transition-all ${
          stepWizard >= 3 ? "step-neutral" : ""
        } ${completeStep2 ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        Select an answer
      </li>
      <li
        onClick={() => goToStep(4)}
        className={`step transition-all !hidden ${
          stepWizard >= 4 ? "step-neutral" : ""
        } ${completeStep3 ? "cursor-pointer" : "cursor-not-allowed"}`}
      >
        Set images
      </li>
    </ul>
  );
};

export default Wizard;
