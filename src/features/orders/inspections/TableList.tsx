"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import Loading from "@/shared/components/shared/Loading";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { getInspections } from "./api/inspectionApi";
import { IInspectionItem } from "./models/inspection.types";

const TableList = ({ objFilter }: { objFilter: { name: string } }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [allData, setAllData] = useState<IInspectionItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

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

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const deleteTypeInspection = async (typeInspectionId: number) => {
    return "";
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
            <th className="w-[25%]">Inspection #</th>
            <th className="w-[25%]">Cliente</th>
            <th className="w-[25%]">Empleado</th>
            <th className="w-[20%]">Fecha</th>
            <th className="w-[15%]">Estado</th>
            <th className="w-[15%]"></th>
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
              >
                <td className="truncate">{item.inspectionNumber}</td>
                <td className="truncate">{item.customerName}</td>
                <td className="truncate">{item.employeeName}</td>
                <td className="truncate">
                  {new Date(item.dateOfInspection).toLocaleDateString()}
                </td>
                <td>
                  {item.status === 0 && (
                    <div className="badge badge-success">Activo</div>
                  )}
                  {item.status === 1 && (
                    <div className="badge badge-error">Inactivo</div>
                  )}
                  {item.status == null && (
                    <div className="badge badge-neutral">Sin estado</div>
                  )}
                </td>
                <td className="flex justify-end">
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
