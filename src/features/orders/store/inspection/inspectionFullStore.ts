// src/shared/store/inspection/inspectionFullStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  IFullQuestion,
  IFullTypeInspection,
} from "../../inspections/types/IFullTypeInspection";

interface InspectionFullState {
  fullInspection: IFullTypeInspection | null;
  fullQuestion: IFullQuestion | null;
  groupName: string;
  groupId: number;
  titleQuestion: string;
  stepWizard: number;
  completeStep1: boolean;
  completeStep2: boolean;
  completeStep3: boolean;
  completeStep4: boolean;
  groupedQuestions: Record<string, IFullTypeInspection[]>;
  setGroupedQuestions: (data: Record<string, IFullTypeInspection[]>) => void;

  setCompleteStep1: (complete: boolean) => void;
  setCompleteStep2: (complete: boolean) => void;
  setCompleteStep3: (complete: boolean) => void;
  setCompleteStep4: (complete: boolean) => void;
  setTitleQuestion: (title: string) => void;
  setFullInspection: (data: IFullTypeInspection) => void;
  setFullQuestion: (question: IFullQuestion) => void;
  setGroupName: (name: string) => void;
  setGroupId: (id: number) => void;
  setStepWizard: (step: number) => void;
  resetFullInspection: () => void;
}

export const useInspectionFullStore = create<InspectionFullState>()(
  persist(
    (set) => ({
      fullInspection: null,
      fullQuestion: null,
      groupName: "",
      groupId: 0,
      titleQuestion: "",
      stepWizard: 1,
      completeStep1: false,
      completeStep2: false,
      completeStep3: false,
      completeStep4: false,
      groupedQuestions: {}, // ✅ inicialización
      setGroupedQuestions: (data) => set({ groupedQuestions: data }), // ✅ setter
      setCompleteStep1: (complete: boolean) => set({ completeStep1: complete }),
      setCompleteStep2: (complete: boolean) => set({ completeStep2: complete }),
      setCompleteStep3: (complete: boolean) => set({ completeStep3: complete }),
      setCompleteStep4: (complete: boolean) => set({ completeStep4: complete }),
      setTitleQuestion: (title: string) => set({ titleQuestion: title }),
      setFullInspection: (data) =>
        set({
          fullInspection: {
            ...data,
            statusInspectionConfig:
              typeof data.statusInspectionConfig === "boolean"
                ? data.statusInspectionConfig
                : false,
            questions: data.questions.map((q) => ({
              ...q,
              statusInspectionConfig:
                typeof q.statusInspectionConfig === "boolean"
                  ? q.statusInspectionConfig
                  : false,
            })),
          },
        }),
      setFullQuestion: (question) => set({ fullQuestion: question }),
      setGroupName: (name: string) => set({ groupName: name }),
      setGroupId: (id: number) => set({ groupId: id }),
      setStepWizard: (step: number) => set({ stepWizard: step }),
      resetFullInspection: () =>
        set({
          fullInspection: null,
          fullQuestion: null,
          groupName: "",
          groupId: 0,
          titleQuestion: "",
          stepWizard: 1,
          completeStep1: false,
          completeStep2: false,
          completeStep3: false,
          completeStep4: false,
          groupedQuestions: {}, // ✅ también se limpia al resetear
        }),
    }),
    {
      name: "inspection-full-storage",
    }
  )
);
