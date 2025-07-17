// components/SignaturePad.tsx
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export interface SignaturePadRef {
  getImageBlob: () => Blob | null;
  clear: () => void;
}

const SignaturePad = forwardRef<SignaturePadRef>((_props, ref) => {
  const sigCanvas = useRef<SignatureCanvas>(null);

  useImperativeHandle(ref, () => ({
    getImageBlob: () => {
      if (!sigCanvas.current || sigCanvas.current.isEmpty()) return null;
      const base64 = sigCanvas.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      const byteString = atob(base64.split(",")[1]);
      const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    },
    clear: () => {
      sigCanvas.current?.clear();
    },
  }));

  return (
    <div>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{
          width: 1000,
          height: 200,
          className: "bg-[#f6f3f4] rounded w-full",
        }}
      />
    </div>
  );
});

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
