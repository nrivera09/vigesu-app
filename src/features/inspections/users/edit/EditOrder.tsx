"use client";
import React, { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import AlertInfo from "@/shared/components/shared/AlertInfo";
import { UserStatusLabel } from "../../models/UsersTypes";
import SignaturePad, { SignaturePadRef } from "../../users/SignaturePad";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import { useParams, useRouter } from "next/navigation";

import Loading from "@/shared/components/shared/Loading"; // ajusta si está en otro path
import { toast } from "sonner";
import { DOMAIN } from "@/config/constants";

const schema = z.object({
  userName: z.string().min(1),
  password: z.string().min(1),
  employeeId: z.string().min(1),
  employeeName: z.string().min(1),
  rol: z.string().min(1),
});

const EditOrder = () => {
  const router = useRouter();
  const signatureRef = useRef<SignaturePadRef>(null);
  const [signaturePreview, setSignaturePreview] = useState<string | null>(null);
  const [modifySign, setModifySign] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();
  const [disablePassword, setDisablePassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    userName: "",
    password: "",
    employeeId: "",
    employeeName: "",
    rol: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/User/GetUserId?UserId=${id}`);
        const data = res.data;

        setForm({
          userName: data.userName || "",
          password: "", // no enviar password actual
          employeeId: data.employeeId || "",
          employeeName: data.employeeName || "",
          rol: data.rol?.toString() || "",
        });

        // Mostrar firma previa si existe
        if (data.signatureImagePath) {
          const fullImageUrl = `${data.signatureImagePath}`;
          setSignaturePreview(fullImageUrl);
        }
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        alert("Error al cargar datos del usuario");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdate = async () => {
    const validation = schema.safeParse(form);
    if (!validation.success) {
      alert("Todos los campos son obligatorios");
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      formData.append("UserId", id);
      formData.append("UserName", form.userName);
      formData.append("Password", form.password);
      formData.append("EmployeeId", form.employeeId);
      formData.append("EmployeeName", form.employeeName);
      formData.append("Rol", form.rol);

      const signatureBlob = signatureRef.current?.getImageBlob();
      if (signatureBlob) {
        formData.append("SignatureImage", signatureBlob, "signature.png");
      }

      await axiosInstance.put(`/User/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Usuario creado con éxito");
      router.push("./");
    } catch (error) {
      console.error("PUT user error", error);
      alert("Error al actualizar usuario");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <AlertInfo>Modifica los campos para actualizar al usuario.</AlertInfo>
      <fieldset className="fieldset mb-5 border-base-300 rounded-box w-full border p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Customer</span>
            <input
              type="text"
              className="flex-1 input text-lg bg-[#f6f3f4] text-center border-0"
              value={form.userName}
              onChange={(e) => setForm({ ...form, userName: e.target.value })}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Role</span>
            <select
              value={form.rol}
              className="flex-1 select input-lg bg-[#f6f3f4] text-center border-0"
              onChange={(e) => setForm({ ...form, rol: e.target.value })}
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
              className="flex-1 input text-lg bg-[#f6f3f4] text-center border-0"
              value={form.employeeId}
              onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
            />
          </div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <span className="w-[30%] text-lg font-medium">Employee Name</span>
            <input
              type="text"
              className="flex-1 input text-lg bg-[#f6f3f4] text-center border-0"
              value={form.employeeName}
              onChange={(e) =>
                setForm({ ...form, employeeName: e.target.value })
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
                className="flex-1 input text-lg bg-[#f6f3f4] text-center border-0"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {disablePassword ? (
                <IoEyeOutline
                  onClick={() => setDisablePassword(false)}
                  className="absolute right-0 top-1/4 mr-3 cursor-pointer size-7 text-gray-400 hover:text-gray-700"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() => setDisablePassword(true)}
                  className="absolute right-0 top-1/4 mr-3 cursor-pointer size-7 text-gray-400 hover:text-gray-700"
                />
              )}
            </div>
          </div>
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="font-bold">Signature</p>
          {signaturePreview && (
            <button
              className="btn"
              type="button"
              onClick={() => setModifySign(!modifySign)}
            >
              Modify sign
            </button>
          )}
        </div>
        <fieldset className="fieldset border-base-300 rounded-box w-full border mb-0 p-0">
          {!modifySign && signaturePreview && (
            <img
              src={`${DOMAIN}${signaturePreview}`}
              alt="Firma actual"
              className="max-w-full h-auto p-2"
            />
          )}
        </fieldset>
        {modifySign ||
          (!signaturePreview && (
            <>
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
            </>
          ))}
      </div>

      <div className="flex justify-center items-center">
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="mt-8 btn bg-black text-white rounded-full pr-3 py-6 w-full md:w-[300px] mx-auto"
        >
          <span className="py-1 px-2 text-white text-[13px]">Update</span>
        </button>
      </div>
    </>
  );
};

export default EditOrder;
