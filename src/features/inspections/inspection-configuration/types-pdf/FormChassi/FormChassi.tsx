import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import InspectionModal from "./InspectionModal";
import { AnswerNode } from "./AnswerTree";

const FormChassi = () => {
  const [openModal, setOpenModal] = useState(false);
  const [questions, setQuestions] = useState<
    { question: string; answers: AnswerNode[] }[]
  >([]);

  const handleSave = (question: string, answers: AnswerNode[]) => {
    setQuestions((prev) => [...prev, { question, answers }]);
  };

  const inputClass = (hasError: boolean) =>
    `flex-1 input input-lg bg-[#f6f3f4] w-full text-center font-bold text-3xl transition-all border-1 text-lg font-normal ${
      hasError ? "border-red-500" : "border-gray-100"
    }`;

  const labelClass = () => `font-medium w-[30%] break-words`;
  return (
    <>
      <h2 className="font-bold text-xl md:text-2xl lg:text-3xl text-center mb-5">
        Periodic chassi and trailer inspection
      </h2>
      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>
              Last Annual Periodic Inspecion / FMCSA
            </span>
            <input type="text" className={inputClass(false)} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>New FMCSA</span>
            <input type="text" className={inputClass(false)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>
              Last California Periodic Inspection / BIT
            </span>
            <input type="text" className={inputClass(false)} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>New BIT</span>
            <input type="text" className={inputClass(false)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>License number</span>
            <input type="text" className={inputClass(false)} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>State</span>
            <input type="text" className={inputClass(false)} />
          </div>

          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Location</span>
            <input type="text" className={inputClass(false)} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  p-2 mb-0 rounded-md">
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Equipment Mar and Number</span>
            <input type="text" className={inputClass(false)} />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center col-span-1">
            <span className={labelClass()}>Chassis Owner or Lessor</span>
            <input type="text" className={inputClass(false)} />
          </div>
        </div>
      </div>
      <div className="rounded-box border-[#00000014] border-1 mb-6 p-3 gap-0 flex flex-col">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-5  p-2">
          <button
            type="button"
            onClick={() => setOpenModal(!openModal)}
            className="btn min-w-[30px] min-h-[39px] p-2 rounded-md "
          >
            Add row
          </button>
          <div className="overflow-x-auto rounded-box border-[#00000014] border-1 ">
            <table className="table w-full">
              <thead className="bg-[#191917]">
                <tr className="border-b-[#00000014]">
                  <th className=" text-center w-[40%] text-white font-medium">
                    INSPECTION ITEM
                  </th>
                  <th className=" text-center w-[15%] text-white font-medium">
                    OK
                  </th>
                  <th className=" text-center w-[40%] text-white font-medium">
                    REPAIR / REPLACE ITEMS
                  </th>
                  <th className=" text-center w-[10%] text-white font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, index) => (
                  <tr key={index}>
                    <td className="text-center">{q.question}</td>
                    <td className="text-center">
                      <span className="text-sm font-medium">
                        {q.answers.map((a) => a.label).join(", ")}
                      </span>
                    </td>
                    <td className="text-center">—</td>
                    <td></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 max-w-full">
          {/** aqui formularios */}
          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setOpenModal(!openModal)}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
      {openModal && (
        <InspectionModal
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default FormChassi;
