"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import Loading from "@/shared/components/shared/Loading";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FiPrinter, FiTrash2 } from "react-icons/fi";
import { getInspections } from "./api/inspectionApi";
import { IInspectionItem } from "./models/inspection.types";
import { formatDate, toISOStringWithTimeSmart } from "@/shared/utils/utils";
import { GiAutoRepair } from "react-icons/gi";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import {
  TypeInspectionOrders,
  TypeInspectionOrdersLabel,
} from "../models/workOrder.types";
import clsx from "clsx";
import { IoMdCheckmark, IoMdSync } from "react-icons/io";

const TableList = ({ objFilter }: { objFilter: { name: string } }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [allData, setAllData] = useState<IInspectionItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const [syncStatus, setSyncStatus] = useState<{
    [key: number]: "idle" | "loading" | "success";
  }>({});

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { items, totalCount } = await getInspections({
        PageNumber: currentPage,
        PageSize: rowsPerPage,
        Name: objFilter.name,
      });

      setAllData(items);
      setTotalCount(totalCount);
    } catch (error) {
      toast.error("Error al cargar inspecciones");
    } finally {
      setLoading(false);
    }
  };

  const getBadgeClass = (
    status: TypeInspectionOrders | null | undefined
  ): string => {
    switch (status) {
      case TypeInspectionOrders.Create:
      case TypeInspectionOrders.SyncQuickbook:
        return "badge badge-dash  badge-success";
      case TypeInspectionOrders.PreAccepted:
      case TypeInspectionOrders.Accepted:
        return "badge badge-dash badge-warning";
      case TypeInspectionOrders.Disabled:
        return "badge badge-dash badge-error";
      default:
        return "badge badge-dash badge-neutral";
    }
  };

  const sendPdfToQuickBooks = async (
    quickBookEstimatedId: number,
    inspectionId: number
  ) => {
    try {
      const response = await fetch(`/api/pdf/${inspectionId}?type=liftgate`);

      if (!response.ok) {
        throw new Error("Error al generar el PDF desde el servidor");
      }

      const pdfBlob = await response.blob();
      const file = new File([pdfBlob], `Estimate-${quickBookEstimatedId}.pdf`, {
        type: "application/pdf",
      });

      const formData = new FormData();
      formData.append("QuickBookEstimatedId", String(quickBookEstimatedId));
      formData.append("FilePdf", file);
      formData.append("RealmId", "9341454759827689");

      await axiosInstance.post(
        "/QuickBooks/estimates/attachmentPDF",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("PDF enviado correctamente a QuickBooks");
    } catch (err) {
      console.error("Error al enviar el PDF:", err);
      toast.error("Error al enviar el PDF a QuickBooks");
    }
  };

  const handleSyncWorkOrder = async (
    inspectionId: number,
    syncOnlyEstimate = false
  ) => {
    setSyncStatus((prev) => ({ ...prev, [inspectionId]: "loading" }));
    try {
      const response = await axiosInstance.put(
        "/QuickBooks/CreateEstimateFromInspection",
        {
          inspectionId,
          realmId: "9341454759827689",
        }
      );

      const quickBookEstimatedId = response.data;

      if (!syncOnlyEstimate) {
        await sendPdfToQuickBooks(quickBookEstimatedId, inspectionId);
      }

      setSyncStatus((prev) => ({ ...prev, [inspectionId]: "success" }));

      setTimeout(async () => {
        setSyncStatus((prev) => {
          const updated = { ...prev };
          delete updated[inspectionId];
          return updated;
        });

        await fetchData();

        toast.success("¡Sincronización exitosa!");
      }, 1000);
    } catch (error) {
      toast.error("Error al sincronizar.");
      setSyncStatus((prev) => ({ ...prev, [inspectionId]: "idle" }));
    }
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const deleteTypeInspection = async (inspectionId: number) => {
    try {
      const payload = {
        inspectionId,
        status: TypeInspectionOrders.Disabled,
      };

      await axiosInstance.put(
        `/Inspection/UpdateInspectionState/${inspectionId}`,
        payload
      );

      toast.success("Inspección eliminada correctamente");
      fetchData();
    } catch (error) {
      toast.error("❌ Error al eliminar la inspección");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [objFilter, currentPage, rowsPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [objFilter]);
  console.log("item: ", allData);
  return (
    <div className="overflow-x-auto space-y-4">
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className="w-[5%]">#</th>
            <th className="w-[15%]">Cliente</th>
            <th className="w-[15%]">Empleado</th>
            <th className="w-[15%]">Fecha</th>
            <th className="w-[20%] text-center">Sync Quickbook</th>
            <th className="w-[10%]">Estado</th>
            <th className="w-[20%]"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="py-10 text-center">
                <Loading height="h-[200px]" />
              </td>
            </tr>
          ) : (
            allData.map((item) => (
              <tr
                key={item.inspectionId}
                className="cursor-pointer odd:bg-base-200"
                data-url={`${pathname}/generate-pdf/${item?.templateInspectionId}/${item?.inspectionId}`}
              >
                <td className="truncate">{item.inspectionNumber}</td>
                <td className="truncate">{item.customerName}</td>
                <td className="truncate">{item.employeeName}</td>
                <td className="truncate">
                  {formatDate(item.dateOfInspection)}
                </td>
                <td className="text-center">
                  {item.statusInspection !== 2 ? (
                    <div className="flex items-center justify-center">
                      {syncStatus[item.inspectionId] === "loading" ? (
                        <IoMdSync className="loading text-gray-500 text-3xl" />
                      ) : syncStatus[item.inspectionId] === "success" ? (
                        <IoMdCheckmark className="text-green-500 text-xl" />
                      ) : (
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={() =>
                            handleSyncWorkOrder(item.inspectionId)
                          }
                        />
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <IoMdCheckmark className="text-green-500 text-xl text-center" />
                    </div>
                  )}
                </td>
                <td>
                  <div
                    className={clsx(
                      getBadgeClass(
                        item.statusInspection as TypeInspectionOrders
                      ),
                      `truncate`
                    )}
                  >
                    {item.statusInspection != null
                      ? (TypeInspectionOrdersLabel[
                          item.statusInspection as TypeInspectionOrders
                        ] ?? "Desconocido")
                      : "Sin estado"}
                  </div>
                </td>
                <td className="flex justify-end gap-2">
                  <ActionButton
                    icon={<FaRegEye className="w-[20px] h-[20px] opacity-70" />}
                    label="Watch"
                    onClick={() =>
                      router.push(
                        `${pathname}/generate-pdf/${item?.templateInspectionId}/${item?.inspectionId}`
                      )
                    }
                  />
                  {item.status !== 1 && (
                    <ActionButton
                      icon={
                        <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Delete"
                      onClick={() => deleteTypeInspection(item.inspectionId)}
                    />
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Paginación */}
      <div className="join flex justify-center py-4">
        <button
          className="join-item btn"
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
        >
          ««
        </button>
        <button
          className="join-item btn"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {totalPages > 0 &&
          Array.from({ length: totalPages }, (_, idx) => {
            const page = idx + 1;
            return (
              <button
                key={`page-${page}`}
                className={`join-item btn ${
                  currentPage === page ? "btn-active" : ""
                }`}
                onClick={() => changePage(page)}
              >
                {page}
              </button>
            );
          })}

        <button
          className="join-item btn"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
        <button
          className="join-item btn"
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »»
        </button>
      </div>
    </div>
  );
};

export default TableList;
