import { PropsPDF } from "@/shared/types/inspection/ITypes";
import clsx from "clsx";
import React, { FC } from "react";

const InspectionTTN: React.FC<PropsPDF> = ({
  data,
  inspectionDetails,
  isEditable,
}) => {
  return (
    <>
      <div className="header">
        <p className="text-center font-bold text-2xl uppercase mb-6">
          VEHICLE INSPECTION REPORT
        </p>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1 items-start justify-center">
            <div className="min-w-10 min-h-10 border mx-auto mb-3"></div>
            <div className="flex flex-col gap-1 items-start justify-center">
              <p>Mayflower Transit, LLC</p>
              <p>#1 Mayflower Drive</p>
              <p>Fenton, MO 63026-1350</p>
              <p>US DOT# 125563</p>
              <p>Tel: (636) 305-4000</p>
              <p>Fax: (636) 305-6610</p>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center">
            <div className="min-w-10 min-h-10 border mx-auto mb-3"></div>
            <div className="flex flex-col gap-1 items-end justify-center">
              <p className="text-right">United Van Lines, LLC</p>
              <p className="text-right">#1 United Drive</p>
              <p className="text-right">Fenton, MO 63026-1350</p>
              <p className="text-right">US DOT# 077949</p>
              <p className="text-right">Tel: (636) 326-3100</p>
              <p className="text-right">Fax: (636) 305-4682</p>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto my-5">
          <table className="border-collapse w-full">
            <thead>
              <tr>
                <th></th>
                <th className="border p-2">
                  <span className="truncate">UNIT #</span>
                </th>
                <th className="border p-2">
                  <span className="truncate">MAKE</span>
                </th>
                <th className="border p-2">
                  <span className="truncate">SERIAL NUMBER</span>
                </th>
                <th className="border p-2">
                  <span className="truncate">YEAR</span>
                </th>
                <th className="border p-2">
                  <span className="truncate text-xs line-clamp-2">
                    BASE <br /> PLATE
                  </span>
                </th>
                <th className="border p-2">
                  <span className="truncate">LICENSE NO.</span>
                </th>
                <th className="border p-2">
                  <span className="truncate">LENGTH</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  <span className="truncate font-bold">TRACTOR</span>
                </td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
              </tr>
              <tr>
                <td className="border p-2">
                  <span className="truncate font-bold">TRAILER</span>
                </td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
              </tr>
              <tr>
                <td className="border p-2">
                  <span className="truncate font-bold">TRUCK</span>
                </td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
                <td className="border p-2 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="overflow-x-auto">
          <p className="font-bold text-center">
            COMPANY POLICY PROHIBITS THE USE A WELDER OR CUTTING TORCH ON LOADED
            EQUIPMENT
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
            <InlineInput label="Agent Name" value={``} />
            <InlineInput label="Agent #" value={``} />
            <InlineInput label="Odometer Mileage" value={``} />
            <InlineInput label="Van Operator" value={``} />
            <InlineInput label="Driver I.D." value={``} />
          </div>
        </div>
      </div>
      <div className="main">
        <div className="flex flex-row gap-0.5">
          <div className="w-[70%] flex flex-row gap-0.5">
            <BoxCard title="TRUCK CHASSIS or TRACTOR" className="w-[60%]">
              <div className="w-[300px] flex flex-col">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold">
                          PASS
                        </span>
                      </th>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold line-clamp-2">
                          NEEDS <br /> REPAIR
                        </span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <BoxCardInput check1={true} check2={false} label="Engine" />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Manifold"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Exhaust"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Parking Brakes"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Air/Vacuum Lines"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Low Air/Vacuum Device"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Air Pressure"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Breakway Valve"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Light Cord to Van"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Steering"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Windshield Wipers"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Horn (City & Air)"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Lights and Reflectors"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Speedometer"
                    />
                    <BoxCardInput check1={true} check2={false} label="Glass" />
                  </tbody>
                </table>
              </div>
              <div className="w-[300px] flex flex-col">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold">
                          PASS
                        </span>
                      </th>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold line-clamp-2">
                          NEEDS <br /> REPAIR
                        </span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <BoxCardInput check1={true} check2={false} label="Mirror" />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="MFifth Wheel"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Wheels & Lugs"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label={`<small class="text-xs line-clamp-3 text-left">Springs, Hangers, etc. <br> Air Ride System</small>`}
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Seat Belts"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Oil & Grease Leaks"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Cooling System"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Fuel System"
                    />
                    <BoxCardInput check1={true} check2={false} label="Frame" />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Lubrication"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="General Mechanical Condition"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Conspicuity Markings"
                    />
                  </tbody>
                </table>
              </div>
            </BoxCard>
            <BoxCard title="TRUCK BODY or TRAILER" className="w-[40%]">
              <div className="w-[300px] flex flex-col">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold">
                          PASS
                        </span>
                      </th>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold line-clamp-2">
                          NEEDS <br /> REPAIR
                        </span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <BoxCardInput check1={true} check2={false} label="Engine" />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Airlines from Glad Hands to Chambers"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Wheels & Axles"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Mud Flaps"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Ligths & Reflectors"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Landing Supports"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label={`<small class="text-xs line-clamp-3 text-left">Springs, Hangers, etc. <br> Air Ride System</small>`}
                    />
                    <BoxCardInput check1={true} check2={false} label="Frame" />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label={`Body Panels <small class="text-xs line-clamp-3 text-left">(Inside & Outside)</small>`}
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Doors-Seals-Water Leaks?"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Roof-Holes-Water Leaks?"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Lubrication"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="King Pin/Apron"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label={`Lift Gate Safety Pins <small class="text-xs line-clamp-3 text-left">(if Applicable)</small>`}
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Conspicuity Markings"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Reat Impact Guards"
                    />
                  </tbody>
                </table>
              </div>
            </BoxCard>
          </div>
          <div className="w-[30%]">
            <BoxCard title="EMERGENCY EQUIPMENT" className="w-full">
              <div className="w-full flex flex-col">
                <table className="border-collapse w-full">
                  <thead>
                    <tr>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold">
                          PASS
                        </span>
                      </th>
                      <th className=" min-w-[70px] w-[70px] max-w-[70px] pb-2 px-2">
                        <span className="underline uppercase font-bold line-clamp-2">
                          NEEDS <br /> REPAIR
                        </span>
                      </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Fire Extinguisher"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="3 Reflective Triangles"
                    />
                    <BoxCardInput
                      check1={true}
                      check2={false}
                      label="Tire Chains (Optional)"
                    />
                    <BoxCardInput check1={true} check2={false} label="Other" />
                  </tbody>
                </table>
              </div>
            </BoxCard>
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default InspectionTTN;

interface InlineInputProps {
  label: string;
  value?: string;
}

const InlineInput: FC<InlineInputProps> = ({ label, value }) => {
  return (
    <div className="flex flex-row gap-2">
      <label htmlFor="" className="whitespace-nowrap">
        {label}
      </label>
      <input
        type="text"
        className="border-b w-full text-center"
        defaultValue={value}
      />
    </div>
  );
};

interface BoxCardProps {
  children: React.ReactNode;
  title: string;
  className?: string;
}

const BoxCard: FC<BoxCardProps> = ({ children, title, className }) => {
  return (
    <div className={clsx(`border overflow-x-auto`, className)}>
      <p className="w-fit border p-2 font-bold border-l-0 border-t-0">
        {title}
      </p>
      <div className="flex flex-row gap-2 p-2">{children}</div>
    </div>
  );
};

interface BoxCardInputProps {
  check1?: boolean;
  check2?: boolean;
  label: string;
}

const BoxCardInput: FC<BoxCardInputProps> = ({
  check1 = false,
  check2 = false,
  label,
}) => {
  return (
    <tr className=" ">
      <td className="w-[70px] text-center pb-2">
        <input type="checkbox" className="checkbox" defaultChecked={check1} />
      </td>
      <td className="w-[70px] text-center pb-2">
        <input type="checkbox" className="checkbox" defaultChecked={check2} />
      </td>
      <td className="w-full text-left pb-2 ">
        <span
          className="truncate text-ellipsis "
          dangerouslySetInnerHTML={{ __html: label }}
        />
      </td>
    </tr>
  );
};
