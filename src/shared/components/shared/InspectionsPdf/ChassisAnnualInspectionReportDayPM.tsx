import { PropsPDF } from "@/shared/types/inspection/ITypes";
import clsx from "clsx";
import React, { FC, useMemo } from "react";
import logo from "@/shared/img/logoQMSFORM.png";
import Image from "next/image";
import TreadDepthTable from "../TreadDepthTable";
import { getTodayParts } from "@/shared/utils/utils";
import { buildQuestionMatcherGeneric } from "@/shared/utils/buildQuestionMatcher";
import { DOMAIN } from "@/config/constants";

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
  const { day, month, year } = getTodayParts();
  console.log("data", data);
  console.log("details", inspectionDetails);
  const matchById = useMemo(
    () => buildQuestionMatcherGeneric(data, inspectionDetails),
    [data, inspectionDetails]
  );

  type MarkResult = { ok: boolean; fail: boolean };

  const markCheck = (response: string): MarkResult => {
    const r = (response ?? "").trim().toUpperCase();

    if (!r) return { ok: false, fail: false };
    if (r === "OK") return { ok: true, fail: false };
    return { ok: false, fail: true };
  };

  type MinimalAnswer = { response?: string | null };
  type MinimalDetail = {
    finalResponse?: string | null;
    inspectionDetailAnswers?: MinimalAnswer[];
  };

  type PFR = { pass: boolean; fail: boolean; repair: boolean };

  /**
   * Solo considera exactamente "OK", "X" y "R".
   * - Marca true si aparece en finalResponse o en cualquier inspectionDetailAnswers.
   * - No aplica prioridades: pueden ser múltiples true si coexisten (p.ej. final "X" y un answer "R").
   */
  const getPassFailRepairStrict = (detail?: MinimalDetail | null): PFR => {
    const norm = (v?: string | null) => (v ?? "").trim().toUpperCase();

    const values = [
      norm(detail?.finalResponse),
      ...(detail?.inspectionDetailAnswers ?? []).map((a) => norm(a.response)),
    ].filter(Boolean);

    return {
      pass: values.includes("OK"),
      fail: values.includes("X"),
      repair: values.includes("R"),
    };
  };

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
              value={matchById(256)?.detail?.finalResponse}
              label={"Unit #"}
              id={0}
            />
            <InputLine
              isEditable={isEditable}
              value={matchById(257)?.detail?.finalResponse}
              label={"VIN #"}
              id={0}
            />
          </div>
          <div className="flex flex-col gap-3 w-1/3 items-center">
            <InputLine
              isEditable={isEditable}
              value={matchById(258)?.detail?.finalResponse}
              label={"Vendor/Technician:"}
              id={0}
            />
            <InputLine
              isEditable={isEditable}
              value={matchById(259)?.detail?.finalResponse}
              label={"Plate #"}
              id={0}
            />
          </div>
          <div className="flex flex-col gap-3 w-1/3 items-center md:items-end">
            <InputLine
              isEditable={isEditable}
              value={matchById(260)?.detail?.finalResponse}
              label={"Milage:"}
              id={0}
            />
            <InputLine
              isEditable={isEditable}
              value={matchById(261)?.detail?.finalResponse}
              label={"DOT Due Date:"}
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
            col3="Fail"
            col4="Repair"
          />
          <tbody>
            <tr className="h-[47px]">
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
                        defaultChecked={
                          markCheck(matchById(262)?.detail?.finalResponse ?? "")
                            .ok
                        }
                        className="checkbox"
                      />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <span>No</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        defaultChecked={
                          markCheck(matchById(262)?.detail?.finalResponse ?? "")
                            .fail
                        }
                      />
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
                <input
                  type="checkbox"
                  className="checkbox"
                  defaultChecked={
                    getPassFailRepairStrict(matchById(263)?.detail).pass
                  }
                />
              </td>
              <td className="p-2 text-center border-l border-r">
                <input
                  type="checkbox"
                  className="checkbox"
                  defaultChecked={
                    getPassFailRepairStrict(matchById(263)?.detail).fail
                  }
                />
              </td>
              <td className="p-2 text-center">
                <input
                  type="checkbox"
                  className="checkbox"
                  defaultChecked={
                    getPassFailRepairStrict(matchById(263)?.detail).repair
                  }
                />
              </td>
            </tr>
          </tbody>
          <TableSystemBody
            label="Service brakes - no absence of braking action"
            checkPass={getPassFailRepairStrict(matchById(264)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(264)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(264)?.detail).repair}
          />
          <TableSystemBody
            label="Inspect for cracked, broken, missing, loose, deformed, brake parts"
            checkPass={getPassFailRepairStrict(matchById(265)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(265)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(265)?.detail).repair}
          />
          <TableSystemBody
            label="No audible air leaks"
            checkPass={getPassFailRepairStrict(matchById(266)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(266)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(266)?.detail).repair}
          />
          <TableSystemBody
            label="Inspect brake drums for external cracking or missing pieces"
            checkPass={getPassFailRepairStrict(matchById(267)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(267)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(267)?.detail).repair}
          />
          <TableSystemBody
            label="Check and adjust travel on brake chamber"
            checkPass={getPassFailRepairStrict(matchById(268)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(268)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(268)?.detail).repair}
          />
          <TableSystemBody
            label="Measure brake lining thickness"
            checkPass={getPassFailRepairStrict(matchById(269)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(269)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(269)?.detail).repair}
          />
          <TableSystemBody
            label="Inspect brake hoses,tubing, air lines, couplings, fittings, gladhands, and gladhand season - NO kicks, or blockages. NO worn;
