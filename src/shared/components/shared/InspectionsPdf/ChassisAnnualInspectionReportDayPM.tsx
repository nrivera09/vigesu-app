import { PropsPDF } from "@/shared/types/inspection/ITypes";
import clsx from "clsx";
import React from "react";
import logo from "@/shared/img/logoQMSFORM.png";
import Image from "next/image";

interface InputLineProps {
  id: number;
  label: string;
  value?: string;
  className?: string;
  isEditable?: boolean;
}

const ChassisAnnualInspectionReportDayPM: React.FC<PropsPDF> = ({
  data,
  inspectionDetails,
  isEditable,
}) => {
  return (
    <div>
      <div className="header flex flex-col items-center justify-between ">
        <div className="flex flex-row items-center justify-between w-full border">
          <div className="flex flex-col w-full border-r flex-1">
            <div className="p-2">
              <p
                className="font-bold text-2xl uppercase"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                QMS FORM
              </p>
            </div>
            <div className="p-2 border-t">
              <span
                className="text-lg text-black/40 font-medium"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                Transportation Fleet Managment - Chassis Annual Inspection
                Report
              </span>
            </div>
          </div>
          <div className=" min-w-[180px] items-center justify-center flex  h-full">
            <Image
              src={logo}
              alt="QMS FORM Logo"
              className="object-contain object-center min-w-[70%] !h-[50px]"
              width={150} // 🔹 Ajusta el tamaño
              height={60} // 🔹 Ajusta el tamaño
              priority // 🔹 Optimiza carga inicial (LCP)
            />
          </div>
        </div>
        <div className="px-[30px] pt-6 pb-3 flex flex-col md:flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-3 w-full md:w-1/3 items-center md:items-start">
            <InputLine
              isEditable={isEditable}
              value={`564654`}
              label={"Unit #"}
              id={0}
            />
            <InputLine
              isEditable={isEditable}
              value={`564654`}
              label={"Unit #"}
              id={0}
            />
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/3 items-center">
            <InputLine
              isEditable={isEditable}
              value={`564654`}
              label={"Unit #"}
              id={0}
            />
            <InputLine
              isEditable={isEditable}
              value={`564654`}
              label={"Unit #"}
              id={0}
            />
          </div>
          <div className="flex flex-col gap-3 w-full md:w-1/3 items-center md:items-end">
            <InputLine
              isEditable={isEditable}
              value={`564654`}
              label={"Unit #"}
              id={0}
            />
            <InputLine
              isEditable={isEditable}
              value={`564654`}
              label={"Unit #"}
              id={0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChassisAnnualInspectionReportDayPM;

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
        `flex flex-row  items-start justify-start gap-2 uppercase`,
        className
      )}
    >
      <label
        className="min-w-auto font-medium"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {label && label + `: `}
      </label>
      <span
        className="flex flex-1 underline "
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {value && value}
      </span>
    </div>
  );
};
