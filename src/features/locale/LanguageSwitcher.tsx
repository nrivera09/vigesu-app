"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = event.target.value;
    router.push(pathname, { locale: nextLocale });
  };

  return (
    <select
      value={locale}
      onChange={handleChange}
      className="select select-bordered w-full max-w-xs"
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
