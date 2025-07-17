import { FC, useEffect, useState } from "react";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { FaRegEdit } from "react-icons/fa";
import ActionButton from "@/shared/components/shared/tableButtons/ActionButton";
import UserModal from "./create/UserModal";
import { usePathname, useRouter } from "next/navigation";

interface IUser {
  userId: number;
  userName: string;
  password: string;
  employeeId: string;
  employeeName: string;
  rol: number;
}

interface Props {
  objFilter: {
    userName: string;
    employeeName: string;
    rol: string;
    employeeId: string;
  };
  refreshFlag: boolean;
}

const UserTable: FC<Props> = ({ objFilter, refreshFlag }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [users, setUsers] = useState<IUser[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [localRefreshFlag, setLocalRefreshFlag] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchUser = objFilter.userName
      ? user.userName.toLowerCase().includes(objFilter.userName.toLowerCase())
      : true;

    const matchEmployee = objFilter.employeeName
      ? user.employeeName
          .toLowerCase()
          .includes(objFilter.employeeName.toLowerCase())
      : true;

    const matchRol = objFilter.rol ? String(user.rol) === objFilter.rol : true;

    return matchUser && matchEmployee && matchRol;
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(
          `/User?pageNumber=${currentPage}&pageSize=10`
        );
        console.log("Usuarios cargados:", res.data.items);

        if (res.data?.items) {
          setUsers(res.data.items);
          setTotalPages(res.data.totalPages);
        }
      } catch (err) {
        console.error("Error cargando usuarios", err);
      }
    };

    fetchUsers();
  }, [refreshFlag, localRefreshFlag, currentPage]); // ✅ IMPORTANTE

  const handleSuccess = () => {
    setShowModal(false);
    setSelectedUser(null);
    setLocalRefreshFlag((prev) => !prev);
  };

  return (
    <div className="overflow-x-auto space-y-4">
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Employee</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.userId} className="cursor-pointer odd:bg-base-200">
              <td>{user.userName}</td>
              <td>{user.employeeName}</td>
              <td>{user.rol}</td>
              <td className="text-right">
                <ActionButton
                  icon={<FaRegEdit className="w-[20px] h-[20px] opacity-70" />}
                  label="Edit"
                  onClick={() => {
                    router.push(`${pathname}/edit/${user.userId}`);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="join flex justify-center py-4">
        <button
          className="join-item btn"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          ««
        </button>
        <button
          className="join-item btn"
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
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
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        <button
          className="join-item btn"
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          »
        </button>
        <button
          className="join-item btn"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          »»
        </button>
      </div>

      {showModal ? (
        <UserModal
          onClose={() => {
            setShowModal(false);
            setSelectedUser(null);
          }}
          onSuccess={handleSuccess}
          editMode={!!selectedUser}
          defaultData={
            selectedUser
              ? {
                  ...selectedUser,
                }
              : undefined
          }
        />
      ) : null}
    </div>
  );
};

export default UserTable;
