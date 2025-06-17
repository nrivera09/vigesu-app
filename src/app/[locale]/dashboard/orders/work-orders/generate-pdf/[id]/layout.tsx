"use client";
import LanguageSwitcher from "@/features/locale/LanguageSwitcher";
import Breadcrumb from "@/shared/components/shared/Breadcrumb";
import MenuAside from "@/shared/components/shared/MenuAside";
import { stripLocalePage } from "@/shared/lib/utils";
import { useSidebarStore } from "@/shared/stores/useSidebarStore";
import { usePathname } from "next/navigation";
import { BiSupport } from "react-icons/bi";
import { FaRegBell } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
