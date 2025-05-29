"use client";

import { SlDocs } from "react-icons/sl";
import MenuAsideItem from "./MenuAsideItem";
import { VscInspect } from "react-icons/vsc";
import { TfiRulerPencil } from "react-icons/tfi";
import { LuUsers } from "react-icons/lu";
import { GrDocumentConfig } from "react-icons/gr";
import { IoLayersOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

const MenuAside = () => {
  return (
    <aside
      className="w-[300px] h-full fixed bg-[#2a3042] hidden sm:hidden md:hidden lg:flex xl:flex justify-start items-center flex-col z-10 overflow-hidden "
      style={{ boxShadow: "0 .75rem 1.5rem #12263f08" }}
    >
      <div className="logo min-h-[100px] items-center justify-center w-full flex">
        <p className="font-bold text-[20px] text-white">VIGESU</p>
      </div>
      <nav className="w-full px-2">
        <button className="btn w-full size-15 rounded-sm mb-2 gap-3 flex flex-row items-center justify-start">
          <SlDocs className="size-6" />
          Ordenes de trabajo
        </button>
        <button className="btn w-full size-15 rounded-sm mb-2 gap-3 flex flex-row items-center justify-start">
          <VscInspect className="size-6" />
          Inspección
        </button>
        <button className="btn w-full size-15 rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            className="size-[1.2em]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
          Like
        </button>
      </nav>
      <nav className="overflow-y-auto w-full flex-1 max-w-full overflow-x-hidden !hidden">
        <MenuAsideItem
          sectionTitle="Órdenes"
          buttonLabel="Órdenes de trabajo"
          icon={<SlDocs />}
          openMenu={true}
          subItems={[
            { label: "Todas las órdenes", href: "/dashboard/ordenes" },
            { label: "Agregar nueva orden", href: "/dashboard/ordenes/nueva" },
          ]}
        />
        <MenuAsideItem
          buttonLabel="Inspecciones"
          icon={<VscInspect />}
          openMenu={false}
          subItems={[
            { label: "Todas las inspecciones", href: "/dashboard/ordenes" },
            {
              label: "Agregar nueva inspección",
              href: "/dashboard/ordenes/nueva",
            },
          ]}
        />
        <MenuAsideItem
          buttonLabel="Formatos"
          icon={<TfiRulerPencil />}
          openMenu={false}
          subItems={[
            { label: "Todas los formatos", href: "/dashboard/ordenes" },
            {
              label: "Agregar nuevo formato",
              href: "/dashboard/ordenes/nueva",
            },
          ]}
        />
        <MenuAsideItem
          className={"mt-10"}
          sectionTitle="Inspecciones"
          buttonLabel="Órdenes de trabajo"
          icon={<SlDocs />}
          openMenu={false}
          subItems={[
            {
              label: "Configuración de la inspeccion",
              href: "/dashboard/ordenes",
            },
            { label: "Agregar nueva orden", href: "/dashboard/ordenes/nueva" },
          ]}
        />
        <MenuAsideItem
          buttonLabel="Clientes"
          icon={<LuUsers />}
          openMenu={false}
          subItems={[
            {
              label: "Configuración de la inspeccion",
              href: "/dashboard/ordenes",
            },
            { label: "Agregar nueva orden", href: "/dashboard/ordenes/nueva" },
          ]}
        />
        <MenuAsideItem
          buttonLabel="Servicios"
          icon={<GrDocumentConfig />}
          openMenu={false}
          subItems={[
            {
              label: "Configuración de la inspeccion",
              href: "/dashboard/ordenes",
            },
            { label: "Agregar nueva orden", href: "/dashboard/ordenes/nueva" },
          ]}
        />
        <MenuAsideItem
          buttonLabel="Grupos"
          icon={<IoLayersOutline />}
          openMenu={false}
          subItems={[
            {
              label: "Configuración de la inspeccion",
              href: "/dashboard/ordenes",
            },
            { label: "Agregar nueva orden", href: "/dashboard/ordenes/nueva" },
          ]}
        />
        <MenuAsideItem
          buttonLabel="Usuarios"
          icon={<SlDocs />}
          openMenu={false}
          subItems={[
            {
              label: "Configuración de la inspeccion",
              href: "/dashboard/ordenes",
            },
            { label: "Agregar nueva orden", href: "/dashboard/ordenes/nueva" },
          ]}
        />
        <MenuAsideItem
          className="mt-10"
          sectionTitle="Configuración"
          buttonLabel="Configuración"
          icon={<VscInspect />}
          openMenu={false}
          subItems={[
            { label: "Todas las inspecciones", href: "/dashboard/ordenes" },
            {
              label: "Agregar nueva inspección",
              href: "/dashboard/ordenes/nueva",
            },
          ]}
        />
      </nav>
      <div className="min-h-[50px] flex items-center justify-start w-full !hidden">
        <MenuAsideItem
          buttonLabel="Cerrar sesion"
          icon={<IoIosLogOut />}
          openMenu={false}
        />
      </div>
    </aside>
  );
};

export default MenuAside;
