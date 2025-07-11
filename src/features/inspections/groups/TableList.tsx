import { useEffect, useState } from "react";
import { IGroup, StatusEnum } from "../models/GroupTypes";
import { TableListProps } from "@/shared/types/inspection/ITypes";
import axios from "axios";
import {
  getInspectionStatusGroupsLabel,
  getInspectionStatusLabel,
} from "@/shared/utils/utils";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import { FaRegEdit } from "react-icons/fa";
import GroupModal from "./create/GroupModal";

const TableList = ({
  objFilter,
  refreshFlag,
  setRefreshFlag,
}: TableListProps) => {
  const [allData, setAllData] = useState<IGroup[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<IGroup | null>(null);

  const handleSuccess = () => {
    setSelectedGroup(null); // limpias el grupo seleccionado
    setShowModal(false); // cierras el modal
    setRefreshFlag((prev) => !prev); // refrescas la tabla
  };

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axiosInstance.get("/Group");
        if (response.data?.items) {
          setAllData(response.data.items);
        }
      } catch (error) {
        console.error("Error al cargar grupos", error);
      }
    };

    fetchGroups();
  }, [refreshFlag]);

  const filteredData = allData.filter((item) => {
    const matchClient = objFilter.client
      ? item.name.toLowerCase().includes(objFilter.client.toLowerCase())
      : true;

    const matchStatus =
      objFilter.status !== "" ? item.status === Number(objFilter.status) : true;

    return matchClient && matchStatus;
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

  const getStatusBadge = (status: StatusEnum) => {
    const label = status === StatusEnum.Active ? "Activo" : "Inactivo";
    const color =
      status === StatusEnum.Active ? "badge-success" : "badge-error";

    return <div className={`badge ${color}`}>{label}</div>;
  };

  return (
    <>
      <div className="overflow-x-auto space-y-4">
        <table className="table table-fixed w-full">
          <thead>
            <tr>
              <th className="w-[50%]">Group</th>
              <th className="w-[30%] text-center">Status</th>
              <th className="w-[20%]"></th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((item) => (
              <tr key={item.groupId} className="cursor-pointer odd:bg-base-200">
                <td className="truncate">{item.name}</td>
                <td className="text-center">
                  <div
                    className={`badge badge-dash ${
                      item.status === 0
                        ? "badge-success"
                        : item.status === 1
                        ? "badge-warning"
                        : "badge-neutral"
                    }`}
                  >
                    {getInspectionStatusGroupsLabel(item.status)}
                  </div>
                </td>

                <td className="text-right">
                  <ActionButton
                    icon={
                      <FaRegEdit className="w-[20px] h-[20px] opacity-70" />
                    }
                    label="Edit"
                    onClick={() => {
                      setSelectedGroup(item);
                      setShowModal(true);
                    }}
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
      {showModal && selectedGroup && (
        <GroupModal
          onClose={() => {
            setShowModal(false);
            setSelectedGroup(null);
          }}
          onSuccess={handleSuccess}
          editMode={true}
          defaultValue={selectedGroup.name}
          defaultStatus={selectedGroup.status}
          groupIdToEdit={selectedGroup.groupId}
        />
      )}
    </>
  );
};

export default TableList;
