"use client";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import LanguageSwitcher from "@/features/locale/LanguageSwitcher";
import Breadcrumb from "@/shared/components/shared/Breadcrumb";
import MenuAside from "@/shared/components/shared/MenuAside";
import { stripLocalePage } from "@/shared/lib/utils";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import { usePathname, useRouter } from "next/navigation";
import { BiSupport } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useEffect } from "react";
import { useSessionValidator } from "@/shared/hooks/useSessionValidator";
import Loading from "@/shared/components/shared/Loading";
import { useLoadingStore } from "@/shared/stores/useLoadinStore";
import clsx from "clsx";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useSessionValidator();

  const { isLoading, loadingLabel } = useLoadingStore();
  const router = useRouter();
  const token = useAuthStore((state) => state.token);

  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);
  const openSidebar = useSidebarStore((s) => s.openSidebar);
  const closeSidebar = useSidebarStore((s) => s.closeSidebar);
  const pathname = usePathname();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = (matches: boolean) => {
      if (matches)
        openSidebar(); // Desktop: abierto por defecto
      else closeSidebar(); // Mobile: cerrado por defecto
    };
    apply(mq.matches);
    const listener = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, [openSidebar, closeSidebar]);

  /*useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token]);*/

  return (
    <div
      className={`${stripLocalePage(
        pathname
      )} app h-dvh w-full flex flex-row bg-[#191917] `}
    >
      <MenuAside
        className={`
    bg-[#191917] overflow-hidden
    fixed inset-y-0 left-0 w-[70%] transform transition-transform duration-300 ease-in-out
    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
    lg:static lg:inset-auto lg:transform-none
    lg:transition-[width] lg:duration-300 lg:ease-in-out
    ${isSidebarOpen ? "lg:w-[350px]" : "lg:w-0"}
    z-50
  `}
      />

      <main className=" flex-1 rounded-2xl p-2 h-full overflow-hidden relative">
        <div className="bg-white rounded-xl  h-full shadow-xl overflow-hidden">
          <div
            className="app-header flex flex-row items-center justify-between px-6 min-h-[53px] gap-4"
            style={{ borderBottom: "1px solid rgb(0 0 0 / 11%)" }}
          >
            <Breadcrumb />
            <div className="flex flex-row gap-2">
              <LanguageSwitcher design="header-dashboard" />
              <button className="!hidden btn bg-[#60285a] rounded-full pr-3 py-6 sm:flex items-center justify-center border-none">
                <FaRegBell className="text-xl text-white" />
                <span className="bg-[#7c3174] py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px]  ">
                  Messages
                </span>
                <div className="bubble bg-red-600 text-white rounded-full px-2 hidden sm:block">
                  12
                </div>
              </button>
              <button className="btn bg-[#60285a] rounded-full pr-3 py-6 sm:flex items-center justify-center border-none">
                <BiSupport className="text-xl text-white" />
                <span className="bg-[#7c3174] py-1 px-4 text-white font-normal rounded-full hidden md:block text-[13px]  ">
                  Support
                </span>
              </button>
              <button
                data-toggle={isSidebarOpen}
                className={clsx(
                  `btn bg-black rounded-lg w-[38px] h-[38px] flex `,
                  !isSidebarOpen ? `` : `lg:hidden`
                )}
                onClick={toggleSidebar}
              >
                <IoMenu className="min-w-[20px] min-h-[20px] text-white" />
              </button>
            </div>
          </div>
          <div className="app flex flex-col overflow-y-auto h-[93%] relative">
            <div className="content h-dvh">
              <div className="app-main pb-[30px]">{children}</div>
            </div>
          </div>
        </div>
        {isLoading && (
          <Loading
            className="bg-black/30 absolute left-0 top-0 w-full h-full !text-white"
            label={loadingLabel}
          />
        )}
      </main>
    </div>
  );
}
