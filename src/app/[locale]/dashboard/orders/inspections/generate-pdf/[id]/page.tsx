// app/work-orders/generate-pdf/[id]/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { LiftgateInspection, WorkOrder } from "@/shared/types/order/ITypes";
import { useReactToPrint } from "react-to-print";
import Loading from "@/shared/components/shared/Loading";
import WorkOrderPdf from "@/shared/components/shared/WorkOrderPdf/WorkOrderPdf";
import BackButton from "@/shared/components/shared/BackButton";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { FiEdit, FiPrinter } from "react-icons/fi";
import { AiOutlineFilePdf } from "react-icons/ai";
import { usePathname } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useDownloadPDF } from "@/shared/hooks/useDownloadPDF";
import { sanitizeElementForPDF } from "@/shared/utils/utils";
import html2pdf from "html2pdf.js";
import { CiEdit } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import LiftgateInspectionCheckList from "@/shared/components/shared/WorkOrderPdf/LiftgateInspectionCheckList";

const GeneratePdfPage = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const pathname = usePathname();
  const { downloadPDF } = useDownloadPDF();
  const { id } = useParams();
  const [data, setData] = useState<LiftgateInspection | null>(null);
  const componentRef = useRef(null);

  useEffect(() => {
    axiosInstance
      .get(
        `/TemplateInspection/GetTemplateInspectionById?TemplateInspectionId=${id}`
      )
      .then((res) => setData(res.data));
  }, [id]);

  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  if (!data) return <Loading />;

  return (
    <>
      <div className="header-page flex flex-row items-center justify-between min-h-[70px] bg-base-200 px-6 gap-2">
        <BackButton title={data.name} link={`../`} />
        <div className="flex flex-row gap-2">
          <ActionButton
            className={`${
              isEditable ? `!bg-[#60285a]` : `bg-[#7c3174]`
            } text-white`}
            icon={
              !isEditable ? (
                <FiEdit className="w-[20px] h-[20px] opacity-70" />
              ) : (
                <IoCloseOutline className="w-[20px] h-[20px] opacity-70" />
              )
            }
            label={isEditable ? "Disable edition" : "Enable edition"}
            onClick={() => setIsEditable((prev) => !prev)}
          />
          <ActionButton
            className="!bg-black text-white"
            icon={<FiPrinter className="w-[20px] h-[20px] opacity-70" />}
            label={`Print order `}
            onClick={() => handlePrint()}
          />
          <ActionButton
            className="!bg-red-500 text-white"
            icon={<AiOutlineFilePdf className="w-[20px] h-[20px] opacity-70" />}
            label={`Download PDF `}
            onClick={() =>
              window.open(`/api/pdf/${id}?type=liftgate`, "_blank")
            }
          />
        </div>
      </div>
      <div className="body-app print:overflow-visible overflow-y-auto">
        <div
          ref={contentRef}
          className="container min-h-screen max-w-full mb-5 print "
          id="pdf-content"
        >
          <LiftgateInspectionCheckList data={data} isEditable={isEditable} />
        </div>
      </div>
    </>
  );
};

export default GeneratePdfPage;
