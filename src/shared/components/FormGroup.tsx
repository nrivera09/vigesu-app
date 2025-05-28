import React, { FC } from "react";

interface FormGroupProps {
  children: React.ReactNode;
}

const formGroup: FC<FormGroupProps> = ({ children }) => {
  return (
    <div className="form-group w-full flex flex-col gap-1 ">{children}</div>
  );
};

export default formGroup;
