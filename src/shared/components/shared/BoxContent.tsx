import React, { FC, ReactNode } from "react";

interface BoxContentProps {
  children: ReactNode;
}

const BoxContent: FC<BoxContentProps> = ({ children }) => {
  return <div className="bg-[white] p-4 rounded-md max-h-auto">{children}</div>;
};

export default BoxContent;
