import React, { FC, ReactNode } from "react";

interface BoxContentProps {
  children: ReactNode;
}

const BoxContent: FC<BoxContentProps> = ({ children }) => {
  return (
    <div
      style={{ boxShadow: "0 .75rem 1.5rem #12263f08" }}
      className="bg-[white] p-4 rounded-md max-h-auto"
    >
      {children}
    </div>
  );
};

export default BoxContent;