frated loose hoses or lines. NO hoses in contact with moving parts"
            checkPass={getPassFailRepairStrict(matchById(270)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(270)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(270)?.detail).repair}
          />
          <TableSystemBody
            label="Drain air tanks"
            checkPass={getPassFailRepairStrict(matchById(271)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(271)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(271)?.detail).repair}
          />
          <TableSystemHead
            title="Suspensión"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect Ubolts; spring hangers; spring assembies; leaves; torque radius or tracking compnents; axles or any other axle
positioning parts. NO cracked; broken loose or missing parts"
            checkPass={getPassFailRepairStrict(matchById(272)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(272)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(272)?.detail).repair}
          />
          <TableSystemHead
            title="Coupling Device"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect Kinpin; upper coupler plate, slider, pintle hook, pintle hook latch, frame member providing support/attachment to the
pintle hook; fasteners; NO broken or cracked components. NO cracked welds or parent metal. NO excessive wear or chipping
of kinpin lip"
            checkPass={getPassFailRepairStrict(matchById(273)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(273)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(273)?.detail).repair}
          />
          <TableSystemHead
            title="Locking Devices"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect all twist locks , puch pins, handles, and safety devices; NO cracked welds; NO ineffective parts; NO excessively worn,
bent; broken or missing parts."
            checkPass={getPassFailRepairStrict(matchById(274)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(274)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(274)?.detail).repair}
          />
          <TableSystemHead
            title="Slider Assembly (IF required)"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect for missing, broken, damaged, binding. Inoperative, worn, or cracked parts,. NO damage or bends to slider stops. NO
elongated slider lock apertures in frame. NO cracked, or improper welds to any components or parent metal."
            checkPass={getPassFailRepairStrict(matchById(275)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(275)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(275)?.detail).repair}
          />
          <TableSystemHead
            title="Frame"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect main rails, bolsters, crossmembers, ICC bumper, light boxes, mudlfap hangers. NO cracked welds or parent metal; NO
broken, missing loose, sagging parts, no parts bent to affect melting of container to chassis."
            checkPass={getPassFailRepairStrict(matchById(276)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(276)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(276)?.detail).repair}
          />
          <TableSystemHead
            title="Landing Gear"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect legs, sandshoes, mounting boxes, braces, cross shaft, and all mounting hardware; Check operation of landing gear in
both directions. NO cracked welds or parent metal. NO broken, missing, or loose part or fasteners. All parts function properly."
            checkPass={getPassFailRepairStrict(matchById(277)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(277)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(277)?.detail).repair}
          />
          <TableSystemHead
            title="Electrical"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect seven way, wiring harness, lighting devices and reflectors. NO broken, inoperative missing or loose parts."
            checkPass={getPassFailRepairStrict(matchById(278)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(278)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(278)?.detail).repair}
          />
          <TableSystemHead
            title="Wheels & Rims"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label="Inspect all wheels, rim spacers, and fastners. NO bent, broken, cracked, improperly seated, sprung or mismatched parts. NO
