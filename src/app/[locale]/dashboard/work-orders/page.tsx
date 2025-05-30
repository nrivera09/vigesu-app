"use client";
import TableList from "@/shared/components/TableList";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import React from "react";
import { FaPlus } from "react-icons/fa";

const Page = () => {
  const pageTitle = usePageTitle();

  return (
    <div className="gap-4 flex flex-col  min-h-full ">
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 ">
        <h1 className=" font-bold text-3xl ">{pageTitle}</h1>
        <div>
          <button className="btn btn-neutral  rounded-full min-h-[41px]">
            <FaPlus className="text-xl font-bold" />
            <span className="bg-gray-800 py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px]">
              Create
            </span>
          </button>
        </div>
      </div>
      <div className="boddy-app overflow-y-auto">
        <div className="container  max-w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-2">
          <fieldset className="fieldset text-lg">
            <legend className="fieldset-legend font-light">Cliente</legend>
            <input type="text" className="input w-full file-input-lg text-lg" />
            <p className="label text-sm text-red-500  !hidden">
              You can edit page title later on from settings
            </p>
          </fieldset>
          <fieldset className="fieldset text-lg">
            <legend className="fieldset-legend font-light">Estado</legend>
            <select
              defaultValue="Pick a color"
              className="select w-full file-input-lg text-lg "
            >
              <option disabled={true}>Pick a color</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </fieldset>
          <fieldset className="fieldset text-lg">
            <legend className="fieldset-legend font-light">
              Nro Orden de trabajo{" "}
            </legend>
            <input type="text" className="input w-full file-input-lg text-lg" />
            <p className="label text-sm text-red-500 !hidden">
              You can edit page title later on from settings
            </p>
          </fieldset>
          <fieldset className="fieldset text-lg">
            <legend className="fieldset-legend font-light">Trabajador</legend>
            <input type="text" className="input w-full file-input-lg text-lg" />
            <p className="label text-sm text-red-500 !hidden">
              You can edit page title later on from settings
            </p>
          </fieldset>
        </div>
        <div className="container mt-8 max-w-full">
          <TableList></TableList>
        </div>
      </div>
    </div>
  );
};

export default Page;
