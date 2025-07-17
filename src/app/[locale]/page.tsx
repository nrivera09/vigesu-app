"use client";

import FormGroup from "@/shared/components/shared/FormGroup";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { useAuthStore } from "@/shared/stores/useAuthStore";

import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { toast } from "sonner";

const loginSchema = z.object({
  userName: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

const schema = loginSchema;

type LoginData = z.infer<typeof schema>;

export default function Home() {
  const router = useRouter();
  const t = useTranslations("home");
  const setAuth = useAuthStore((state) => state.setAuth);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginData) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await axiosInstance.post("/Auth/login", data);

      if (res.data?.token && res.data?.user) {
        // ✅ Guarda el token en cookies
        setCookie("auth-token", res.data.token, { path: "/" });

        // ✅ Guarda en Zustand
        setAuth({
          token: res.data.token,
          user: res.data.user,
        });

        toast.success("¡Login correcto!");
        router.push("/dashboard");
      } else {
        toast.error("Respuesta inválida del servidor");
      }
    } catch (err: unknown) {
      const error = err as {
        response?: {
          data?: {
            errors?: { key: string; value: string[] }[];
          };
        };
      };

      const backendErrors = error?.response?.data?.errors;
      if (Array.isArray(backendErrors) && backendErrors.length) {
        toast.error(backendErrors[0].value?.join(", "));
      } else {
        toast.error("Error desconocido al iniciar sesión");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-dvh w-full flex sm:flex-col md:flex-row flex-col items-center justify-center">
      <div className="login-form h-full flex flex-col items-center justify-center w-full md:w-[50%] py-5 fixed md:relative ">
        <div className="w-full h-[30px] flex items-center justify-center">
          <div className="container flex flex-row items-center justify-between">
            <p className="uppercase font-bold text-[20px]">visegu</p>
          </div>
        </div>
        <div className="flex flex-1 p-[15px] md:p-0 items-center justify-center w-full max-w-[500px] md:max-w-[500px]">
          <div className="container flex flex-col gap-4 !p-5 md:p-0 bg-transparent rounded-md md:bg-transparent max-w-full">
            <div>
              <div className="flex flex-row justify-between">
                <h1 className="uppercase font-bold text-left text-[30px]">
                  {t("form-title")}
                </h1>
              </div>
              <p className="text-gray-400">{t("form-info")}</p>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            <form
              className="flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormGroup>
                <label>Email</label>
                <input
                  type="text"
                  placeholder=""
                  className="input input-lg text-lg w-full"
                  {...register("userName")}
                />
                {errors.userName && (
                  <span className="text-red-500 text-sm">
                    {errors.userName.message}
                  </span>
                )}
              </FormGroup>

              <FormGroup>
                <label>Password</label>
                <input
                  type="password"
                  placeholder=""
                  className="input input-lg text-lg w-full"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </FormGroup>

              <div className="flex flex-row items-center justify-between gap-2">
                <label className="label w-full flex items-center gap-2">
                  <input type="checkbox" className="checkbox" />
                  Remember me
                </label>
                <Link href="#" className="underline min-w-fit">
                  ¿Olvidaste tu clave?
                </Link>
              </div>

              <FormGroup>
                <button
                  type="submit"
                  disabled={loading}
                  className="shadow-md btn btn-neutral btn-block min-h-[41px] text-[13px]"
                >
                  {loading && <span className="loading loading-spinner"></span>}
                  Acceder
                </button>
              </FormGroup>
            </form>

            <div className="text-center mt-4 flex items-center justify-center text-gray-400 font-light">
              <Link href="#" className="underline">
                ¿Tiene problemas para acceder?
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="login-promo h-full w-full md:w-[50%] bg-cover bg-center hidden md:flex"
        style={{ backgroundImage: 'url("/assets/img/bg.jpg")' }}
      />
    </main>
  );
}
