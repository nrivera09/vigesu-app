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

  const sendWorkOrderPdfToQuickBooks = async (
    quickBookEstimateId: string,
    workOrderId: number
  ) => {
    const resp = await fetch(`/api/pdf/${workOrderId}?type=workorder`);
    if (!resp.ok) throw new Error("No se pudo generar el PDF del WorkOrder");

    const pdfBlob = await resp.blob();
    const file = new File([pdfBlob], `WorkOrder-${workOrderId}.pdf`, {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("QuickBookEstimateId", quickBookEstimateId);
    formData.append("FilePdf", file);
    formData.append("RealmId", "9341454759827689");

    await axiosInstance.post(
      "/QuickBooks/estimates/attachmentPDF?RealmId=9341454759827689",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  };

  const sendInspectionPdfToQuickBooks = async (
    quickBookEstimateId: string,
    inspectionId: number
  ) => {
    const resp = await fetch(`/api/pdf/${inspectionId}?type=liftgate`);
    if (!resp.ok) throw new Error("No se pudo generar el PDF de la Inspección");

    const pdfBlob = await resp.blob();
    const file = new File([pdfBlob], `Inspection-${inspectionId}.pdf`, {
      type: "application/pdf",
    });

    const formData = new FormData();
    formData.append("QuickBookEstimateId", quickBookEstimateId);
    formData.append("FilePdf", file);
    formData.append("RealmId", "9341454759827689");

    await axiosInstance.post(
      "/QuickBooks/estimates/attachmentPDF?RealmId=9341454759827689",
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  };

  // Flujo principal actualizado
  const handleSyncWorkOrder = async (
    inspectionId: number,
    syncOnlyEstimate = false
  ) => {
    setSyncStatus((prev) => ({ ...prev, [inspectionId]: "loading" }));
    try {
      // 1) Crear WorkOrder desde la inspección (SIN quickbooks id)
      const { data: workOrderId } = await axiosInstance.post<number>(
        `/Inspection/CreateWorkOrdeFromInspection/${inspectionId}`,
        { inspectionId }
      );
      if (typeof workOrderId !== "number")
        throw new Error("No se obtuvo un workOrderId válido.");

      // 2) Crear Estimate en QuickBooks desde el WorkOrder (DEVUELVE STRING)
      const { data: quickBookEstimateId } = await axiosInstance.put<string>(
        "/QuickBooks/CreateEstimateFromWorkOrder",
        { workOrderId }
      );
      if (!quickBookEstimateId)
        throw new Error(
          "No se obtuvo un quickBookEstimateId válido (WorkOrder)."
        );

      // 3) Adjuntar PDF del WorkOrder (si no es 'solo estimate')
      if (!syncOnlyEstimate) {
        await sendWorkOrderPdfToQuickBooks(quickBookEstimateId, workOrderId);
      }

      // 4) Actualizar la inspección con el QuickBooks Estimate Id (NUEVO PARÁMETRO)
      console.log("Payload CreateEstimateFromInspection =>", {
        inspectionId: Number(inspectionId),
        quickBookEstimateId: String(quickBookEstimateId),
      });

      await axiosInstance.put(
        "/QuickBooks/CreateEstimateFromInspection",
        {
          inspectionId, // number
          quickBookEstimateId: String(quickBookEstimateId), // string
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // 5) Adjuntar PDF de la Inspección (si no es 'solo estimate')
      if (!syncOnlyEstimate) {
        await sendInspectionPdfToQuickBooks(quickBookEstimateId, inspectionId);
      }

      // Éxito visual
      setSyncStatus((prev) => ({ ...prev, [inspectionId]: "success" }));
      setTimeout(async () => {
        setSyncStatus((prev) => {
          const updated = { ...prev };
          delete updated[inspectionId];
          return updated;
        });
        await fetchData();
        toast.success("¡Sincronización exitosa!");
      }, 800);
    } catch (error) {
      console.error("Error al sincronizar:", error);
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
  return (
    <div className="overflow-x-auto space-y-4">
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className="w-[5%] truncate">#</th>
            <th className="w-[15%] truncate">Cliente</th>
            <th className="w-[15%] truncate">Empleado</th>
            <th className="w-[15%] truncate">Fecha</th>
            <th className="w-[20%] text-center truncate">Sync Quickbook</th>
            <th className="w-[10%] truncate">Estado</th>
            <th className="w-[20%] truncate"></th>
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
            allData.map((item) => {
              const status = Number(
                item.statusInspection
              ) as TypeInspectionOrders;

              return (
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

                  {/* Sync Quickbook */}
                  <td className="text-center">
                    {status !== TypeInspectionOrders.SyncQuickbook ? (
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

                  {/* Estado (badge) */}
                  <td>
                    <div className={clsx(getBadgeClass(status), "truncate")}>
                      {TypeInspectionOrdersLabel[status] ?? "Sin estado"}
                    </div>
                  </td>

                  {/* Acciones */}
                  <td className="flex justify-end gap-2">
                    <ActionButton
                      icon={
                        <FaRegEye className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Watch"
                      onClick={() =>
                        router.push(
                          `${pathname}/generate-pdf/${item?.templateInspectionId}/${item?.inspectionId}`
                        )
                      }
                    />

                    {status !== TypeInspectionOrders.Disabled && (
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
              );
            })
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
