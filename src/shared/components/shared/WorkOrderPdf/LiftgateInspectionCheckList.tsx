// LiftgateInspectionCheckList.tsx
import { LiftgateInspection } from "@/shared/types/order/ITypes";
import clsx from "clsx";
import React, { FC } from "react";

interface Props {
  data: LiftgateInspection;
  isEditable?: boolean;
}

interface InputLineProps {
  id: number;
  label: string;
  value?: string;
  className?: string;
  isEditable?: boolean;
}

interface SeparatorProps {
  label: string;
  isEditable?: boolean;
}

interface NumberedListProps {
  items?: string[];
  isEditable?: boolean;
}

const LiftgateInspectionCheckList: React.FC<Props> = ({ data, isEditable }) => {
  const values = data.templateInspectionQuestions.slice(0, 10);
  const inspections = data.templateInspectionQuestions.slice(10);
  console.log("value: ", values);
  return (
    <div className="text-black max-w-full font-sans bg-white mx-auto pt-[20px] border-2 mt-5 print-no-flex print-no-gap">
      <h1
        className="font-bold text-3xl  text-center"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        Liftgate Inspection Checklist
      </h1>
      <div className="flex flex-col mt-5 p-5">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-2">
            <InputLine
              isEditable={isEditable}
              label={values[0].question}
              value="10/05/2025"
              id={values[0].templateInspectionQuestionId}
            />
            <InputLine
              isEditable={isEditable}
              label={values[1].question}
              value="10/05/2025"
              id={values[1].templateInspectionQuestionId}
            />
            <InputLine
              isEditable={isEditable}
              label={values[3].question}
              value="10/05/2025"
              id={values[3].templateInspectionQuestionId}
            />
          </div>
          <div>
            <InputLine
              isEditable={isEditable}
              label={values[2].question}
              value="10/05/2025"
              id={values[2].templateInspectionQuestionId}
            />
          </div>
        </div>
        <div className="flex flex-col mt-2 gap-2">
          <div className="flex flex-row">
            <div className="w-1/3">
              <InputLine
                isEditable={isEditable}
                label={values[4].question}
                value="10/05/2025"
                id={values[4].templateInspectionQuestionId}
              />
            </div>
            <div className="w-1/3 flex justify-center">
              <InputLine
                isEditable={isEditable}
                label={values[5].question}
                value="10/05/2025"
                id={values[5].templateInspectionQuestionId}
              />
            </div>
            <div className="w-1/3 flex justify-end">
              <InputLine
                isEditable={isEditable}
                label={values[6].question}
                value="10/05/2025"
                id={values[6].templateInspectionQuestionId}
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-1/3">
              <InputLine
                isEditable={isEditable}
                label={values[7].question}
                value="10/05/2025"
                id={values[7].templateInspectionQuestionId}
              />
            </div>
            <div className="w-1/3 flex justify-center">
              <InputLine
                isEditable={isEditable}
                label={values[8].question}
                value="10/05/2025"
                id={values[8].templateInspectionQuestionId}
              />
            </div>
            <div className="w-1/3 flex justify-end">
              <InputLine
                isEditable={isEditable}
                label={values[9].question}
                value="10/05/2025"
                id={values[9].templateInspectionQuestionId}
              />
            </div>
          </div>
        </div>
      </div>
      <Separator label="90 Day Inspection" isEditable={isEditable} />
      <div className="p-5 print:block print:gap-0 flex flex-col gap-2">
        {inspections.map((item, index) => {
          return (
            <InputLineInspections
              label={item.question.toLowerCase()}
              id={item.templateInspectionQuestionId}
              key={index}
              value="N/A"
              className="!capitalize"
              isEditable={isEditable}
            />
          );
        })}
      </div>
      <Separator label="Annual Inspection" />
      <div
        className="p-5 print:block print:gap-0 flex flex-col gap-2"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        Replace hydraulic oil with Exkon Univis HVI-13 and filter per
        manufacturers specifications Inspect runner assembly pads / rollers and
        replace as needed
      </div>
      <Separator
        label="List all completed repairs made on this inspection work order "
        isEditable={isEditable}
      />
      <div className=" flex flex-col gap-1 print:gap-0 print:block">
        <LineComplete isEditable={isEditable} />
      </div>
      <div className=" flex flex-col gap-1 print:gap-0 border-t p-2 print:block">
        Commets (if applicable)
      </div>
    </div>
  );
};

export default LiftgateInspectionCheckList;

const LineComplete: React.FC<NumberedListProps> = ({
  items = [],
  isEditable,
}) => {
  const filledItems = [...items, ...Array(5)].slice(0, 5);

  return (
    <ol className="flex flex-col print:block print:gap-0">
      {filledItems.map((item, index) => (
        <li
          key={index}
          className="flex items-center border-b border-black h-[40px] gap-2"
        >
          <span className="w-5 text-right">{index + 1}.</span>
          <div
            className="flex-1"
            contentEditable={isEditable}
            suppressContentEditableWarning
          ></div>
        </li>
      ))}
    </ol>
  );
};

const InputLine: React.FC<InputLineProps> = ({
  value,
  label,
  id,
  className,
  isEditable,
}) => {
  return (
    <div
      className={clsx(
        `flex flex-row  items-center justify-start gap-2 uppercase`,
        className
      )}
    >
      <label
        className="min-w-auto font-medium"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {label}:
      </label>
      <span
        className="flex flex-1 underline"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {value}
      </span>
    </div>
  );
};

const InputLineInspections: React.FC<InputLineProps> = ({
  value,
  label,
  id,
  className,
  isEditable,
}) => {
  return (
    <div
      className={clsx(
        `flex flex-row  items-center justify-start gap-1 uppercase`,
        className
      )}
    >
      <label
        className="   flex-1 text-left "
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {label}:
      </label>
      <span
        className="flex w-[100px] border-b justify-center text-center"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {value}
      </span>
    </div>
  );
};

const Separator: React.FC<SeparatorProps> = ({ label, isEditable }) => {
  return (
    <div
      contentEditable={isEditable}
      suppressContentEditableWarning
      className={clsx(
        `bg-black/20 text-black font-bold p-3 text-center border-t-2 border-b-2 print:block print:gap-0`
      )}
    >
      {label}
    </div>
  );
};
