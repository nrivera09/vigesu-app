"use client";
import MenuAside from "@/shared/components/MenuAside";
import { stripLocalePage } from "@/shared/lib/utils";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div
      className={`${stripLocalePage(
        pathname
      )} app h-dvh w-full flex flex-row bg-[#191917] `}
    >
      <MenuAside />
      <main className=" flex-1 rounded-2xl p-2 h-full">
        <div className="bg-white rounded-xl  h-full shadow-2xl overflow-hidden">
          <div className="app flex flex-col">
            <div className="flex flex-col shadow-xl">
              <div
                className="header-info min-h-[54px] px-5 flex items-center justify-between"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <div>
                  <h1 className="text-xl font-bold">Dashboard</h1>
                </div>
                <div>s</div>
              </div>
              <div
                className="breadcrumbs text-md px-5 shadow-3xl"
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <ul>
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
            <div className="content h-dvh">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
