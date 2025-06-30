"use client";
import { usePageTitle } from "@/shared/hooks/usePageTitle";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";

interface BackButtonProps {
  title?: string;
  disableArrow?: boolean;
}

const BackButton: FC<BackButtonProps> = ({ title, disableArrow = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle = usePageTitle();
  const [parentPath, setParentPath] = useState<string | null>(null);

  useEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const dashboardIndex = segments.findIndex((s) => s === "dashboard");

    if (dashboardIndex === -1 || segments.length <= dashboardIndex + 1) {
      setParentPath(null);
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

  return (
    <div className="flex flex-row gap-4 items-center">
      <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
        {!disableArrow && (
          <button onClick={handleBack} className="btn btn-sm">
            ←
          </button>
        )}
        {title ||
          (pageTitle ? (
            pageTitle
          ) : (
            <div className="skeleton h-6 w-48 rounded"></div>
          ))}
      </h1>
    </div>
  );
};

export default BackButton;
