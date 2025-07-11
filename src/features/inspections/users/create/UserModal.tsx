"use client";

import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { axiosInstance } from "@/shared/utils/axiosInstance";

interface UserModalProps {
  onClose: () => void;
  onSuccess: () => void;
  editMode?: boolean;
  defaultData?: {
    userId: number;
    userName: string;
    password: string;
    employeeId: string;
    employeeName: string;
    rol: number;
  };
}

const UserModal: React.FC<UserModalProps> = ({
  onClose,
  onSuccess,
  editMode = false,
  defaultData,
}) => {
  const [userName, setUserName] = useState(defaultData?.userName || "");
  const [employeeId, setEmployeeId] = useState(defaultData?.employeeId || "");
  const [employeeName, setEmployeeName] = useState(
    defaultData?.employeeName || ""
  );
  const [rol, setRol] = useState(defaultData?.rol || 0);
  const [password, setPassword] = useState(defaultData?.password || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!userName || !employeeName)
      //return alert("Todos los campos son obligatorios");
      setLoading(true);
    try {
      if (editMode && defaultData?.userId !== undefined) {
        await axiosInstance.put(`/User/${defaultData.userId}`, {
          userId: defaultData.userId,
          userName,
          employeeName,
          employeeId: defaultData.userId.toString(),
          password,
          rol,
        });
      } else {
        await axiosInstance.post("/User", {
          userName,
          employeeName,
          employeeId,
          password,
          rol,
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al guardar usuario", error);
      alert("Hubo un error al guardar el usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-2xl">
        <div className="mb-3">
          <label className="block text-lg font-semibold">Username</label>
          <input
            className="input input-lg w-full"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        <div className="mb-3 !hidden">
          <label className="block text-lg font-semibold">Employee ID</label>
          <input
            className="input input-lg w-full"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg font-semibold">Employee Name</label>
          <input
            className="input input-lg w-full"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg font-semibold">Password</label>
          <input
            className="input input-lg w-full"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-lg font-semibold">Role</label>
          <select
            className="select input-lg w-full"
            value={rol}
            onChange={(e) => setRol(Number(e.target.value))}
          >
            <option value={1}>Admin</option>
            <option value={0}>Operator</option>
          </select>
        </div>

        <div className="modal-action flex justify-between">
          <button className="btn" onClick={onClose} disabled={loading}>
            <IoMdClose className="w-5 h-5 opacity-70" /> Cancelar
          </button>
          <button
            className="btn"
            onClick={handleSubmit}
            disabled={loading || !userName.trim()}
          >
            <AiOutlineSave className="w-5 h-5 opacity-70" /> Guardar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default UserModal;
