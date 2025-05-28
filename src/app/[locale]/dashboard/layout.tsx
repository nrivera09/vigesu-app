import MenuAside from "@/shared/components/MenuAside";
import { IoIosArrowDown } from "react-icons/io";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="app h-dvh w-full flex flex-row">
      <aside className="min-w-[300px] bg-[#202020] shadow-2xl">
        <div className="container flex flex-col h-full">
          <div className="logo flex items-center justify-center min-h-[50px]">
            <p className="uppercase text-[20px] text-[#cdcdcd] font-bold mt-3">
              VIGESU
            </p>
          </div>
          <MenuAside />
        </div>
      </aside>
      <div className="flex-1 bg-[#f8f8f8]">
        <div className="flex items-center justify-end py-2 px-3 bg-white gap-3">
          {/**<ThemeSwitcher /> */}
          <div className="avatar">
            <div className="w-8 rounded-full">
              <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
            </div>
          </div>
          <div className="dropdown dropdown-end hover:shadow-none">
            <div
              tabIndex={0}
              role="button"
              className="btn bg-transparent border-0 font-medium p-0 hover:shadow-none"
            >
              Neill Rivera <IoIosArrowDown />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
