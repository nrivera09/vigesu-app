import { useEffect, useState } from "react";
import { generateFakeTableData } from "@/shared/data/fakeTableData";
import { FiTrash2, FiPrinter } from "react-icons/fi";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { TableListProps } from "@/shared/types/order/ITypes";

const TableList = ({ objFilter }: TableListProps) => {
  const [allData, setAllData] = useState(() => generateFakeTableData(100));

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = allData.filter((item) => {
    const matchClient = objFilter.client
      ? item.client.toLowerCase().includes(objFilter.client.toLowerCase())
      : true;
    const matchWorkorder = objFilter.workorder
      ? item.workorder.toString().includes(objFilter.workorder.toString())
      : true;
    const matchStatus = objFilter.status
      ? item.status.toLowerCase() === objFilter.status.toLowerCase()
      : true;
    return matchClient && matchWorkorder && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIdx = (currentPage - 1) * rowsPerPage;
  const currentRows = filteredData.slice(startIdx, startIdx + rowsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
          {currentRows.map((item) => (
            <tr key={item.id} className="cursor-pointer odd:bg-base-200">
              <td>
                <input
                  type="checkbox"
                  defaultChecked={item.selected}
                  className="checkbox"
                />
              </td>
              <td className="truncate">{item.client}</td>
              <td className="truncate">{item.name}</td>
              <td>
                <div
                  className={`badge badge-dash ${
                    item.status === "success"
                      ? "badge-success"
                      : item.status === "warning"
                      ? "badge-warning"
                      : item.status === "error"
                      ? "badge-error "
                      : "badge-neutral"
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </div>
              </td>
              <td className=" flex items-center justify-center ">
                <input
                  type="checkbox"
                  defaultChecked={item.selected}
                  className="checkbox"
                />
              </td>
              <td className=" text-end ">
                <div className="flex w-full flex-row gap-2 items-center justify-end">
                  <button className="btn min-w-[30px] min-h-[30px] p-2 rounded-md">
                    <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                    <span className="hidden xl:block text-[12px] font-normal">
                      Delete
                    </span>
                  </button>
                  <button className="btn min-w-[30px] min-h-[30px] p-2 rounded-md">
                    <FaRegEdit className="w-[20px] h-[20px] opacity-70" />
                    <span className="hidden xl:block text-[12px] font-normal">
                      Edit
                    </span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Paginación */}
      {/* Paginación con inicio y fin */}
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
