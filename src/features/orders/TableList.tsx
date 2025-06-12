import { useEffect, useState } from "react";
import { getWorkOrders } from "./api/workOrdersApi";
import { WorkOrder, WorkOrderStatus } from "./models/workOrder.types";
import { FiTrash2, FiPrinter } from "react-icons/fi";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { TableListProps } from "@/shared/types/order/ITypes";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";

const TableList = ({ objFilter }: TableListProps) => {
  const [allData, setAllData] = useState<WorkOrder[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getWorkOrders();
        setAllData(response.items);
      } catch (error) {
        console.error("Error fetching work orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = allData.filter((item) => {
    const matchClient = objFilter.client
      ? item.customerName.toLowerCase().includes(objFilter.client.toLowerCase())
      : true;
    const matchWorkorder = objFilter.workorder
      ? item.workOrderNumber.toString().includes(objFilter.workorder.toString())
      : true;
    const matchStatus = objFilter.status
      ? item.statusWorkOrder.toString() === objFilter.status
      : true;

    return matchClient && matchWorkorder && matchStatus;
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
                <span className="loading loading-spinner loading-lg"></span>
                <div className="mt-2 font-medium">Cargando datos...</div>
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
                  <div className="badge badge-neutral">
                    {getWorkOrderStatusLabel(item.statusWorkOrder)}
                  </div>
                </td>
                <td className="flex items-center justify-center">
                  <input type="checkbox" className="checkbox" />
                </td>
                <td className="text-end">
                  <div className="flex w-full flex-row gap-2 items-center justify-end">
                    <ActionButton
                      icon={
                        <FaRegEdit className="w-[20px] h-[20px] opacity-70" />
                      }
                      label="Edit"
                      onClick={() => console.log("Edit clicked")}
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
