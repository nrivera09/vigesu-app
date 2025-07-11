"use client";
import React, { useState } from "react";
import { GroupStatusLabel } from "../../models/GroupTypes";
import AlertInfo from "@/shared/components/shared/AlertInfo";

const CreateOrder = () => {
  const [objFilterForm, setObjFilterForm] = useState({
    client: "",
    status: "",
    name: "",
  });
  return (
    <>
      <AlertInfo>
        All the grey spaces are editable, meaning you can write on them and add
        the required data.
      </AlertInfo>
      <fieldset className="fieldset  border-base-300 rounded-box w-full border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex flex-col col-span-1 sm:col-span-1 md:col-span-2">
            <legend className="fieldset-legend text-lg font-normal">
              Name
            </legend>
            <input
              type="text"
              className="flex-1 input input-lg bg-[#f6f3f4] w-full text-center transition-all border-0 text-lg font-normal "
              placeholder="My awesome page"
              onChange={(e) =>
                setObjFilterForm({
                  ...objFilterForm,
                  client: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-col">
            <legend className="fieldset-legend text-lg  font-normal">
              Status
            </legend>
            <select
              value={objFilterForm.status}
              className="flex-1 input input-lg bg-[#f6f3f4] w-full text-center transition-all border-0 text-lg font-normal"
              onChange={(e) =>
                setObjFilterForm({
                  ...objFilterForm,
                  status: e.target.value,
                })
              }
            >
              <option disabled={true} value="">
                Pick a status
              </option>

              {Object.entries(GroupStatusLabel).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
    </>
  );
};

export default CreateOrder;
