"use client";
import React, { useState } from "react";
import AnswerItem, { type AnswerNode } from "./AnswerItem";

interface Props {
  onClose: () => void;
  onSave: (question: string, answers: AnswerNode[]) => void;
}

const InspectionModal: React.FC<Props> = ({ onClose, onSave }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<AnswerNode[]>([]);

  const addAnswer = () => {
    setAnswers((prev) => [
      ...prev,
      {
        id: `${Date.now()}`,
        label: "",
        color: "#f87171",
        useParts: false,
        children: [],
      },
    ]);
  };

  const updateAnswer = (index: number, updated: AnswerNode) => {
    const newList = [...answers];
    newList[index] = updated;
    setAnswers(newList);
  };

  const deleteAnswer = (index: number) => {
    const newList = [...answers];
    newList.splice(index, 1);
    setAnswers(newList);
  };

  const handleSubmit = () => {
    if (!question.trim()) return alert("Pregunta obligatoria");
    onSave(question, answers);
    onClose();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="mb-3">
          <label className="font-semibold mb-1 block text-lg">Question</label>
          <input
            type="text"
            className="flex-1 input input-lg bg-[#f6f3f4] w-full text-center  transition-all border-1 text-lg font-normal border-gray-100"
            placeholder="Escribe la pregunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-5">
            <span className="font-semibold">Respuestas</span>
            <button type="button" className="btn  " onClick={addAnswer}>
              Agregar Respuesta
            </button>
          </div>

          {answers.map((answer, index) => (
            <AnswerItem
              key={answer.id}
              node={answer}
              onChange={(updated) => updateAnswer(index, updated)}
              onDelete={() => deleteAnswer(index)}
            />
          ))}
        </div>

        <div className="modal-action">
          <button type="button" className="btn" onClick={onClose}>
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InspectionModal;
