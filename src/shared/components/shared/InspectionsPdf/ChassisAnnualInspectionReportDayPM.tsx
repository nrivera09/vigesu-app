import { PropsPDF } from "@/shared/types/inspection/ITypes";
import clsx from "clsx";
import React, { FC } from "react";
import logo from "@/shared/img/logoQMSFORM.png";
import Image from "next/image";
import TreadDepthTable from "../TreadDepthTable";

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
              width={150}
              height={60}
              priority
            />
          </div>
        </div>
        <div className="px-[30px] pt-6 pb-3 gap-4 flex flex-row items-center justify-between w-full  overflow-x-auto">
          <div className="flex flex-col gap-3 w-1/3 items-center md:items-start">
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
          <div className="flex flex-col gap-3 w-1/3 items-center">
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
          <div className="flex flex-col gap-3 w-1/3 items-center md:items-end">
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
      <div className="body  w-full overflow-x-auto">
        <table className="w-full border-collapse border">
          <TableSystemHead
            title="Brake System"
            col2="Pass"
            col3="Fall"
            col4="Repair"
          />
          <tbody>
            <tr>
              <td className="p-2 text-left border-r">
                <div className="flex flex-row justify-between items-center gap-4">
                  <div>
                    <span className="whitespace-nowrap">ABS</span>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-10 w-full">
                    <div className="flex flex-row items-center justify-center gap-2">
                      <span>Yes</span>
                      <input
                        type="checkbox"
                        defaultChecked
                        className="checkbox"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <span>No</span>
                      <input type="checkbox" className="checkbox" />
                    </div>
                  </div>
                  <div>
                    <span className="whitespace-nowrap">
                      ABS System Function
                    </span>
                  </div>
                </div>
              </td>
              <td className="p-2 text-center">
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="p-2 text-center border-l border-r">
                <input type="checkbox" className="checkbox" />
              </td>
              <td className="p-2 text-center">
                <input type="checkbox" className="checkbox" />
              </td>
            </tr>
          </tbody>
          <TableSystemBody label="Service brakes - no absence of braking action" />
          <TableSystemBody label="Inspect for cracked, broken, missing, loose, deformed, brake parts" />
          <TableSystemBody label="No audible air leaks" />
          <TableSystemBody label="Inspect brake drums for external cracking or missing pieces" />
          <TableSystemBody label="Check and adjust travel on brake chamber" />
          <TableSystemBody label="Measure brake lining thickness" />
          <TableSystemBody
            label="Inspect brake hoses,tubing, air lines, couplings, fittings, gladhands, and gladhand season - NO kicks, or blockages. NO worn;
frated loose hoses or lines. NO hoses in contact with moving parts"
          />
          <TableSystemBody label="Drain air tanks" />
          <TableSystemHead
            title="Suspensión"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody label="Service brakes - no absence of braking action" />
          <TableSystemHead
            title="Coupling Device"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect Kinpin; upper coupler plate, slider, pintle hook, pintle hook latch, frame member providing support/attachment to the
pintle hook; fasteners; NO broken or cracked components. NO cracked welds or parent metal. NO excessive wear or chipping
of kinpin lip"
          />
          <TableSystemHead
            title="Locking Devices"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect all twist locks , puch pins, handles, and safety devices; NO cracked welds; NO ineffective parts; NO excessively worn,
bent; broken or missing parts."
          />
          <TableSystemHead
            title="Slider Assembly ( IF required)"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect for missing, broken, damaged, binding. Inoperative, worn, or cracked parts,. NO damage or bends to slider stops. NO
elongated slider lock apertures in frame. NO cracked, or improper welds to any components or parent metal."
          />
          <TableSystemHead
            title="Frame"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect main rails, bolsters, crossmembers, ICC bumper, light boxes, mudlfap hangers. NO cracked welds or parent metal; NO
broken, missing loose, sagging parts, no parts bent to affect melting of container to chassis."
          />
          <TableSystemHead
            title="Landing Gear"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect legs, sandshoes, mounting boxes, braces, cross shaft, and all mounting hardware; Check operation of landing gear in
both directions. NO cracked welds or parent metal. NO broken, missing, or loose part or fasteners. All parts function properly."
          />
          <TableSystemHead
            title="Electrical"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody label="Inspect seven way, wiring harness, lighting devices and reflectors. NO broken, inoperative missing or loose parts." />
          <TableSystemHead
            title="Wheels & Rims"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect all wheels, rim spacers, and fastners. NO bent, broken, cracked, improperly seated, sprung or mismatched parts. NO
