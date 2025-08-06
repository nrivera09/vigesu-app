import { PropsPDF } from "@/shared/types/inspection/ITypes";
import React, { FC } from "react";
import logo from "@/shared/img/logoPremier.png";
import Image from "next/image";
import clsx from "clsx";
import { getTodayParts } from "@/shared/utils/utils";

const PremierFHWA: React.FC<PropsPDF> = ({
  data,
  inspectionDetails,
  isEditable,
}) => {
  const { day, month, year } = getTodayParts();
  return (
    <>
      <div className="header flex flex-col md:flex-row  justify-between gap-5 md:gap-10 items-center">
        <div className="flex flex-col sm:flex-row w-full md:w-1/2  gap-5 md:gap-10">
          <div className="w-full sm:w-1/2 md:w-1/2">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              className="min-w-[200px] mx-auto "
            />
          </div>
          <div className="w-full sm:w-1/2 md:w-1/2">
            <span className="border text-3xl font-serif text-center w-full h-[100px] px-3 flex items-center justify-center">
              FHWA - PM
            </span>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="border text-center w-full h-[100px] px-3 flex items-center justify-center flex-col p-1">
            <p className="text-sm mb-1 font-bold">Branch Information</p>
            <div className="border w-full h-full flex flex-col items-start justify-center p-2">
              <p className="text-sm truncate">Premier Stockton</p>
              <p className="text-sm truncate">1352 Speddy Rd</p>
              <p className="text-sm truncate">Stockton CA 95206</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-1 my-5 "></div>
      <div className="flex  items-center justify-between flex-col md:flex-row gap-5 overflow-x-auto">
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <InputLine label="Trailer Number:" />
          <InputLine label="License Number:" />
          <InputLine label="HUB Reading:" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <InputLine label="Registered Owner:" />
          <InputLine label="Serial Number:" />
          <InputLine label="Location Inspection Perfomed:" />
        </div>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full border-collapse border-1 ">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left border-r">
                <span className="truncate">Items Inspected and Checked</span>
              </th>
              <th className="p-2 text-center border-r ">
                <span className="truncate">OK</span>
              </th>
              <th className="p-2 text-center border-l border-r ">
                <span className="truncate">Defective</span>
              </th>
              <th className="p-2 text-center truncate">
                <span className="truncate">Repairs Performed</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <LineBody label1="Ligths" enableBorderBottom />
            <LineBody label1="Reflectors" enableBorderBottom />
            <LineBody label1="Wiring" enableBorderBottom />
            <LineBody label1="Brakes - Front" enableBorderBottom />
            <LineBody label1="Brakes - Rear" enableBorderBottom />
            <LineBody label1="Brakes - All Adjusted" enableBorderBottom />
            <tr className=" border-b">
              <td className="text-left p-2 border-r">
                Brake Shoe Measurements
              </td>
              <td className="text-center p-2 border-r">Right Front</td>
              <td className="text-center p-2 border-r">/8ths</td>
              <td className="text-center  border-r">
                <div className="flex items-center justify-between w-full h-full ">
                  <span className="text-center w-1/2 items-center justify-center flex border-r min-h-[33px]">
                    Left Front
                  </span>
                  <span className="text-center w-1/2 items-center justify-center flex min-h-[33px]">
                    /8ths
                  </span>
                </div>
              </td>
            </tr>
            <tr className="border-b">
              <td className="text-left p-2 border-r"></td>
              <td className="text-center p-2 border-r">Right Front</td>
              <td className="text-center p-2 border-r">/8ths</td>
              <td className="text-center  border-r">
                <div className="flex items-center justify-between w-full h-full ">
                  <span className="text-center w-1/2 items-center justify-center flex border-r min-h-[33px]">
                    Left Front
                  </span>
                  <span className="text-center w-1/2 items-center justify-center flex min-h-[33px]">
                    /8ths
                  </span>
                </div>
              </td>
            </tr>

            <LineBody label1="Airlines" enableBorderBottom />
            <LineBody label1="Kingpin" enableBorderBottom />
            <LineBody label1="Rear Impact Guard" enableBorderBottom />
            <LineBody label1="Wheels & Rims" enableBorderBottom />
            <LineBody label1="Frame Assembly" enableBorderBottom />
            <LineBody label1="Suspension" enableBorderBottom />
            <LineBody label1="Axles" enableBorderBottom />
            <LineBody label1="Wheel Seals" enableBorderBottom />
            <LineBody label1="Check Oil Levels in Hubs" enableBorderBottom />
            <LineBody
              label1="Lubrication: Slack Adjusters"
              enableBorderBottom
            />
            <LineBody label1="Lubrication: Cam Bushings" enableBorderBottom />
            <LineBody label1="Lubrication: Landing Legs" enableBorderBottom />
          </tbody>
        </table>
      </div>
      <div className="my-5 overflow-x-auto">
        <table className="w-full border border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 border-r"></th>
              <th className="p-2 border-r">
                <span className="truncate">Tread Depth Readings</span>
              </th>
              <th className="p-2 border-r">
                <span className="truncate">Current Air Pressure</span>
              </th>
              <th className="p-2 border-r"></th>
              <th className="p-2 border-r">
                <span className="truncate">Tread Depth Readings</span>
              </th>
              <th className="p-2">
                <span className="truncate">Current Air Pressure</span>
              </th>
            </tr>
          </thead>
          <LineBodyTires
            label1="LFO"
            label2="/32nds"
            label3=""
            label4="RFO"
            label5="/32nds"
            label6=""
            enableBorderBottom
          />
          <LineBodyTires
            label1="LFI"
            label2="/32nds"
            label3=""
            label4="RFI"
            label5="/32nds"
            label6=""
            enableBorderBottom
          />
          <LineBodyTires
            label1="LRO"
            label2="/32nds"
            label3=""
            label4="RRO"
            label5="/32nds"
            label6=""
            enableBorderBottom
          />
          <LineBodyTires
            label1="LRI"
            label2="/32nds"
            label3=""
            label4="RRI"
            label5="/32nds"
            label6=""
          />
        </table>
      </div>
      <div className="my-5 flex flex-wrap items-center justify-center gap-2 !text-[12px] gap-y-4">
        <span>I certify that this trailer was inspected on this</span>
        <span className="flex flex-col items-center justify-center relative top-2">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-sm w-[60px] !text-[12px] text-center"
            defaultValue={day}
          />
          <p>Day</p>
        </span>
        <span>day of</span>
        <span className="flex flex-col items-center justify-center relative top-2">
          <input
            type="text"
            className="border border-gray-300 p-2 rounded-sm w-[60px] !text-[12px] text-center"
            defaultValue={month}
          />
          <p>Month</p>
        </span>
        <span>,</span>
        <span className="flex flex-col items-center justify-center relative top-2">
          <input
            type="text"
            defaultValue={year}
            className="border border-gray-300 p-2 rounded-sm w-[60px] !text-[12px] text-center"
          />
          <p>Year</p>
        </span>
        <span>
          and made all FHWA-Pl49 C.F.R. Part #396.17 through .23 requirements
        </span>
      </div>
      <div className="my-5 pt-20 flex flex-col md:flex-row gap-30 md:gap-10">
        <div className="w-full md:w-1/2 text-center">
          <div className="line border-t mb-3"></div>
          <span className="text-center w-full">
            Name of Company Perfoming Inspection/Repairs
          </span>
        </div>
        <div className="w-full md:w-1/2 text-center">
          <div className="line border-t mb-3"></div>
          <span className="text-center w-full">
            Inspectors Name (Please print and sign)
          </span>
        </div>
      </div>
    </>
  );
};

