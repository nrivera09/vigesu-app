// ✅ Tabla dinámica para Inspections Configuration con API real
"use client";

import { useEffect, useState } from "react";
import { TableListProps } from "@/shared/types/inspection/ITypes";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { FaRegEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { getTypeInspections } from "@/features/inspections/inspection-configuration/api/typeInspectionApi";
import { ITypeInspectionItem } from "./models/typeInspection";
import { toast } from "sonner";
import { getWorkOrderStatusLabel } from "@/shared/utils/utils";

const TableList = ({ objFilter }: TableListProps) => {
  const [allData, setAllData] = useState<ITypeInspectionItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchData2 = async () => {
    setLoading(true);
    try {
      const { items, totalCount } = await getTypeInspections({
        Name: objFilter.name,
        PageNumber: currentPage,
        PageSize: rowsPerPage,
      });

      // 🔁 Mapeamos del tipo de la API al tipo de frontend (ITypeInspectionItem)
      const mappedItems: ITypeInspectionItem[] = items.map((item) => ({
        typeInspectionId: item.typeInspectionID,
        templateInspectionId: item.templateInspectionID,
        customerId: item.customerID,
        name: item.name,
        description: item.description,
        status: item.status,
      }));

      setAllData(mappedItems);
      setTotalCount(totalCount);
    } catch (error) {
      toast.error("Error al cargar configuraciones de inspección");
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { items, totalCount } = await getTypeInspections({
        Name: objFilter.name, // ✅ Solo esto es válido según Swagger
        PageNumber: currentPage,
        PageSize: rowsPerPage,
      });

      // Mapear y mostrar (sin filtros frontend)
      const mappedItems: ITypeInspectionItem[] = items.map((item) => ({
        typeInspectionId: item.typeInspectionID,
        templateInspectionId: item.templateInspectionID,
        customerId: item.customerID,
        name: item.name,
        description: item.description,
        status: item.status,
      }));

      setAllData(mappedItems);
      setTotalCount(totalCount);
    } catch (error) {
      toast.error("Error al cargar configuraciones de inspección");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / rowsPerPage);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
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
            <th className="w-[10%]">Sel</th>
            <th className="w-[25%]">Name</th>
            <th className="w-[30%]">Description</th>
            <th className="w-[15%]">Status</th>
            <th className="w-[20%]"></th>
          </tr>
        </thead>
        <tbody>
          {allData.map((item) => (
            <tr
              key={item.typeInspectionId}
              className="cursor-pointer odd:bg-base-200"
            >
              <th>
                <input type="checkbox" className="checkbox" />
              </th>
              <td className="truncate">{item.name}</td>
              <td className="truncate">{item.description}</td>
              <td>
                <div className="!hidden badge badge-neutral !h-auto">
                  {getWorkOrderStatusLabel(item.status)}
                </div>
                {item.status === 0 && (
                  <div className="badge badge-dash badge-info">
                    {getWorkOrderStatusLabel(item.status)}
                  </div>
                )}
                {item.status === 1 && (
                  <div className="badge badge-dash badge-error">
                    {getWorkOrderStatusLabel(item.status)}
                  </div>
                )}
                {item.status === 2 && (
                  <div className="badge badge-dash badge-success">
                    {getWorkOrderStatusLabel(item.status)}
                  </div>
                )}
              </td>
              <td className="flex items-center gap-2 justify-end">
                <ActionButton
                  icon={<FaRegEdit className="w-[20px] h-[20px] opacity-70" />}
                  label="Edit"
                  onClick={() => console.log("Editar", item.typeInspectionId)}
                />
                <ActionButton
                  icon={<FiTrash2 className="w-[20px] h-[20px] opacity-70" />}
                  label="Delete"
                  onClick={() => console.log("Eliminar", item.typeInspectionId)}
                />
              </td>
            </tr>
          ))}
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
