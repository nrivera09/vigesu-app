"use client";
import { stripLocalePage } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";
import { GoChecklist } from "react-icons/go";
import { MdOutlineWorkOutline } from "react-icons/md";
import { RiToolsLine } from "react-icons/ri";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div
      className={`${stripLocalePage(pathname)} app h-dvh w-full flex flex-row `}
    >
      <aside
        className=" min-w-[300px] h-full fixed bg-[#2a3042] hidden sm:hidden md:hidden lg:block xl:block"
        style={{ boxShadow: "0 .75rem 1.5rem #12263f08" }}
      >
        x
      </aside>
      <main className="flex-1  flex h-full flex-col pl-0 sm:pl-0 md:pl-0 lg:pl-[300px]">
        <header
          style={{ boxShadow: "0 .75rem 1.5rem #12263f08" }}
          className="  flex flex-row items-center justify-center bg-white w-full sticky top-0 left-0 w-full px-[18px]"
        >
          <div className="flex min-h-[70px] flex-row items-center justify-between w-full">
            <div>Lorem.</div>
            <div>Assumenda.</div>
          </div>
        </header>
        <div className="app bg-[#f8f8fb] p-[18px]">
          <div className="breadcrumb flex flex-col sm:flex-row md:flex-row  items-start sm:items-center md:items-center justify-start sm:justify-between md:justify-between min-h-[36px] mb-[18px]">
            <h1 className="font-bold ">DASHBOARD</h1>
            <div className="breadcrumbs text-sm !p-0">
              <ul className="text-gray-400">
                <li>
                  <a>Home</a>
                </li>
                <li>
                  <a>Documents</a>
                </li>
                <li>Add Document</li>
              </ul>
            </div>
          </div>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet eum
          dolores ullam perferendis id dicta! Ad qui, ipsum neque quas, vitae
          nostrum ea non possimus, modi in consequatur tempore explicabo. div.
          <div className="h-[1000px]"></div>
        </div>
      </main>
    </div>
  );
}