export default PremierFHWA;

interface LineBodyProps {
  label1: string;
  enableBorderTop?: boolean;
  enableBorderBottom?: boolean;
  checkedOK?: boolean;
  checkedDefective?: boolean;
}

const LineBody: FC<LineBodyProps> = ({
  label1,
  enableBorderTop,
  enableBorderBottom,
  checkedOK = false,
  checkedDefective = false,
}) => {
  return (
    <tr
      className={clsx(
        enableBorderTop && "border-t",
        enableBorderBottom && "border-b"
      )}
    >
      <td className="p-2 border-r ">
        <span className="truncate">{label1}</span>
      </td>
      <td className="p-2 text-center border-r w-[120px]">
        <input
          type="checkbox"
          defaultChecked={checkedOK}
          className="checkbox"
        />
      </td>
      <td className="p-2 text-center border-r w-[120px]">
        <input
          type="checkbox"
          defaultChecked={checkedDefective}
          className="checkbox"
        />
      </td>
      <td className="p-2 text-center"></td>
    </tr>
  );
};

interface LineBodyTiresProps {
  label1: string;
  label2: string;
  label3: string;
  label4: string;
  label5: string;
  label6: string;
  enableBorderTop?: boolean;
  enableBorderBottom?: boolean;
}

const LineBodyTires: FC<LineBodyTiresProps> = ({
  label1,
  label2,
  label3,
  label4,
  label5,
  label6,
  enableBorderTop,
  enableBorderBottom,
}) => {
  return (
    <tbody>
      <tr
        className={clsx(
          enableBorderTop && "border-t",
          enableBorderBottom && "border-b"
        )}
      >
        <td className="p-2 text-center border-r">{label1}</td>
        <td className="p-2 text-center border-r">{label2}</td>
        <td className="p-2 text-center border-r">{label3}</td>
        <td className="p-2 text-center border-r">{label4}</td>
        <td className="p-2 text-center border-r">{label5}</td>
        <td className="p-2 text-center">{label6}</td>
      </tr>
    </tbody>
  );
};

interface InputLineProps {
  label: string;
  value?: string;
}

const InputLine: React.FC<InputLineProps> = ({ label, value }) => {
  return (
    <div className="flex flex-row gap-2 items-center justify-between">
      <span className="whitespace-nowrap">{label}</span>
      <input
        type="text"
        value={value}
        className="border-1 border-gray-300 w-full p-2 rounded-sm"
      />
    </div>
  );
};
