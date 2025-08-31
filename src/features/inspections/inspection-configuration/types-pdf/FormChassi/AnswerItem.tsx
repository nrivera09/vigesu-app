"use client";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoPrintOutline } from "react-icons/io5";

export interface AnswerNode {
  id: string;
  label: string;
  color: string;
  useParts?: boolean;
  usePrint?: boolean; // <- persiste en memoria
  children?: AnswerNode[];
}

interface Props {
  node: AnswerNode;
  onChange: (updated: AnswerNode) => void;
  onDelete: () => void;
  level?: number;
}

const AnswerItem: React.FC<Props> = ({
  node,
  onChange,
  onDelete,
  level = 1,
}) => {
  const updateField = (
    field: keyof AnswerNode,
    value: AnswerNode[keyof AnswerNode]
  ) => {
    onChange({ ...node, [field]: value });
  };

  const addSubAnswer = () => {
    const newChild: AnswerNode = {
      id: `${Date.now()}`,
      label: "",
      color: "#60a5fa",
      useParts: false,
      usePrint: false,
      children: [],
    };
    onChange({ ...node, children: [...(node.children || []), newChild] });
  };

  const updateChild = (index: number, updatedChild: AnswerNode) => {
    const updatedChildren = [...(node.children || [])];
    updatedChildren[index] = updatedChild;
    onChange({ ...node, children: updatedChildren });
  };

  const deleteChild = (index: number) => {
    const updatedChildren = [...(node.children || [])];
    updatedChildren.splice(index, 1);
    onChange({ ...node, children: updatedChildren });
  };

  return (
    <div className="flex flex-col p-3 rounded-box border-[#00000014] border-1 mb-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={node.label}
          onChange={(e) => updateField("label", e.target.value)}
          placeholder="Respuesta"
          className="flex-1 input input-lg bg-[#f6f3f4] w-full text-left transition-all border-1 text-lg font-normal border-gray-100"
        />

        <button
          type="button"
          onClick={addSubAnswer}
          className="btn min-w-[30px] min-h-[30px] p-2 rounded-md"
        >
          <IoMdAdd className="w-[20px] h-[20px] opacity-70" />
        </button>

        <button
          type="button"
          onClick={onDelete}
          className="btn min-w-[30px] min-h-[30px] p-2 rounded-md"
        >
          <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
        </button>

        {level === 1 && (
          <input
            type="color"
            value={node.color}
            onChange={(e) => updateField("color", e.target.value)}
            className="btn min-w-[30px] min-h-[30px] p-2 rounded-md"
            title="Selecciona color"
          />
        )}

        {level > 1 && (
          <label className="label text-sm text-black/80">
            <input
              type="checkbox"
              checked={node.useParts ?? false}
              className="checkbox"
              onChange={(e) => updateField("useParts", e.target.checked)}
            />
            Usar Partes?
          </label>
        )}

        {level > 1 && (
          <label className="label text-sm">
            <input
              type="checkbox"
              checked={node.usePrint ?? false}
              className="checkbox"
              onChange={(e) => updateField("usePrint", e.target.checked)}
            />
            <IoPrintOutline className="text-3xl text-black/50" />
          </label>
        )}
      </div>

      {(node.children ?? []).length > 0 && (
        <div className="ml-0 mt-3">
          {(node.children ?? []).map((child, index) => (
            <AnswerItem
              key={child.id}
              node={child}
              onChange={(updated) => updateChild(index, updated)}
              onDelete={() => deleteChild(index)}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerItem;
