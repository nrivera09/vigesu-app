"use client";

import Link from "next/link";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbChecklist } from "react-icons/tb";
import { GrConfigure } from "react-icons/gr";
import { RiUserSearchLine } from "react-icons/ri";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { PiSignOutLight } from "react-icons/pi";
import MenuAsideItem from "./MenuAsideItem";

const Separator = () => <hr style={{ borderTop: `1px solid #ffffff1a` }} />;

const MenuAside = () => {
  return (
    <>
      <div className="menu flex-1 py-3 w-full flex-col gap-4">
        <ul className="menu bg-base-200 rounded-box w-full">
          <MenuAsideItem href="/dashboard/work-orders">
            <HiOutlineDocumentText className="w-[25px] h-[25px]" />
            Ordenes de trabajo
          </MenuAsideItem>

          <MenuAsideItem href="/dashboard/inspection">
            <TbChecklist className="w-[25px] h-[25px]" />
            Inspección
          </MenuAsideItem>
        </ul>

        <Separator />

        <ul className="menu bg-base-200 rounded-box w-full">
          <MenuAsideItem href="/dashboard/inspection-configuration">
            <GrConfigure className="w-[25px] h-[25px]" />
            Configuración de la Inspección
          </MenuAsideItem>

          <MenuAsideItem href="/dashboard/client">
            <RiUserSearchLine className="w-[25px] h-[25px]" />
            Cliente
          </MenuAsideItem>

          <MenuAsideItem href="/dashboard/service">
            <MdOutlineHomeRepairService className="w-[25px] h-[25px]" />
            Servicio
          </MenuAsideItem>

          <MenuAsideItem href="/dashboard/group">
            <FaLayerGroup className="w-[25px] h-[25px]" />
            Group
          </MenuAsideItem>

          <MenuAsideItem href="/dashboard/user">
            <FiUser className="w-[25px] h-[25px]" />
            Usuario
          </MenuAsideItem>
        </ul>

        <Separator />

        <ul className="menu bg-base-200 rounded-box w-full">
          <MenuAsideItem href="/dashboard/settings">
            <GrConfigure className="w-[25px] h-[25px]" />
            Configuración
          </MenuAsideItem>
        </ul>
      </div>

      <div className="signout py-5">
        <ul className="menu w-full">
          <li>
            <Link href="/" className="text-white">
              <PiSignOutLight className="w-[25px] h-[25px]" />
              Cerrar sesión
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MenuAside;
