"use client";
import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";

export interface AnswerNode {
  id: string;
  label: string;
  color: string;
  useParts?: boolean;
  children?: AnswerNode[];
}

interface AnswerTreeProps {
  nodes: AnswerNode[];
  setNodes: (updated: AnswerNode[]) => void;
  level?: number;
}

const AnswerTree: React.FC<AnswerTreeProps> = ({
  nodes,
  setNodes,
  level = 1,
}) => {
  const [answerTree, setAnswerTree] = useState<AnswerNode[]>([]); // 🔸 Aquí está el fix
  const addNode = () => {
    const newNode: AnswerNode = {
      id: `${Date.now()}`,
      label: "",
      color: "#f87171",
      useParts: false,
      children: [],
    };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (
    index: number,
    field: keyof AnswerNode,
    value: string | boolean | AnswerNode[] | undefined
  ) => {
    const updated = [...nodes];
    updated[index] = { ...updated[index], [field]: value };
    setNodes(updated);
  };

  const deleteNode = (index: number) => {
    const updated = [...nodes];
    updated.splice(index, 1);
    setNodes(updated);
  };

  const addSubNode = (index: number) => {
    const updated = [...nodes];
    const children = updated[index].children || [];
    children.push({
      id: `${Date.now()}`,
      label: "",
      color: "#60a5fa",
      useParts: false,
      children: [],
    });
    updated[index].children = children;
    setNodes(updated);
  };

  const updateChildNodes = (parentIndex: number, newChildren: AnswerNode[]) => {
    const updated = [...nodes];
    updated[parentIndex].children = newChildren;
    setNodes(updated);
  };

  return (
    <div className="flex flex-col gap-3">
      {level === 1 && (
        <button
          type="button"
          onClick={addNode}
          className="btn btn-sm w-fit self-end mb-2"
        >
          Agregar Respuesta
        </button>
      )}

      {nodes.map((node, index) => (
        <div
          key={node.id}
          className="flex flex-col border p-3 rounded-md bg-white shadow-sm"
        >
          <div className="flex items-center gap-2">
            <span className="font-medium">Rsp {index + 1}</span>
            <input
              type="text"
              value={node.label}
              onChange={(e) => updateNode(index, "label", e.target.value)}
              className="input input-sm flex-1"
            />

            <button
              type="button"
              onClick={() => addSubNode(index)}
              className="btn btn-sm btn-circle"
            >
              <IoMdAdd />
            </button>
            <button
              type="button"
              onClick={() => deleteNode(index)}
              className="btn btn-sm btn-circle"
            >
              <FiTrash2 />
            </button>
            <input
              type="color"
              value={node.color}
              onChange={(e) => updateNode(index, "color", e.target.value)}
              className="w-6 h-6"
              title="Selecciona color"
            />
            {level > 1 && (
              <label className="flex items-center gap-1 text-sm ml-2">
                <input
                  type="checkbox"
                  checked={node.useParts || false}
                  onChange={(e) =>
                    updateNode(index, "useParts", e.target.checked)
                  }
                  className="checkbox checkbox-sm"
                />
                Usar Partes?
              </label>
            )}
          </div>

          {node.children && node.children.length > 0 && (
            <div className="ml-5 mt-3">
              <AnswerTree nodes={answerTree} setNodes={setAnswerTree} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AnswerTree;
