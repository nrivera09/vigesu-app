import { PropsPDF } from "@/shared/types/inspection/ITypes";
import React from "react";
import logo from "@/shared/img/logoQMSFORM.png";
import Image from "next/image";
import clsx from "clsx";
import { DynamicTable, TableCell, TableHead, TableRow } from "../DynamicTable";
import TreadDepthTable from "../TreadDepthTable";

interface InputLineProps {
  id: number;
  label: string;
  value?: string;
  className?: string;
  isEditable?: boolean;
}

const ChassisAnnualInspectionReport: React.FC<PropsPDF> = ({
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
      <div className="body bg-black/5 w-full overflow-x-auto">
        <div className="">
          <div>
            <DynamicTable isEditable={isEditable}>
              <TableHead>
                <TableRow>
                  <TableCell
                    isHeader
                    align="left"
                    className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                  >
                    <b>Lube Unit: NOTE:</b>{" "}
                    <span className="font-normal">
                      Replace all Zerks that are not taking grease
                    </span>
                  </TableCell>
                  <TableCell isHeader align="center" className="w-[100px]">
                    Done
                  </TableCell>
                </TableRow>
              </TableHead>
              <tbody>
                <TableRow className="bg-white">
                  <TableCell
                    align="left"
                    className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    isEditable={isEditable}
                  >
                    Lube: Clevis Pins, Drain cocks, Landing gear Slack
                    adjustments, brake cams, & glad hand Ball Valves
                  </TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </tbody>
            </DynamicTable>
          </div>
          <div className="flex flex-col xl:flex-row gap-1 bg-black/0 justify-between">
            <div className="flex flex-col w-full  xl:w-1/3">
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      LIGHTS
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Front 7-way</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Rear 7-way (if equipped)</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Reflectors/Reflective Tape
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Marker Lights</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">I.D. Lights</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Taillights</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Brake/Signal Lights</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">License Plate Light</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Wiring</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">ABS Light</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      LANDING GEAR
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Lubricate</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Braces/Ears/Wing Plate</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Cross Shaft</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Wing Plates</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Pads</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Dolly Handle</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Operation & Timing</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      BODY/FRAME/SUSPENSION
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Coupler Plate & King Pin</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Crossmembers</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Frame/Suspension Rails</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Frame Attachments</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Springs & Shocks</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Bushings-arm/beams</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Rear Bumper</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Mudflaps/Hangers</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                  <TableRow className="bg-white">
                    <TableCell align="left">Dock Bumpers</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
            </div>
            <div className="flex flex-col w-full  xl:w-1/3">
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      BRAKES
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Drums/Disks</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Brake Chambers/Push Rods</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Brake Linings</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Brake Drum/Lining Alignment
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Slacks - Adjust & Lube</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">S-Cam/Cam Bushings</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Wheel Seals/Hubcaps</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Hub Oil Level</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">ABS System</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Parking Brake System</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Emergency Breakaway System
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      BBOGIE/SLIDES
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Locking Pins/Bars</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Suspension Hangers</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Springs & U-Bolts</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Torque Rods, Bushings</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Slider Assembly</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Clamps/Nuts/Studs</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Airline Spring</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      AIR RIDE SYSTEM
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">U-Bolts</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Manual Operation</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Electric Operation</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Airline Support Spring</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Airbags</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Shocks</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Pivot Arm</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Ride Height Lock</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
            </div>
            <div className="flex flex-col w-full  xl:w-1/3">
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      AIR SYSTEM
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Glad Hands & Seals</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Air Lines & Fittings</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Support Springs</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Brake Chambers</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Boost Plugs</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Leveling Valve</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Dump Valve</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Air Spring Valve</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Air Tank Condition</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Drain Tank Moisture</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      DOCUMENTATION
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">License Plate</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Insurance</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Registration</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Update Service PM Decal</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Check Decals for Fading</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">VIN Plate</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      TIRES/WHEELS
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Wheel Skid Indicator</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Check Tread Depth & Record Below
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">Check for Tire Damage</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Check & Adjust Pressure (100 PSI)
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Torque 50% of Nuts on each Wheel
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">
                      Rims/Valve Stems & Safety Locks
                    </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
              <DynamicTable isEditable={isEditable}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      isHeader
                      align="center"
                      className="w-[183px] max-w-[183px] min-w-[183px] overflow-hidden"
                    >
                      AUX ITEMS
                    </TableCell>
                    <TableCell isHeader align="center">
                      PASS
                    </TableCell>
                    <TableCell isHeader align="center">
                      FAIL
                    </TableCell>
                  </TableRow>
                </TableHead>
                <tbody>
                  <TableRow className="bg-white">
                    <TableCell align="left">Container Locks</TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">{` `} </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>

                  <TableRow className="bg-white">
                    <TableCell align="left">{` `} </TableCell>
                    <TableCell align="center"></TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </tbody>
              </DynamicTable>
            </div>
          </div>
        </div>
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
      <div className="footer my-6 w-full">
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
            <ul className="p-0 m-0 list-none w-full flex flex-col items-start justify-center ">
              <li
                className="border-b-1 w-full block"
                contentEditable={isEditable}
                suppressContentEditableWarning
              >
                {""}
              </li>
              <li
                className="border-b-1 w-full block my-5"
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

export default ChassisAnnualInspectionReport;

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
