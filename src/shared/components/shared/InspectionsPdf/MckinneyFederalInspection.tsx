import { TypeQuestion } from "@/features/orders/models/workOrder.types";
import { PropsPDF } from "@/shared/types/inspection/ITypes";
import { getAnswersFromDetails } from "@/shared/utils/getAnswerValue";
import clsx from "clsx";
import React, { FC } from "react";

const MckinneyFederalInspection: React.FC<PropsPDF> = ({
  data,
  inspectionDetails,
  isEditable,
}) => {
  console.log("data: ", data);
  console.log("inspectionDetails: ", inspectionDetails);

  const getAnswerValue = (templateQuestionId: number) => {
    const match = inspectionDetails
      ? inspectionDetails.find(
          (item) =>
            Number(item.templateInspectionQuestionId) ===
            Number(templateQuestionId)
        )
      : null;

    if (!match) {
      console.warn(`❌ Sin match para QuestionId: ${templateQuestionId}`);
      return "";
    }

    const typeQuestion = data?.templateInspectionQuestions.find(
      (item) => item.templateInspectionQuestionId === Number(templateQuestionId)
    )?.typeQuestion;

    if (!typeQuestion) {
      console.warn(`❌ Sin match para typeQuestion: ${templateQuestionId}`);
      return "";
    }

    let value = "";

    switch (typeQuestion) {
      case TypeQuestion.TextInput:
        // ✅ Caso texto libre
        value = match.finalResponse?.trim() ?? "";
        break;

      case TypeQuestion.MultipleChoice:
        // ✅ Caso múltiple: aseguramos que inspeccionDetailAnswers tenga data
        if (
          Array.isArray(match.inspectionDetailAnswers) &&
          match.inspectionDetailAnswers.length > 0
        ) {
          value = match.inspectionDetailAnswers
            .map((ans) => ans.response?.trim())
            .filter(Boolean)
            .join(", ");
        }
        break;

      case TypeQuestion.SingleChoice:
        // ✅ Caso selección única: usar primera respuesta válida
        if (
          Array.isArray(match.inspectionDetailAnswers) &&
          match.inspectionDetailAnswers.length > 0
        ) {
          value = match.inspectionDetailAnswers[0]?.response?.trim() ?? "";
        }
        break;

      case TypeQuestion.Sign:
        value = match.finalResponse?.trim() ?? "";
        break;

      default:
        value = match.finalResponse?.trim() ?? "";
    }

    console.log(
      `🔎 [MATCH] QID:${templateQuestionId} | Type:${typeQuestion} | FinalResponse:"${match.finalResponse}" | Answers:[${match.inspectionDetailAnswers?.map((a) => a.response)}] | Value:"${value}"`
    );

    return value || "";
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full  border-collapse">
          <thead>
            <tr className="border">
              <th className="p-2 text-center gap-2">
                <span className="truncate">Unit #</span>
                <span className="font-normal truncate ml-2">
                  {getAnswerValue(1)}
                </span>
              </th>
              <th className="p-2 text-center gap-2">
                <span className="truncate">VIN #</span>
                <span className="font-normal truncate ml-2">
                  {getAnswerValue(2)}
                </span>
              </th>
              <th className="p-2 text-center gap-2">
                <span className="t">Make</span>
                <span className="font-normal truncate ml-2">
                  {getAnswerValue(3)}
                </span>
              </th>
              <th className="p-2 text-center gap-2">
                <span className="truncate">Year</span>
                <span className="font-normal truncate ml-2">
                  {getAnswerValue(4)}
                </span>
              </th>
              <th className="p-2 text-center gap-2">
                <span className="truncate">Lic Plates:</span>
                <span className="font-normal truncate ml-2">
                  {getAnswerValue(5)}
                </span>
              </th>
              <th className="p-2 text-center gap-2">
                <span className="truncate">State:</span>
                <span className="font-normal truncate ml-2">
                  {getAnswerValue(6)}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-2 py-4 text-center" colSpan={6}>
                <div className="flex flex-row justify-between">
                  <span className="font-bold">(✔) = Passed Inspection</span>
                  <span className="font-bold">X = Needs Further Attention</span>
                  <span className="font-bold">R = Repaired</span>
                  <span className="font-bold">N/A = Not Applicable</span>
                </div>
              </td>
            </tr>
          </tbody>
          <tbody>
            <LineTable
              check1
              label1={
                "Verify unit #, registration, VIN plate, license plate current and legible. Current Federal sticker applied"
              }
              repaired1={false}
              check2={false}
              label2={`Subframe - Inspect clamps, rail, slider pin assembly, pads, release and re-engage pins, stop bars,
crossmembers above slider rail**`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`inspect 7-way receptacle, housing, electrical harness**`}
              repaired1
              check2={false}
              label2={`Suspension - hangers, leaf springs, equalizers, torque arms**`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`inspect lighting system, splice conditions**`}
              repaired1
              check2={false}
              label2={`Inspect air lines, hoses, tanks, valves and brake chambers**`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`inspect glad hands, air lines, protector**`}
              repaired1
              check2={false}
              label2={`Brakes - drums, discs, brake lining, wheel seals**`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Verify Skybitz connectivity, Inspect for damage (if applicable)`}
              repaired1
              check2={false}
              label2={`Lubricate slack adjusters, s-cams / Verify brake adjustment**`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Inspect Purkey's charging receptacles (if applicable)`}
              repaired1
              check2={false}
              label2={`Proper lubricant level in each wheel (oil/grease)`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Pressurize air system, activate ABS System**`}
              repaired1
              check2={false}
              label2={`Inspect wheels - lugnuts torqued to 450-500 ft-lbs`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Inspect Front Body condition and coupling device**`}
              repaired1
              check2={false}
              label2={`Tires - Verify tire matching & application, tire inflation system set within 95 - 105 psi`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Mckinney decal package intact and legible`}
              repaired1
              check2={false}
              label2={`Wheel End - Hub-caps, lugnuts, valve stems accessible, hubodometer (if applicable)`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Corner locking devices (if applicable)`}
              repaired1
              check2={false}
              label2={`Metal flow through valve stem caps installed`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Inspect landing legs, k-brace, cross-shaft, wing plates, crossmembers - cycle and lubricate**`}
              repaired1
              check2={false}
              label2={`Inspect pump box, batteries and load test (if applicable)`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Inspect undercarriage - crossmembers in Bay Area not to exceed 1/2" deflection`}
              repaired1
              check2={false}
              label2={`Conspicuity tape - side panels, rear doors, ICC bumper, headboards**`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Inspect exterior side body conditions - rails, panels, posts, lift pads, pan hole covers**`}
              repaired1
              check2={false}
              label2={`Swing Doors - Inspect panels, lock rod assemblies, hinges & hinge butts, pins, seals, corner tabs,
anti-theft plate, holdbacks. Verify proper operation.`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Aerodynamic Devices - side skirts, top kits, undertray (if applicable)`}
              repaired1
              check2={false}
              label2={`Roll Door - Inspect panels, hinges, rollers, seals, operator - drums, springs, cable, track,
alignment, tension, latch, pull strap, track protector. Lubricate.`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Fuel tank and fuel system (Reefer) (if applicable)`}
              repaired1
              check2={false}
              label2={``}
              repaired2={false}
              disable2column
            />
            <LineTable
              check1
              label1={`Flatbed - Lubricate and cycle winch, Inspect headboard mounting hardware (if applicable)`}
              repaired1
              check2={false}
              label2={`Interior - Roof, roof bows, posts, e-tracks, threshold plate, scuffliners, flooring secured,
plywood, liners`}
              repaired2={false}
            />
            <LineTable
              check1
              label1={`Test air ride suspension (if applicable)**`}
              repaired1
              check2={false}
              label2={`Rear Frame - Rear sill, rear corner posts, header, ICC bumper assembly, dock bumpers** (ICC)`}
              repaired2={false}
            />
          </tbody>
        </table>
      </div>
      <div className="my-5">
        <span className="font-bold">
          **By signing and dating this form the Inspector certifies (I) the
          accuracy and completeness of the Inspection of this vehicle in
          compliance with all of the requirements of 49 C.F.R. Part 396 and (II)
          the vehicle has passed Inspection in accordance with 49 C.F.R. Part
          396.17**
        </span>
      </div>
      <div className="my-5 flex flex-col xl:flex-row gap-5 ">
        <div className="flex flex-col gap-2 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 gap-2 items-center justify-center">
            <BoxData
              title="RFO"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxData
              title="RCO"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxData
              title="RRO"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxData
              title="RDA"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxData
              title="RFI"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxData
              title="RCI"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxData
              title="RRI"
              label1="Brand:"
              label2="32nda:"
              label3="O/C:"
              label4="PSI:"
            />
            <BoxDataSmall label1="RF" label2="/8ths" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 gap-2 items-center justify-center">
            <BoxDataSmall label1="RF" label2="/8ths" />
            <BoxDataSmall label1="RC" label2="/8ths" />
            <BoxDataSmall label1="RR" label2="/8ths" />
            <BoxDataSmallLine label="Tire Size:" value="" />
            <BoxDataSmall label1="LF" label2="/8ths" />
            <BoxDataSmall label1="LC" label2="/8ths" />
            <BoxDataSmall label1="LR" label2="/8ths" />
            <BoxDataSmallLine label="Mileage:" value="" />
          </div>
        </div>
        <div className="min-w-[300px]">
          <div className="border rounded-lg">
            <p className="font-bold px-2">Comments:</p>
            <ul className="p-0 m-0 list-none flex flex-col gap-10">
              <li className="w-full "></li>
              <li className="w-full border-b border-gray-300"></li>
              <li className="w-full border-b border-gray-300"></li>
              <li className="w-full border-b border-gray-300"></li>
              <li className="w-full border-b border-gray-300"></li>
              <li className="w-full border-b border-gray-300"></li>
              <li className="w-full border-b border-gray-300"></li>
              <li className="w-full "></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="my-5 mt-8">
        <div className="flex flex-row">
          <div className="w-full md:w-1/2">
            <BoxDataSmallLine
              label="Company Name:"
              value=""
              className="!border-0"
              font={`text-normal`}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3 md:flex-row">
          <div className="w-full md:w-1/2">
            <BoxDataSmallLine
              label="Inspector Name Printed:"
              value=""
              className="!border-0 "
              font={`text-normal`}
            />
          </div>
          <div className="w-full md:w-1/2 relative top-[12px]">
            <BoxDataSmallLine
              label="Inspection Conducted By:"
              value=""
              className="!border-0"
              font={`text-normal`}
              signature={`(Inspector Signature)`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MckinneyFederalInspection;

interface LineTableProps {
  check1: boolean;
  label1?: string;
  repaired1: boolean;
  disable1column?: boolean | null;
  check2: boolean;
  label2?: string;
  repaired2: boolean;
  disable2column?: boolean | null;
}

const LineTable: FC<LineTableProps> = ({
  check1 = false,
  label1,
  repaired1 = false,
  disable1column = null,
  check2 = false,
  label2,
  repaired2 = false,
  disable2column = null,
}) => {
  return (
    <tr>
      <td className="px-2 py-4 text-center">
        {disable1column === null && (
          <div className="flex flex-row items-center justify-center gap-3">
            <span>[</span>
            <span className="font-bold">{check1 ? `X` : ``}</span>
            <span>]</span>
          </div>
        )}
      </td>
      <td className="px-2 py-4 left">
        <span>{label1}</span>
      </td>
      <td className="px-2 py-4 text-center">
        {disable1column === null && (
          <div className="flex flex-row items-center justify-center gap-3">
            <span>[</span>
            <span className="font-bold">{repaired1 ? `X` : ``}</span>
            <span>]</span>
            <span>
              <small>Repaired</small>
            </span>
          </div>
        )}
      </td>
      <td className="px-2 py-4 text-center pl-20">
        {disable2column === null && (
          <div className="flex flex-row items-center justify-center gap-3 ">
            <span>[</span>
            <span className="font-bold">{check2 ? `X` : ``}</span>
            <span>]</span>
          </div>
        )}
      </td>
      <td className="px-2 py-4 left">
        <span>{label2}</span>
      </td>
      <td className="px-2 py-4 text-center">
        {disable2column === null && (
          <div className="flex flex-row items-center justify-center gap-3">
            <span>[</span>
            <span className="font-bold">{repaired2 ? `X` : ``}</span>
            <span>]</span>
            <span>
              <small>Repaired</small>
            </span>
          </div>
        )}
      </td>
    </tr>
  );
};

interface BoxDataProps {
  title: string;
  label1: string;
  data1?: string;
  label2: string;
  data2?: string;
  label3: string;
  data3?: string;
  label4: string;
  data4?: string;
}

const BoxData: FC<BoxDataProps> = ({
  title,
  label1,
  data1,
  label2,
  data2,
  label3,
  data3,
  label4,
  data4,
}) => {
  return (
    <div className="rounded-lg border w-full px-2 py-1 gap-5">
      <p className="font-bold  ">{title}</p>
      <div className="flex flex-row">
        <div className="w-1/2 flex flex-row gap-1">
          <span className="font-bold text-sm whitespace-nowrap">{label1}</span>
          <input type="text" className="border-b w-full text-center" />
        </div>
        <div className="w-1/2 flex flex-row gap-1">
          <span className="font-bold text-sm whitespace-nowrap">{label2}</span>
          <input type="text" className="border-b w-full text-center" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="w-1/2 flex flex-row gap-1">
          <span className="font-bold text-sm whitespace-nowrap">{label3}</span>
          <input type="text" className="border-b w-full text-center" />
        </div>
        <div className="w-1/2 flex flex-row gap-1">
          <span className="font-bold text-sm whitespace-nowrap">{label4}</span>
          <input type="text" className="border-b w-full text-center" />
        </div>
      </div>
    </div>
  );
};

interface BoxDataSmallProps {
  label1: string;
  label2: string;
}

const BoxDataSmall: FC<BoxDataSmallProps> = ({ label1, label2 }) => {
  return (
    <div className="rounded-lg border w-full px-2 py-1 gap-5 flex items-center justify-center h-[50px]">
      <div className="flex flex-row w-full items-center gap-1 px-25 md:px-8 justify-between">
        <span className="font-bold text-sm">{label1}</span>
        <span className="font-bold text-sm">{label2}</span>
      </div>
    </div>
  );
};

interface BoxDataSmallLineProps {
  label: string;
  value: string;
  className?: string;
  font?: string;
  signature?: string | null;
}

const BoxDataSmallLine: FC<BoxDataSmallLineProps> = ({
  label,
  value,
  className,
  font = `text-sm`,
  signature = null,
}) => {
  return (
    <div
      className={clsx(
        `rounded-lg border w-full px-2 py-1 gap-5 flex items-center justify-center h-[50px]`,
        className
      )}
    >
      <div className="flex flex-col w-full items-center gap-1 ">
        <div className="flex flex-row items-center gap-1 w-full">
          <span className={clsx(`font-bold  whitespace-nowrap`, font)}>
            {label}
          </span>
          <span className={clsx(`font-bold  w-full`, font)}>
            <input
              type="text"
              className="border-b w-full text-center font-normal"
              defaultValue={value}
            />
          </span>
        </div>
        {signature !== null && (
          <div className="flex flex-row items-center gap-1 w-full">
            <span
              className={clsx(`font-bold  whitespace-nowrap invisible`, font)}
            >
              {label}
            </span>
            <span className={clsx(` !text-[11px] text-center w-full`, font)}>
              {signature}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
