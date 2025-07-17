// components/AnswerOptions.tsx
import React from "react";
import { IFullAnswer } from "../../types/IFullTypeInspection";

interface Props {
  answers: IFullAnswer[];
  renderAnswer: (answer: IFullAnswer, level?: number) => React.ReactNode;
}

const AnswerOptions = ({ answers, renderAnswer }: Props) => {
  return (
    <div className="mt-4 flex flex-row gap-4 flex-nowrap overflow-x-auto">
      {answers.map((answer) => (
        <div
          key={answer.typeInspectionDetailAnswerId}
          className="flex flex-col items-center"
        >
          {renderAnswer(answer, 0)}
        </div>
      ))}
    </div>
  );
};

export default AnswerOptions;
