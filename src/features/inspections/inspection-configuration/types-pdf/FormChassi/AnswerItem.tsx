"use client";
import React from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

export interface AnswerNode {
  id: string;
  label: string;
  color: string;
  useParts?: boolean;
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
      children: [],
    };
    updateField("children", [...(node.children || []), newChild]);
  };

  const updateChild = (index: number, updatedChild: AnswerNode) => {
    const updatedChildren = [...(node.children || [])];
    updatedChildren[index] = updatedChild;
    updateField("children", updatedChildren);
  };

  const deleteChild = (index: number) => {
    const updatedChildren = [...(node.children || [])];
    updatedChildren.splice(index, 1);
    updateField("children", updatedChildren);
  };

  return (
    <div className="flex flex-col border p-3 rounded-md bg-white shadow-sm mb-3">
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={node.label}
          onChange={(e) => updateField("label", e.target.value)}
          placeholder="Respuesta"
          className="input input-sm flex-1"
        />

        <button
          type="button"
          onClick={addSubAnswer}
          className="btn btn-sm btn-circle"
        >
          <IoMdAdd />
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="btn btn-sm btn-circle"
        >
          <FiTrash2 />
        </button>
        {level === 1 && (
          <input
            type="color"
            value={node.color}
            onChange={(e) => updateField("color", e.target.value)}
            className="w-6 h-6"
            title="Selecciona color"
          />
        )}

        {level > 1 && (
          <label className="flex items-center gap-1 text-sm ml-2">
            <input
              type="checkbox"
              checked={node.useParts ?? false}
              onChange={(e) => updateField("useParts", e.target.checked)}
              className="checkbox checkbox-sm"
            />
            Usar Partes?
          </label>
        )}
      </div>

      {(node.children ?? []).length > 0 && (
        <div className="ml-5 mt-3">
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
