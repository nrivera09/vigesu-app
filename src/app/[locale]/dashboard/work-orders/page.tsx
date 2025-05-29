import React from "react";
import { SlMagnifier } from "react-icons/sl";

const page = () => {
  return (
    <div className="gap-4 flex flex-col ">
      <h2 className="text-xl font-medium">Index Plantilla</h2>
      <div className="flex flex-row gap-4">
        <div>
          <label className="input">
            <SlMagnifier className="w-5 h-5" />

            <input
              type="search"
              className="input-xl text-[13px]"
              placeholder=""
            />
          </label>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default page;
