"use client";
import React, { useEffect, useState, useRef } from "react";
import AnswerItem, { type AnswerNode } from "./AnswerItem";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSave } from "react-icons/ai";
import { debounce } from "lodash";
import { axiosInstance } from "@/shared/utils/axiosInstance";

interface Props {
  onClose: () => void;
  onSave: (
    question: string,
    answers: AnswerNode[],
    selectedGroup: { groupId: number; name: string; status: number },
    selectedQuestion: {
      templateInspectionQuestionId: number;
      question: string;
      typeQuestion: number;
    }
  ) => void;
  templateId: number;
}

const InspectionModal: React.FC<Props> = ({ onClose, onSave, templateId }) => {
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState<AnswerNode[]>([]);
  const [groupInput, setGroupInput] = useState("");
  const [groups, setGroups] = useState<
    { groupId: number; name: string; status: number }[]
  >([]);
  interface Group {
    groupId: number;
    name: string;
    status: number;
  }

  interface TemplateInspectionQuestion {
    templateInspectionQuestionId: number;
    question: string;
    typeQuestion: number;
    // Add other properties if needed
  }

  const [groupSuggestions, setGroupSuggestions] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [questionSuggestions, setQuestionSuggestions] = useState<
    TemplateInspectionQuestion[]
  >([]);
  const [filteredQuestions, setFilteredQuestions] = useState<
    TemplateInspectionQuestion[]
  >([]);
  const [selectedQuestion, setSelectedQuestion] =
    useState<TemplateInspectionQuestion | null>(null);

  const debouncedGroupSearch = useRef(
    debounce((text: string, data: Group[]) => {
      const filtered = data.filter((g) =>
        g.name.toLowerCase().includes(text.toLowerCase())
      );
      setGroupSuggestions(filtered);
    }, 300)
  ).current;

  useEffect(() => {
    axiosInstance
      .get("/Group")
      .then((res) => setGroups(res.data.items || []))
      .catch((err) => console.error("Error al cargar grupos:", err));
  }, []);

  useEffect(() => {
    if (!templateId) return;

    axiosInstance
      .get("/TemplateInspection/GetTemplateInspectionById", {
        params: { TemplateInspectionId: templateId },
      })
      .then((res) =>
        setQuestionSuggestions(res.data.templateInspectionQuestions || [])
      )
      .catch((err) => console.error("Error al cargar preguntas:", err));
  }, [templateId]);

  useEffect(() => {
    if (question.trim().length >= 3) {
      const filtered = questionSuggestions.filter((q) =>
        q.question.toLowerCase().includes(question.toLowerCase())
      );
      setFilteredQuestions(filtered);
    } else {
      setFilteredQuestions([]);
    }
  }, [question]);

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

  const handleGroupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGroupInput(value);
    setSelectedGroup(null);
    debouncedGroupSearch(value, groups);
  };

  const handleSubmit = () => {
    if (!question.trim()) return alert("Pregunta obligatoria");
    const validAnswers = answers.filter((a) => a.label.trim() !== "");
    if (validAnswers.length === 0)
      return alert("Debe agregar al menos una respuesta válida");
    if (!selectedGroup) return alert("Debe seleccionar un grupo válido");
    if (!selectedQuestion) return alert("Debe seleccionar una pregunta válida");
    onSave(
      question,
      validAnswers,
      selectedGroup,
      selectedQuestion
        ? {
            templateInspectionQuestionId:
              selectedQuestion.templateInspectionQuestionId,
            question: selectedQuestion.question,
            typeQuestion: selectedQuestion.typeQuestion,
          }
        : selectedQuestion
    );
    onSave(question, validAnswers, selectedGroup, selectedQuestion);
    onClose();
  };

  return (
    <dialog open className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="mb-3 relative">
          <label className="font-semibold mb-1 block text-lg">
            Select a group
          </label>
          <input
            type="text"
            className="input input-lg bg-[#f6f3f4] w-full text-center  transition-all border-1 text-lg font-normal"
            placeholder="Escribe el nombre del grupo"
            value={groupInput}
            onChange={handleGroupInputChange}
          />
          {groupSuggestions.length > 0 && (
            <ul className="absolute w-full bg-white shadow-md rounded-md mt-1 max-h-60 overflow-y-auto z-50">
              {groupSuggestions.map((g) => (
                <li key={g.groupId}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setSelectedGroup(g);
                      setGroupInput(g.name);
                      setTimeout(() => {
                        setGroupSuggestions([]);
                      }, 100);
                    }}
                  >
                    {g.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3 relative">
          <label className="font-semibold mb-1 block text-lg">Question</label>
          <input
            type="text"
            className="input input-lg bg-[#f6f3f4] w-full text-center  transition-all border-1 text-lg font-normal"
            placeholder="Escribe la pregunta"
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              setSelectedQuestion(null);
            }}
          />
          {filteredQuestions.length > 0 && (
            <ul className="absolute w-full bg-white shadow-md rounded-md mt-1 max-h-60 overflow-y-auto z-50">
              {filteredQuestions.map((item) => (
                <li key={item.templateInspectionQuestionId}>
                  <button
                    type="button"
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => {
                      setQuestion(item.question);
                      setSelectedQuestion(item);
                      setTimeout(() => {
                        setFilteredQuestions([]);
                      }, 100);
                    }}
                  >
                    {item.question}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-3">
          <div className="flex justify-between items-center mb-5">
            <span className="font-semibold">Respuestas</span>
            <button type="button" className="btn" onClick={addAnswer}>
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
              answers.filter((a) => a.label.trim() !== "").length === 0 ||
              !selectedGroup
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
