"use client";

import { useEffect, useState } from "react";
import { getWorkOrders } from "./api/workOrdersApi";
import { WorkOrder, WorkOrderStatus } from "./models/workOrder.types";
import { FiTrash2, FiPrinter } from "react-icons/fi";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { TableListProps } from "@/shared/types/order/ITypes";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { FaRegEye } from "react-icons/fa";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { IoSync } from "react-icons/io5";
import { IoMdCheckmark, IoMdSync } from "react-icons/io";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Loading from "@/shared/components/shared/Loading";
import html2canvas from "html2canvas";

const TableList = ({ objFilter, refreshSignal }: TableListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [syncStatus, setSyncStatus] = useState<{
    [key: number]: "idle" | "loading" | "success";
  }>({});

  const [allData, setAllData] = useState<WorkOrder[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleSyncWorkOrder = async (
    workOrderId: number,
    syncOnlyEstimate = false
  ) => {
    setSyncStatus((prev) => ({ ...prev, [workOrderId]: "loading" }));
    try {
      const response = await axiosInstance.put(
        "/QuickBooks/CreateEstimateFromWorkOrder",
        {
          workOrderId,
          realmId: "9341454759827689",
        }
      );

      const quickBookEstimatedId = response.data;

      if (!syncOnlyEstimate) {
        await sendPdfToQuickBooks(quickBookEstimatedId, workOrderId);
      }

      setSyncStatus((prev) => ({ ...prev, [workOrderId]: "success" }));

      setTimeout(async () => {
        setSyncStatus((prev) => {
          const updated = { ...prev };
          delete updated[workOrderId];
          return updated;
        });

        await fetchData(currentPage);

        toast.success("¡Sincronización exitosa!");
      }, 1000);
    } catch (error) {
      toast.error("Error al sincronizar.");
      setSyncStatus((prev) => ({ ...prev, [workOrderId]: "idle" }));
    }
  };

  const sendPdfToQuickBooks = async (
    quickBookEstimatedId: number,
    workOrderId: number
  ) => {
    try {
      const response = await fetch(`/api/pdf/${workOrderId}`);

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

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const filterToSend = {
        ...objFilter,
        workorder: objFilter.workorder
          ? Number(objFilter.workorder)
          : undefined,
      };

      const response = await getWorkOrders(objFilter, page, rowsPerPage);

      setAllData(response.items);
      setTotalRecords(response.totalCount ?? 0);
    } catch (error) {
      toast.error(`${error}`);
      //console.error("Error fetching work orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateWorkOrderState = async (
    workOrderId: number,
    statusWorkOrder: number = WorkOrderStatus.Disabled
  ) => {
    const payload = {
      workOrderId,
      statusWorkOrder,
    };

    const response = await axiosInstance.put(
      `/WorkOrder/UpdateWorkOrderState/${workOrderId}`,
      payload
    );

    fetchData();
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [objFilter, refreshSignal, currentPage, rowsPerPage]);

  useEffect(() => {
    if (refreshSignal) {
      fetchData();
    }
  }, [refreshSignal]);

  const filteredData = allData.filter((item) => {
    const matchClient = objFilter.client
      ? item.customerName.toLowerCase().includes(objFilter.client.toLowerCase())
      : true;

    const matchWorker = objFilter.worker
      ? item.employeeName.toLowerCase().includes(objFilter.worker.toLowerCase())
      : true;

    const matchWorkorder = objFilter.workorder
      ? item.workOrderNumber.toString().includes(objFilter.workorder.toString())
      : true;

    const matchStatus = objFilter.status
      ? item.statusWorkOrder.toString() === objFilter.status
      : true;

    const matchDate = objFilter.creationdate
      ? item.created.substring(0, 10) ===
        objFilter.creationdate.toISOString().substring(0, 10)
      : true;

    return (
      matchClient && matchWorker && matchWorkorder && matchStatus && matchDate
    );
  });

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const getWorkOrderStatusLabel = (status: WorkOrderStatus): string => {
    switch (status) {
      case WorkOrderStatus.Create:
        return "Create";
      case WorkOrderStatus.Disabled:
        return "Disabled";
      case WorkOrderStatus.SyncQuickbook:
        return "Sync Quickbook";
      default:
        return "Unknown";
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [objFilter, rowsPerPage]);

  return (
    <div className="overflow-x-auto space-y-4">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="w-[8%]">Sel</th>
            <th className="w-[18%]">Client</th>
            <th className="w-[18%]">Worker</th>
            <th className="w-[18%]">Status</th>
            <th className="w-[18%] text-center">Sync Quickbook</th>
            <th className="w-[20%]"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center py-10">
                <Loading />
              </td>
            </tr>
          ) : (
            allData.map((item) => (
              <tr
                key={item.workOrderId}
                className="cursor-pointer odd:bg-base-200"
              >
                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
                <td
                  className="truncate"
                  onClick={() =>
                    router.push(`${pathname}/edit/${item.workOrderId}`)
                  }
                >
                  {item.customerName}
                </td>
                <td
                  className="truncate"
                  onClick={() =>
                    router.push(`${pathname}/edit/${item.workOrderId}`)
                  }
                >
                  {item.employeeName}
                </td>
                <td>
                  <div className="!hidden badge badge-neutral !h-auto">
                    {getWorkOrderStatusLabel(item.statusWorkOrder)}
                  </div>
                  {item.statusWorkOrder === 0 && (
                    <div className="badge badge-dash badge-info">
                      {getWorkOrderStatusLabel(item.statusWorkOrder)}
                    </div>
                  )}
                  {item.statusWorkOrder === 1 && (
                    <div className="badge badge-dash badge-error">
                      {getWorkOrderStatusLabel(item.statusWorkOrder)}
                    </div>
                  )}
                  {item.statusWorkOrder === 2 && (
                    <div className="badge badge-dash badge-success">
                      {getWorkOrderStatusLabel(item.statusWorkOrder)}
                    </div>
                  )}
                </td>
                <td className="">
                  {item.statusWorkOrder !== 2 && (
                    <div className="flex items-center justify-center">
                      {syncStatus[item.workOrderId] === "loading" ? (
                        <IoMdSync className="loading text-gray-500 text-3xl" />
                      ) : syncStatus[item.workOrderId] === "success" ? (
                        <IoMdCheckmark className="text-green-500 text-xl" />
                      ) : (
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={() => handleSyncWorkOrder(item.workOrderId)}
                        />
                      )}
                    </div>
                  )}
                </td>
                <td className="text-end">
                  <div className="flex w-full flex-row gap-2 items-center justify-end">
                    {item.statusWorkOrder === 0 ? (
                      <ActionButton
                        icon={
                          <FaRegEdit className="w-[20px] h-[20px] opacity-70" />
                        }
                        label="Edit"
                        onClick={() =>
                          router.push(`${pathname}/edit/${item.workOrderId}`)
                        }
                      />
                    ) : (
                      <ActionButton
                        icon={
                          <FaRegEye className="w-[20px] h-[20px] opacity-70" />
                        }
                        label="Watch"
                        onClick={() =>
                          router.push(`${pathname}/edit/${item.workOrderId}`)
                        }
                      />
                    )}
                    <ActionButton
                      icon={
                        <FiPrinter className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Print"
                      onClick={() =>
                        router.push(
                          `${pathname}/generate-pdf/${item.workOrderId}`
                        )
                      }
                    />

                    {item.statusWorkOrder !== 1 && (
                      <ActionButton
                        icon={
                          <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                        }
                        label="Delete"
                        onClick={() => updateWorkOrderState(item.workOrderId)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

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
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`join-item btn ${
              currentPage === idx + 1 ? "btn-active" : ""
            }`}
            onClick={() => changePage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
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
