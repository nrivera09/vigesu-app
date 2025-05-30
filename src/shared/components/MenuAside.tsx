"use client";

import {
  SlBookOpen,
  SlDirections,
  SlLayers,
  SlLogin,
  SlNote,
  SlOptions,
  SlPeople,
  SlSettings,
  SlUser,
} from "react-icons/sl";
import { TbPointFilled } from "react-icons/tb";
import SidebarSection from "./SidebarSection";
import Link from "next/link";

const MenuAside = () => {
  return (
    <aside className="bg-[#191917] min-w-[300px] flex flex-row">
      <div className="flex-1 h-full flex flex-col">
        <div
          className="title w-full h-[60px] flex items-center justify-between px-4 gap-3"
          style={{ borderBottom: "1px solid #ffffff17" }}
        >
          <div className="flex flex-row items-center  gap-2">
            <div className="avatar avatar-online">
              <div className="w-10 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
              </div>
            </div>
            <div className="flex flex-col justify-center gap-[.5px]">
              <h1 className="text-white text-sm font-light">
                Neill Bryan Rivera Livia
              </h1>
              <span className="text-gray-500 text-xs">
                bryan.riv09@live.com
              </span>
            </div>
          </div>
          <div>
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-square btn-neutral bg-[#ffffff1f] shadow-none border-none"
              >
                <SlOptions className="text-lg" />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-zinc-800 rounded-box z-1 w-52  shadow-sm"
                style={{ border: "1px solid #ffffff17" }}
              >
                <li>
                  <Link
                    href={`#`}
                    className="text-white min-h-[40px] flex items-center justify-start  hover:text-white  hover:pl-5 transition-all"
                  >
                    Opcion 1
                  </Link>
                </li>
                <li>
                  <Link
                    href={`#`}
                    className="text-white min-h-[40px] flex items-center justify-start  hover:text-white  hover:pl-5 transition-all"
                  >
                    Opcion 1
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col  overflow-y-auto ">
          <div className="dashboard-info p-5 flex flex-col gap-2 min-h-[78px]">
            <div className="flex items-center justify-start gap-2">
              <p className="text-white font-medium tracking-[1px] text-xl">
                Dashboard
              </p>
              <p className="bg-red-400 text-white text-xs px-2 w-[23px] h-[14px] flex items-center justify-center rounded-full shadow-2xl">
                <span className="relative top-[1px]">12</span>
              </p>
            </div>
            <div className="flex flex-row gap-2 text-white text-sm font-light tracking-[.5px] items-center justify-start">
              <div>
                12,231 <span className="text-emerald-500 ">Inspections</span>
              </div>
              <TbPointFilled className="text-xs text-shadow-emerald-800" />

              <div>
                12,214 <span className="text-emerald-500">Orders</span>
              </div>
            </div>
          </div>
          <nav className="p-5 flex flex-1 flex-col ">
            <SidebarSection
              title="Orders"
              links={[
                {
                  label: "Work orders",
                  href: "/dashboard/work-orders",
                  icon: <SlBookOpen />,
                },
                {
                  label: "Inspections",
                  href: "#",
                  icon: <SlNote />,
                },
                {
                  label: "Orders theme",
                  href: "#",
                  icon: <SlDirections />,
                },
              ]}
            />
            <SidebarSection
              title="Inspections"
              links={[
                {
                  label: "Inspection configuration",
                  href: "/dashboard/inspection-configuration",
                  icon: <SlSettings />,
                },
                {
                  label: "Clients",
                  href: "#",
                  icon: <SlPeople />,
                },
                {
                  label: "Services",
                  href: "#",
                  icon: <SlPeople />,
                },
                {
                  label: "Groups",
                  href: "#",
                  icon: <SlLayers />,
                },
                {
                  label: "Users",
                  href: "#",
                  icon: <SlUser />,
                },
              ]}
            />
            <SidebarSection
              title="Configuration"
              links={[
                {
                  label: "Configuration",
                  href: "#",
                  icon: <SlSettings />,
                },
              ]}
            />
          </nav>
        </div>
        <div
          className="sign-out min-h-[50px] px-4 flex items-row items-center justify-between"
          style={{ borderTop: "1px solid #ffffff17" }}
        >
          <div className="flex items-center justify-center">
            <button className="btn btn-square btn-neutral bg-transparent shadow-none border-none">
              <SlLogin className="text-lg" />
            </button>
            <span className="text-white ">Sign Out</span>
          </div>
          <div>
            <span className="text-sm text-gray-400">Version 0.0.1</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MenuAside;
