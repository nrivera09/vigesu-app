"use client";

import { useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/stores/useAuthStore";
import { isTokenExpired } from "@/shared/utils/tokenHelpers";

export const useSessionValidator = () => {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("auth-token");
    if (typeof token === "string" && isTokenExpired(token)) {
      deleteCookie("auth-token");
      useAuthStore.getState().logout();
      router.push("/");
    }
  }, []);
};
