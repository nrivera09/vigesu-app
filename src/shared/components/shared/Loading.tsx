import React, { FC } from "react";

interface LoadingProps {
  height?: string;
}

const Loading: FC<LoadingProps> = ({ height }) => {
  return (
    <div
      className={`flex flex-col w-full items-center justify-center ${
        height ?? "h-[88vh]"
      }`}
    >
      <span className="loading loading-spinner loading-lg"></span>
      <div className="mt-2 font-medium">Cargando datos...</div>
    </div>
  );
};

export default Loading;
