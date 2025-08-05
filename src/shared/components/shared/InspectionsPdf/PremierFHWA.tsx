import { PropsPDF } from "@/shared/types/inspection/ITypes";
import React from "react";
import logo from "@/shared/img/logoPremier.png";
import Image from "next/image";

const PremierFHWA: React.FC<PropsPDF> = ({
  data,
  inspectionDetails,
  isEditable,
}) => {
  return (
    <>
      <div className="header flex flex-row  justify-between gap-10 items-center">
        <div className="w-1/3">
          <Image src={logo} alt="Logo" width={150} className="min-w-[200px] " />
        </div>
        <div className="w-1/3">
          <span className="border text-3xl font-serif text-center w-full h-[100px] px-3 flex items-center justify-center">
            FHWA - PM
          </span>
        </div>
        <div className="w-1/3">
          <div className="border text-center w-full h-[100px] px-3 flex items-center justify-center flex-col p-1">
            <p className="text-sm mb-1 font-bold">Branch Information</p>
            <div className="border w-full h-full flex flex-col items-start justify-center p-2">
              <p className="text-sm">Premier Stockton</p>
              <p className="text-sm">1352 Speddy Rd</p>
              <p className="text-sm">Stockton CA 95206</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremierFHWA;
