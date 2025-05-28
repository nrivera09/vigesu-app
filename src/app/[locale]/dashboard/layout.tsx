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
      className={`${stripLocalePage(pathname)} app h-dvh w-full flex flex-row`}
    >
      <aside className="min-w-[300px] h-full bg-[#0b0809]  shadow-3xl fixed top-0 ">
        d
      </aside>
      <div className="app flex flex-col ml-[300px]">
        <header className=" bg-white shadow-3xl sticky top-0 ">
          <div className="px-[30px] flex flex-row items-center justify-between  min-h-[70px]">
            <div>x</div>
            <div>xx</div>
          </div>
        </header>
        <main className="flex-1 bg-[#f8f9fa] ">
          <div className="p-[30px]">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam
            quos architecto molestias dolorem eos eum nulla qui soluta quam
            delectus earum, et unde ratione modi ipsam voluptatum ea similique
            harum!
            <div className="h-dvh"></div>
          </div>
        </main>
      </div>
    </div>
  );
}