elongated bolt holes or stripped parts."
          />
          <TableSystemHead
            title="Tires"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label={`Inspect all tires for, noticable leaks, proper mating; separations; cuts through one or more ply of fabric; NO spot on tire with
tread depth 2/32" or below when measured in major tread grove. Air all tires to 100PSI (+/- 5PSI).`}
          />
          <TableSystemHead
            title="Lubrication"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label={`Lube all fittings on landing gears, gear boxes, slack adjusters, brake cams, twist locks, pushpins, slider mechanisms and sub-
frames, add oil to wheel hubs (if equipped with oil bath bearings)`}
          />
          <TableSystemHead
            title="Documentation / Misc"
            col2="Pass"
            col3="Fall"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label={`Check to ensure license plate is current, and that license plate, registration and chassis are properly mathced. Ensure that
current registration and copy of most current FMCSA Inspection is in document holder. Ensure unit number is clearly markerd
and are correct. Ensure that mudflaps are intact and secured to chassis.`}
          />
        </table>
      </div>

      <div>
        <p
          className="italic my-3 text-center"
          contentEditable={isEditable}
          suppressContentEditableWarning
        >
          This inspection form is in compliance with FMSCA CFR49 Part 396 and
          Appendix G subpart B
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-1 justify-between">
        <div className="w-full">
          <TreadDepthTable
            isEditable={isEditable}
            showAxleColumn
            columnCount={4}
            nameTable={`TREAD DEPTH -/32"`}
          >
            <tr>
              <td className="border p-2 text-center !text-[11px] font-bold">
                1st Axle
              </td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center !text-[11px] font-bold">
                2nd Axle
              </td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center !text-[11px] font-bold">
                3rd Axle
              </td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center !text-[11px] font-bold">
                4th Axle
              </td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center !text-[11px] font-bold">
                5th Axle
              </td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
          </TreadDepthTable>
        </div>
        <div className="w-full">
          <TreadDepthTable
            isEditable={isEditable}
            showAxleColumn={false}
            columnCount={4}
            nameTable={`TIRE PREASSURE - PSI`}
          >
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>

            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
          </TreadDepthTable>
        </div>
        <div className="w-full">
          <TreadDepthTable
            isEditable={isEditable}
            showAxleColumn={false}
            columnCount={2}
            nameTable={`BRAKE LININGS - /16"`}
            columnLabels={["Left Side", "Right Side"]}
          >
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>

            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
          </TreadDepthTable>
        </div>
        <div className="w-full">
          <TreadDepthTable
            isEditable={isEditable}
            showAxleColumn={false}
            columnCount={2}
            nameTable={`Push-Rod Stroke (") <br>
Long or Short? (Circle)`}
            columnLabels={["Left Side", "Right Side"]}
          >
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>

            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
            <tr>
              <td className="border p-2 text-center"></td>
              <td className="border p-2 text-center"></td>
            </tr>
          </TreadDepthTable>
        </div>
      </div>
      <div className="footer mb-6 mt-10 w-full">
        <div className="flex flex-row gap-3 w-full px-4">
          <div>
            <p
              className="!text-[13px] "
              contentEditable={isEditable}
              suppressContentEditableWarning
            >
              Notes:
            </p>
          </div>
          <div className="w-full">
            <ul className="p-0 m-0 mt-5 list-none w-full flex flex-col items-start justify-center ">
              <li
                className="border-b-1 w-full block"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {""}
              </li>
              <li
                className="border-b-1 w-full block my-10"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {""}
              </li>
              <li
                className="border-b-1 w-full block"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {""}
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full px-4">
          <div className="flex flex-row w-full md:w-1/2 gap-3">
            <div>
              <p className="!text-[13px] ">Date:</p>
            </div>
            <div className="w-full">
              <ul className="p-0 m-0 list-none w-full flex flex-col items-start justify-center pt-8">
                <li className="border-b-1 w-full block">{""}</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row w-full md:w-1/2 gap-3">
            <div>
              <p className="!text-[13px] whitespace-nowrap ">
                Technician Signature:
              </p>
            </div>
            <div className="w-full">
              <ul className="p-0 m-0 list-none w-full flex flex-col items-start justify-center pt-8">
                <li className="border-b-1 w-full block">{""}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t-2 py-3 border-gray-400/20 w-full">
          <div className="text-gray-400">Document Ref. QMS-XXX-PRXX</div>
          <div className="text-gray-400">Revision No.:00</div>
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
        className="min-w-auto font-medium whitespace-nowrap"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {label && label + `: `}
      </label>
      <span
        className="flex flex-1 underline  whitespace-nowrap"
        contentEditable={isEditable}
        suppressContentEditableWarning
      >
        {value && value}
      </span>
    </div>
  );
};

interface TableSystemHeadProps {
  title: string;
  col2?: string;
  col3?: string;
  col4?: string;
  enableBorderTop?: boolean;
}

const TableSystemHead: FC<TableSystemHeadProps> = ({
  title,
  col2,
  col3,
  col4,
  enableBorderTop = false,
}) => {
  return (
    <thead
      className={clsx(
        "w-full bg-black/5 border-b ",
        enableBorderTop && "border-t"
      )}
    >
      <tr>
        <th className="text-center border-r">{title}</th>
        <th className="text-center w-[100px] p-2">{col2}</th>
        <th className="text-center w-[100px] p-2 border-l border-r">{col3}</th>
        <th className="text-center w-[100px] p-2">{col4}</th>
      </tr>
    </thead>
  );
};

interface TableSystemBodyProps {
  label: string;
  enableBorderTop?: boolean;
}

const TableSystemBody: FC<TableSystemBodyProps> = ({
  label,
  enableBorderTop = true,
}) => {
  return (
    <tbody className={clsx("w-full", enableBorderTop && "border-t")}>
      <tr>
        <td className="p-2 text-left border-r">
          <span className="whitespace-normal">{label}</span>
        </td>
        <td className="p-2 text-center">
          <input type="checkbox" className="checkbox" />
        </td>
        <td className="p-2 text-center border-l border-r">
          <input type="checkbox" className="checkbox" />
        </td>
        <td className="p-2 text-center">
          <input type="checkbox" className="checkbox" />
        </td>
      </tr>
    </tbody>
  );
};
