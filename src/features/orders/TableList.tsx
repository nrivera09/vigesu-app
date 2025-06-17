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

const TableList = ({ objFilter, refreshSignal }: TableListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [syncStatus, setSyncStatus] = useState<{
    [key: number]: "idle" | "loading" | "success";
  }>({});

  const [allData, setAllData] = useState<WorkOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleSyncWorkOrder = async (workOrderId: number) => {
    setSyncStatus((prev) => ({ ...prev, [workOrderId]: "loading" }));

    try {
      await axiosInstance.put("/QuickBooks/CreateEstimateFromWorkOrder", {
        workOrderId,
        realmId: "9341454759827689",
      });

      setSyncStatus((prev) => ({ ...prev, [workOrderId]: "success" }));

      setTimeout(async () => {
        // Limpiamos el estado de animación
        setSyncStatus((prev) => {
          const updated = { ...prev };
          delete updated[workOrderId];
          return updated;
        });
        toast.success("¡Sincronización exitosa!", {
          description: "Se actualizó el estado de la orden.",
        });
        await fetchData();
      }, 1000);
    } catch (error) {
      console.error("Error al sincronizar:", error);
      toast.error("Error al sincronizar.", {
        description: "El servicio no está disponible por el momento.",
      });
      setSyncStatus((prev) => ({ ...prev, [workOrderId]: "idle" }));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getWorkOrders();
      setAllData(response.items);
    } catch (error) {
      console.error("Error fetching work orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIdx, startIdx + rowsPerPage);

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
            currentRows.map((item) => (
              <tr
                key={item.workOrderId}
                className="cursor-pointer odd:bg-base-200"
              >
                <td>
                  <input type="checkbox" className="checkbox" />
                </td>
                <td className="truncate">{item.customerName}</td>
                <td className="truncate">{item.employeeName}</td>
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
                        onClick={() => console.log("Edit clicked")}
                      />
                    )}
                    <ActionButton
                      icon={
                        <FiPrinter className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Print"
                      onClick={() => console.log("Print clicked")}
                    />
                    <ActionButton
                      icon={
                        <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Delete"
                      onClick={() => console.log("Delete clicked")}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="join flex justify-center py-4">
        <button
          className="join-item btn font-normal"
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
        >
          ««
        </button>
        <button
          className="join-item btn font-normal"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          «
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            className={`join-item btn font-normal ${
              currentPage === idx + 1 ? "btn-active" : ""
            }`}
            onClick={() => changePage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="join-item btn font-normal"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          »
        </button>
        <button
          className="join-item btn font-normal"
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
