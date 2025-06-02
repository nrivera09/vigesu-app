"use client";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface BackButtonProps {
  title?: string;
}

const BackButton: FC<BackButtonProps> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle = usePageTitle();
  const [parentPath, setParentPath] = useState<string | null>(null);

  useEffect(() => {
    // Cortar la URL un nivel hacia atrás
    const segments = pathname.split("/").filter(Boolean); // elimina strings vacíos
    const dashboardIndex = segments.findIndex((s) => s === "dashboard");

    if (dashboardIndex === -1 || segments.length <= dashboardIndex + 1) {
      setParentPath(null); // Ya estás en /dashboard o antes
    } else {
      const newPath = "/" + segments.slice(0, segments.length - 1).join("/");
      setParentPath(newPath);
    }
  }, [pathname]);

  const handleBack = () => {
    if (parentPath) {
      router.push(parentPath);
    }
  };

  if (!parentPath) return null;

  return (
    <div className="flex flex-row gap-4 items-center">
      <button onClick={handleBack} className="btn btn-sm">
        ←
      </button>
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
        {title || pageTitle}
      </h1>
    </div>
  );
};

export default BackButton;
