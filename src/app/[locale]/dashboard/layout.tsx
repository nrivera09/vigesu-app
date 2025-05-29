"use client";
import Breadcrumb from "@/shared/components/Breadcrumb";
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
      className={`${stripLocalePage(pathname)} app h-dvh w-full flex flex-row `}
    >
      <MenuAside />
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
        <div className="app bg-[#f8f8fb] p-[18px] min-h-full">
          <Breadcrumb />
          {children}
        </div>
      </main>
    </div>
  );
}
