// components/AnswerText.tsx
import React from "react";

interface Props {
  value: string;
  onChange: (text: string) => void;
}

const AnswerText = ({ value, onChange }: Props) => {
  return (
    <div className="mt-6">
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="Escribe tu respuesta..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default AnswerText;
