"use client";
import { useEffect, useState } from "react";
import { generateFakeTableData } from "@/shared/data/fakeTableData";
import { FiTrash2, FiPrinter } from "react-icons/fi";
import { FaRegEdit, FaRegFilePdf } from "react-icons/fa";
import { TableListProps } from "@/shared/types/inspection-configuration/ITypes";
import { VscOpenPreview } from "react-icons/vsc";
import { useRouter, usePathname } from "next/navigation";

const TableList = ({ objFilter }: TableListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [allData, setAllData] = useState(() => generateFakeTableData(100));

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredData = allData.filter((item) => {
    const matchClient = objFilter.client
      ? item.client.toLowerCase().includes(objFilter.client.toLowerCase())
      : true;
    const matchName = objFilter.name
      ? item.name.toLowerCase().includes(objFilter.name.toLowerCase())
      : true;
    const matchStatus = objFilter.status
      ? item.status.toLowerCase() === objFilter.status.toLowerCase()
      : true;
    return matchClient && matchName && matchStatus;
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
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className="w-[70%]">Technical report form</th>
            <th className="w-[30%]"></th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item) => (
            <tr key={item.id} className="cursor-pointer odd:bg-base-200">
              <td className="truncate">{item.client}</td>
              <td className="flex items-center justify-end gap-2">
                <button
                  className="btn min-w-[30px] min-h-[30px] p-2 rounded-md"
                  onClick={() => router.push(`${pathname}/${item.client}`)}
                >
                  <VscOpenPreview className="w-[20px] h-[20px] opacity-70" />
                  <span className="hidden xl:block text-[12px] font-normal">
                    Preview
                  </span>
                </button>
                <button className="btn min-w-[30px] min-h-[30px] p-2 rounded-md">
                  <FiTrash2 className="w-[20px] h-[20px] opacity-70" />
                  <span className="hidden xl:block text-[12px] font-normal">
                    Delete
                  </span>
                </button>
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
