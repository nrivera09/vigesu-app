"use client";
import React, { useState } from "react";
import AnswerItem, { type AnswerNode } from "./AnswerItem";
import { FiTrash2 } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";

interface Props {
  onClose: () => void;
  onSave: (question: string, answers: AnswerNode[]) => void;
}

type ApiRequest = {
  templateInspectionId: number;
  customerId: string;
  customerName: string;
  name: string;
  description: string;
  status: number;
  typeInspectionQuestions: {
    question: string;
    // ...
    typeInspectionDetailAnswers: {
      response: string;
      color: string;
      usingItem: boolean;
      isPrintable: boolean;
      subTypeInspectionDetailAnswers: string[];
    }[];
  }[];
};

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

  const transformAnswers = (answers: AnswerNode[]) => {
    return answers.map((answer) => ({
      response: answer.label,
      color: answer.color,
      usingItem: answer.useParts ?? false,
      isPrintable: true,
      subTypeInspectionDetailAnswers: (answer.children ?? []).map(
        (child) => child.label
      ),
    }));
  };

  const handleSubmit = () => {
    if (!question.trim()) return alert("Pregunta obligatoria");

    const validAnswers = answers.filter((a) => a.label.trim() !== "");
    if (validAnswers.length === 0)
      return alert("Debe agregar al menos una respuesta válida");

    const structuredQuestion = {
      templateInspectionQuestionId: 0,
      groupId: 0,
      question,
      typeQuestion: 0,
      status: 0,
      typeInspectionDetailAnswers: transformAnswers(validAnswers),
    };

    onSave(question, validAnswers); // solo pasamos las válidas
    console.log("✅ Final payload:", structuredQuestion);
    onClose();
  };

  const handleSubmit2 = () => {
    if (!question.trim()) return alert("Pregunta obligatoria");
    onSave(question, answers);
    console.log("ok: ", question, answers);
    onClose();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="mb-3">
          <label className="font-semibold mb-1 block text-lg">
            Select a group
          </label>
          <input
            type="text"
            className="flex-1 input input-lg bg-[#f6f3f4] w-full text-center  transition-all border-1 text-lg font-normal border-gray-100"
            placeholder="Escribe la pregunta"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <hr className=" border border-t-0 border-dashed border-gray-300 my-5" />
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

        <div className="modal-action flex items-center justify-between">
          <button type="button" className="btn" onClick={onClose}>
            <IoMdClose className="w-[20px] h-[20px] opacity-70" /> Cancelar
          </button>
          <button
            type="button"
            className="btn"
            onClick={handleSubmit}
            disabled={
              !question.trim() ||
              answers.filter((a) => a.label.trim() !== "").length === 0
            }
          >
            <AiOutlineSave className="w-[20px] h-[20px] opacity-70" />
            Guardar
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default InspectionModal;
