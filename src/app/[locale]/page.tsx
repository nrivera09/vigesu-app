"use client";
import { ThemeSwitcher } from "@/features/theme/ThemeSwitcher";
import FormGroup from "@/shared/components/FormGroup";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
export default function Home() {
  const router = useRouter();
  const t = useTranslations("home");
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };
  return (
    <main className="h-dvh w-full flex sm:flex-col md:flex-row flex-col items-center justify-center">
      <div className="login-form h-full flex flex-col items-center justify-center w-full md:w-[50%] py-5 fixed md:relative ">
        <div className="w-full h-[30px]  flex items-center justify-center">
          <div className="container flex flex-row items-center justify-between">
            <p className="uppercase font-bold text-[20px]">VIGESU</p>

            {/**<ThemeSwitcher /> */}
          </div>
        </div>
        <div className="flex flex-1 p-[15px] md:p-0 items-center justify-center w-full max-w-[500px] md:max-w-[500px]">
          <div className="container flex flex-col gap-4 !p-5 md:p-0 bg-transparent  rounded-md md:bg-transparent  max-w-full">
            <div>
              <div className="flex flex-row justify-between">
                <h1 className="uppercase font-bold text-left text-[30px] w">
                  {t("form-title")}
                </h1>
              </div>
              <p className="text-gray-400 ">{t("form-info")}</p>
            </div>
            <div>
              <form className="flex flex-col gap-6">
                <FormGroup>
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input w-full"
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="">Password</label>
                  <input
                    type="password"
                    placeholder="Type here"
                    className="input w-full"
                  />
                </FormGroup>
                <div className="flex flex-row items-center justify-between gap-2">
                  <div className="flex-1 flex items-center justify-center ">
                    <label className="label w-full">
                      <input type="checkbox" className="checkbox" />
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link href={`#`} className="underline">
                      ¿Olvidaste tu clave?
                    </Link>
                  </div>
                </div>
                <FormGroup>
                  <button
                    type="button"
                    disabled={loading}
                    className="shadow-md btn btn-neutral btn-block "
                    onClick={handleLogin}
                  >
                    {loading && (
                      <span className="loading loading-spinner"></span>
                    )}
                    Acceder
                  </button>
                </FormGroup>
              </form>
            </div>
            <div className="text-center mt-4 flex items-center justify-center text-gray-400 font-light">
              <Link href="#" className="underline">
                ¿Tiene problemas para acceder?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="login-promo h-full  w-full md:w-[50%] bg-cover bg-center hidden md:flex"
        style={{ backgroundImage: 'url("/assets/img/bg.jpg")' }}
      ></div>
    </main>
  );
}
