"use client";
import React, { useRef, useState } from "react";
import { z } from "zod";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import AlertInfo from "@/shared/components/shared/AlertInfo";
import { UserStatusLabel } from "../../models/UsersTypes";
import SignaturePad, { SignaturePadRef } from "../SignaturePad";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  rol: z.string().min(1),
});

const CreateOrder = () => {
  const router = useRouter();
  const signatureRef = useRef<SignaturePadRef>(null);
  const [disablePassword, setDisablePassword] = useState(false);
  const [objFilterForm, setObjFilterForm] = useState({
    userName: "",
    password: "",
    employeeId: "",
    employeeName: "",
    rol: "",
  });

  const handleSubmit = async () => {
    const validation = schema.safeParse(objFilterForm);
    const signatureBlob = signatureRef.current?.getImageBlob();

    if (!validation.success || !signatureBlob) {
      alert("Todos los campos son obligatorios, incluida la firma");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("UserName", objFilterForm.userName);
      formData.append("Password", objFilterForm.password);
      formData.append("EmployeeId", objFilterForm.employeeId);
      formData.append("EmployeeName", objFilterForm.employeeName);
      formData.append("Rol", objFilterForm.rol);
      formData.append("SignatureImage", signatureBlob, "signature.png");

      await axiosInstance.post("/User", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Usuario creado con éxito");
      router.push("./");
    } catch (error) {
      alert("Error al crear usuario");
      console.error(error);
    }
  };

  return (
    <>
      <AlertInfo>
        All the grey spaces are editable, meaning you can write on them and add
        the required data.
      </AlertInfo>
      <fieldset className="fieldset mb-5 border-base-300 rounded-box w-full border p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Username</span>
            <input
              type="text"
              className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
              value={objFilterForm.userName}
              onChange={(e) =>
                setObjFilterForm({ ...objFilterForm, userName: e.target.value })
              }
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Role</span>
            <select
              value={objFilterForm.rol}
              className="select text-lg bg-[#f6f3f4] text-center border-0 input-lg w-full"
              onChange={(e) =>
                setObjFilterForm({ ...objFilterForm, rol: e.target.value })
              }
            >
              <option disabled value="">
                Pick a role
              </option>
              {Object.entries(UserStatusLabel).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Employee ID</span>
            <input
              type="text"
              className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
              value={objFilterForm.employeeId}
              onChange={(e) =>
                setObjFilterForm({
                  ...objFilterForm,
                  employeeId: e.target.value,
                })
              }
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Employee Name</span>
            <input
              type="text"
              className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal"
              value={objFilterForm.employeeName}
              onChange={(e) =>
                setObjFilterForm({
                  ...objFilterForm,
                  employeeName: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Password</span>
            <div className="relative flex w-full">
              <input
                type={!disablePassword ? "password" : "text"}
                className="input border-gray-100 input-lg bg-[#f6f3f4] w-full text-left text-lg font-normal relative z-0"
                value={objFilterForm.password}
                onChange={(e) =>
                  setObjFilterForm({
                    ...objFilterForm,
                    password: e.target.value,
                  })
                }
              />
              {disablePassword ? (
                <IoEyeOutline
                  onClick={() => setDisablePassword(false)}
                  className="absolute right-0 top-1/4 mr-3 cursor-pointer size-7 text-gray-400 hover:text-gray-700 z-10"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setDisablePassword(true)}
                  className="absolute right-0 top-1/4 mr-3 cursor-pointer size-7 text-gray-400 hover:text-gray-700 z-10"
                />
              )}
            </div>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <p className="font-bold">Signature</p>
        <fieldset className="fieldset border-base-300 rounded-box w-full border mb-0 p-0">
          <SignaturePad ref={signatureRef} />
        </fieldset>
        <button
          className="btn"
          type="button"
          onClick={() => signatureRef.current?.clear()}
        >
          Limpiar firma
        </button>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleSubmit}
          className=" mt-8 btn bg-black text-white rounded-full pr-3 py-6 w-full md:w-[300px] mx-auto"
        >
          <span className="py-1 px-2 text-white font-normal rounded-full md:block text-[13px]">
            Save
          </span>
        </button>
      </div>
    </>
  );
};

export default CreateOrder;
