"use client";
import React, { FC, useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/shared/utils/axiosInstance";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineSettingsBackupRestore } from "react-icons/md";
import {
  CustomerOption,
  TypeInspectionOption,
} from "@/features/orders/inspections/types/IInspectionSelect";
import { debounce } from "lodash";
import {
  IFullQuestion,
  IFullTypeInspection,
} from "../types/IFullTypeInspection";
import Loading from "@/shared/components/shared/Loading";
import { GiAutoRepair } from "react-icons/gi";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useInspectionFullStore } from "../../store/inspection/inspectionFullStore";
import { group } from "console";
import Wizard from "./Wizard";
import Lottie from "lottie-react";

import checkLottie from "@/assets/lotties/check.json";

const GenerateStep1 = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    groupedQuestions,
    fullInspection,
    setStepWizard,
    setCompleteStep1,
    setGroupedQuestions,
  } = useInspectionFullStore();

  const goStep = async (
    typeInspectionId: number,
    groupName: string,
    groupId: number
  ) => {
    try {
      const res = await axiosInstance.get<IFullTypeInspection>(
        `/TypeInspection/GetFullTypeInspectionId?TypeInspectionId=${typeInspectionId}`
      );
      useInspectionFullStore.getState().setFullInspection(res.data);
      useInspectionFullStore.getState().setGroupName(groupName);
      useInspectionFullStore.getState().setGroupId(groupId);
      /* const grouped = res.data.questions.reduce((acc, question) => {
          if (!acc[question.groupName]) acc[question.groupName] = [];
          acc[question.groupName].push(question);
          return acc;
        }, {} as Record<string, IFullQuestion[]>);*/
      setCompleteStep1(true);
      setStepWizard(2);
    } catch (err) {
      console.error("Error al obtener datos completos de inspección", err);
    }
  };

  return (
    <>
      <Wizard />
      <div className="">
        {!groupedQuestions ? (
          <Loading height="h-[300px]" label="Esperando configuración ..." />
        ) : (
          <div className="cont my-5 flex flex-col gap-4">
            {fullInspection &&
              Object.entries(
                fullInspection.questions.reduce((acc, question) => {
                  if (!acc[question.groupName]) acc[question.groupName] = [];
                  acc[question.groupName].push(question);
                  return acc;
                }, {} as Record<string, IFullQuestion[]>)
              ).map(([groupName, questions]) => {
                const groupId = questions[0]?.groupId;
                return (
                  <button
                    onClick={() =>
                      goStep(
                        fullInspection.typeInspectionId,
                        groupName,
                        groupId
                      )
                    }
                    className="w-full card lg:card-side bg-black/80 shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg  hover:bg-[#191917] text-white hover:text-white/80 flex flex-row"
                    key={groupName}
                  >
                    {fullInspection.statusInspectionConfig ? (
                      <div className="bg-[#191917] w-fit flex items-center justify-center p-2">
                        <Lottie
                          animationData={checkLottie}
                          style={{ width: 35, height: 35 }}
                          loop={false}
                        />
                      </div>
                    ) : (
                      <div className="bg-[#191917] w-fit flex items-center justify-center p-2">
                        <GiAutoRepair className="w-[25px] h-[25px]  text-white" />
                      </div>
                    )}
                    <div className="card-body flex flex-row justify-between gap-5">
                      <div className="flex flex-col items-start">
                        <h2 className="card-title text-left">{groupName} </h2>
                        <p className="text-lg text-left">
                          {fullInspection.description}
                        </p>
                      </div>
                      <div className="card-actions justify-end flex items-center ">
                        {questions.filter((item) => item.status === 0).length >
                          0 && (
                          <span className="badge badge-error text-white text-lg">
                            {
                              questions.filter((item) => item.status === 0)
                                .length
                            }
                          </span>
                        )}
                        {questions.filter((item) => item.status === 1).length >
                          0 && (
                          <span className="badge badge-success text-white text-lg">
                            {
                              questions.filter((item) => item.status === 1)
                                .length
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </>
  );
};

export default GenerateStep1;
