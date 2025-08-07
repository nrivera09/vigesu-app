"use client";
import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";

interface ImageUploaderProps {
  onFilesChange?: (files: File[]) => void;
  accept?: { [mime: string]: string[] }; // ej. { "application/pdf": [] }
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onFilesChange,
  accept = { "image/*": [], "application/pdf": [] },
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const renamedFiles: File[] = acceptedFiles.map((file) => {
        const extension = file.name.split(".").pop();
        const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
        const uniqueId = crypto.randomUUID(); // o usa uuidv4()
        const newName = `${timestamp}-${uniqueId}.${extension}`;
        return new File([file], newName, { type: file.type });
      });

      const updated = [...files, ...renamedFiles];
      setFiles(updated);
      onFilesChange?.(updated);
    },
    [files, onFilesChange]
  );

  const removeFile = (indexToRemove: number) => {
    const updated = files.filter((_, i) => i !== indexToRemove);
    setFiles(updated);
    onFilesChange?.(updated);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    onDrop,
    multiple: true,
  });

  return (
    <div className="mb-6">
      <h3 className="font-bold mb-2">Attach Photos or Take Pictures</h3>

      <div
        {...getRootProps()}
        className="border-1 border-dashed border-gray-300 p-4 rounded-md text-center cursor-pointer bg-[#f6f3f4] py-10"
      >
        <input
          {...getInputProps({ capture: "environment" })}
          style={{
            display: "none",
            width: 0,
            height: 0,
            position: "absolute",
            overflow: "hidden",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
        <p>
          {isDragActive
            ? "Drop the files here ..."
            : "Click to upload or take a photo with your camera"}
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="relative border rounded-md overflow-hidden w-[100px] h-[100px] flex-shrink-0"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview-${index}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-xs text-center px-2">
                  {file.name}
                </div>
              )}
              <button
                onClick={() => removeFile(index)}
                type="button"
                className="absolute top-1 right-1 bg-white bg-opacity-70 rounded-full w-5 h-5 text-xs flex items-center justify-center hover:bg-red-500 hover:text-white cursor-pointer"
                title="Remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
