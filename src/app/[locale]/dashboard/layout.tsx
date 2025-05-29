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
        <div className="bg-white rounded-xl  h-full shadow-2xl">
          <div className="min-h-[53px] px-4 flex flex-row items-center justify-between !hidden">
            <h1 className="font-bold text-xl">Welcome</h1>
          </div>
          <div className="app p-4">{children}</div>
        </div>
      </main>
    </div>
  );
}
