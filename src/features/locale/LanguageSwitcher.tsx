"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { IoLanguageOutline } from "react-icons/io5";

interface LanguageSwitcherProps {
  design?: string;
}

export default function LanguageSwitcher({
  design = "aside",
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale(); // 'en' o 'es'

  const handleChange = (nextLocale: string) => {
    if (nextLocale !== locale) {
      router.push(pathname, { locale: nextLocale });
    }
  };

  return design === "aside" ? (
    <div className="dropdown dropdown-end ">
      <label
        tabIndex={0}
        className="btn btn-square btn-neutral bg-[#ffffff1f] border-none shadow-none text-white"
      >
        {locale.toUpperCase()}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-[#ffffff1f] rounded-box w-32 text-white"
      >
        <li>
          <button
            onClick={() => handleChange("en")}
            className={`hover:bg-white/20 ${
              locale === "en" ? "font-bold" : ""
            }`}
          >
            EN
          </button>
        </li>
        <li>
          <button
            onClick={() => handleChange("es")}
            className={`hover:bg-white/20 ${
              locale === "es" ? "font-bold" : ""
            }`}
          >
            ES
          </button>
        </li>
      </ul>
    </div>
  ) : (
    <div className="dropdown dropdown-bottom bg-[#3f51b5] rounded-full   sm:flex items-center justify-center border-none gap-2 flex flex-row px-3 h-[39px]">
      <IoLanguageOutline className="text-2xl text-white hidden md:block" />

      <label
        tabIndex={0}
        className="bg-[#23328b] py-1 px-4 text-white font-normal rounded-full  text-[13px]  cursor-pointer"
      >
        {locale.toUpperCase()}
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-[#3f51b5]  rounded-box w-32 text-white cursor-pointer"
      >
        <li>
          <button
            onClick={() => handleChange("en")}
            className={`hover:bg-white/20 ${
              locale === "en" ? "font-medium" : ""
            }`}
          >
            EN
          </button>
        </li>
        <li>
          <button
            onClick={() => handleChange("es")}
            className={`hover:bg-white/20 ${
              locale === "es" ? "font-medium" : ""
            }`}
          >
            ES
          </button>
        </li>
      </ul>
    </div>
  );
}