elongated bolt holes or stripped parts."
            checkPass={getPassFailRepairStrict(matchById(279)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(279)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(279)?.detail).repair}
          />
          <TableSystemHead
            title="Tires"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label={`Inspect all tires for, noticable leaks, proper mating; separations; cuts through one or more ply of fabric; NO spot on tire with
tread depth 2/32" or below when measured in major tread grove. Air all tires to 100PSI (+/- 5PSI).`}
            checkPass={getPassFailRepairStrict(matchById(280)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(280)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(280)?.detail).repair}
          />
          <TableSystemHead
            title="Lubrication"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label={`Lube all fittings on landing gears, gear boxes, slack adjusters, brake cams, twist locks, pushpins, slider mechanisms and sub-
frames, add oil to wheel hubs (if equipped with oil bath bearings)`}
            checkPass={getPassFailRepairStrict(matchById(281)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(281)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(281)?.detail).repair}
          />
          <TableSystemHead
            title="Documentation / Misc"
            col2="Pass"
            col3="Fail"
            col4="Repair"
            enableBorderTop
          />
          <TableSystemBody
            label={`Check to ensure license plate is current, and that license plate, registration and chassis are properly mathced. Ensure that
current registration and copy of most current FMCSA Inspection is in document holder. Ensure unit number is clearly markerd
and are correct. Ensure that mudflaps are intact and secured to chassis.`}
            checkPass={getPassFailRepairStrict(matchById(282)?.detail).pass}
            checkFail={getPassFailRepairStrict(matchById(282)?.detail).fail}
            checkRepair={getPassFailRepairStrict(matchById(282)?.detail).repair}
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
            <tr className="h-[47px]">
              <td className="border p-2 text-center !text-[11px] font-bold">
                1st Axle
              </td>
              <td className="border p-2 text-center">
                {matchById(283)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(284)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(285)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(286)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center !text-[11px] font-bold">
                2nd Axle
              </td>
              <td className="border p-2 text-center">
                {matchById(287)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(288)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(289)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(290)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center !text-[11px] font-bold">
                3rd Axle
              </td>
              <td className="border p-2 text-center">
                {matchById(291)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(292)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(293)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(294)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center !text-[11px] font-bold">
                4th Axle
              </td>
              <td className="border p-2 text-center">
                {matchById(295)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(296)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(297)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(298)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center !text-[11px] font-bold">
                5th Axle
              </td>
              <td className="border p-2 text-center">
                {matchById(299)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(300)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(301)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(302)?.detail?.finalResponse}
              </td>
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
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(303)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(304)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(305)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(306)?.detail?.finalResponse}
              </td>
            </tr>

            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(307)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(308)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(309)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(310)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(311)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(312)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(313)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(314)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(315)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(316)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(317)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(318)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(319)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(320)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(321)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(322)?.detail?.finalResponse}
              </td>
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
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(323)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(328)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(324)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(329)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(325)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(330)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(326)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(331)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(327)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">4</td>
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
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(333)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(338)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(334)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(339)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(335)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(340)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(336)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(341)?.detail?.finalResponse}
              </td>
            </tr>
            <tr className="h-[47px]">
              <td className="border p-2 text-center">
                {matchById(337)?.detail?.finalResponse}
              </td>
              <td className="border p-2 text-center">
                {matchById(342)?.detail?.finalResponse}
              </td>
            </tr>
          </TreadDepthTable>
        </div>
      </div>
      <div className="footer my-6 w-full">
        <div className="flex flex-col gap-3 w-full ">
          <div>
            <p
              className="!text-[13px] font-bold "
              contentEditable={isEditable}
              suppressContentEditableWarning
            >
              Notes:
            </p>
          </div>
          <div className="w-full">
            <textarea
              name=""
              className="w-full bg-black/3 p-2 rounded-lg text-base"
              value={matchById(343)?.detail?.finalResponse}
              id=""
            ></textarea>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 w-full px-4">
          <div className="flex flex-row w-full md:w-1/2 gap-3 items-center justify-center">
            <div>
              <p className="!text-[13px] ">Date:</p>
            </div>
            <div className="w-full">
              <input
                type="text"
                defaultValue={`${day}/${month}/${year}`}
                className="mb-3 text-center border-b-1 border-solid border-l-0 border-r-0 border-t-0 w-full h-12"
              />
            </div>
          </div>
          <div className="flex flex-row w-full md:w-1/2 gap-3 items-center justify-center">
            <div>
              <p className="!text-[13px] whitespace-nowrap ">
                Technician Signature:
              </p>
            </div>
            <div className="w-full">
              <img
                src={`${DOMAIN}${matchById(255)?.detail?.finalResponse}`}
                className="max-w-full mx-auto object-contain h-12 mb-3 border-b-1 border-solid border-l-0 border-r-0 border-t-0 w-full"
              />
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
      <tr className="h-[47px]">
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
  checkPass?: boolean;
  checkFail?: boolean;
  checkRepair?: boolean;
}

const TableSystemBody: FC<TableSystemBodyProps> = ({
  label,
  enableBorderTop = true,
  checkFail = false,
  checkPass = false,
  checkRepair = false,
}) => {
  return (
    <tbody className={clsx("w-full", enableBorderTop && "border-t")}>
      <tr className="h-[47px]">
        <td className="p-2 text-left border-r">
          <span className="whitespace-normal">{label}</span>
        </td>
        <td className="p-2 text-center">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={checkPass}
          />
        </td>
        <td className="p-2 text-center border-l border-r">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={checkFail}
          />
        </td>
        <td className="p-2 text-center">
          <input
            type="checkbox"
            className="checkbox"
            defaultChecked={checkRepair}
          />
        </td>
      </tr>
    </tbody>
  );
};
