import React, { useEffect, useState } from "react";

interface PDFViewerProps {
  file: string;
  height?: number;
}

const PDFViewer = ({ file, height }: PDFViewerProps) => {
  const [fileName, setFileName] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      const fileGet = `${window.location.origin}/assets/files/${file}`;
      console.log("fileGet", fileGet);
      setFileName(fileGet);
    }
  }, [file]);
  return (
    <embed
      src={fileName}
      width="100%"
      height={height ?? 600}
      type="application/pdf"
      className="h-dvh"
    />
  );
};

export default PDFViewer;
