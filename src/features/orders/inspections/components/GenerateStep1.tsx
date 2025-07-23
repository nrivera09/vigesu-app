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
  IFullAnswer,
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
import { FaCheckCircle } from "react-icons/fa";
import clsx from "clsx";
import { BsQuestionCircle } from "react-icons/bs";
import { toast } from "sonner";

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
      const store = useInspectionFullStore.getState();
      const previous = store.fullInspection;

      const res = await axiosInstance.get<IFullTypeInspection>(
        `/TypeInspection/GetFullTypeInspectionId?TypeInspectionId=${typeInspectionId}`
      );

      // fusiona respuestas anteriores si existen
      const mergedQuestions = res.data.questions.map((q) => {
        const prev = previous?.questions.find(
          (pq) => pq.typeInspectionDetailId === q.typeInspectionDetailId
        );
        return {
          ...q,
          answers: prev?.answers ?? q.answers,
          finalResponse: prev?.finalResponse ?? "",
          statusInspectionConfig: prev?.statusInspectionConfig ?? false,
        };
      });

      store.setFullInspection({
        ...res.data,
        questions: mergedQuestions,
      });

      useInspectionFullStore.getState().setGroupName(groupName);
      useInspectionFullStore.getState().setGroupId(groupId);
      /* const grouped = res.data.questions.reduce((acc, question) => {
          if (!acc[question.groupName]) acc[question.groupName] = [];
          acc[question.groupName].push(question);
          return acc;
        }, {} as Record<string, IFullQuestion[]>);*/
      setCompleteStep1(false);
      setStepWizard(2);
    } catch (err) {
      console.error("Error al obtener datos completos de inspección", err);
    }
  };

  const extractAnswerRecursiveArray = (
    answers: IFullAnswer[]
  ): IFullAnswer[] => {
    return answers.flatMap((answer) => [
      {
        ...answer,
      },
      ...(answer.subAnswers
        ? extractAnswerRecursiveArray(answer.subAnswers)
        : []),
    ]);
  };

  const handleFinalSubmit = async () => {
    if (!fullInspection) return;

    /* const payload = {
      typeInspectionId: fullInspection.typeInspectionId,
      customerId: fullInspection.customerId,
      employeeId: "empleado-123", 
      customerName: "Cliente Prueba", 
      employeeName: "Empleado QA", 
      dateOfInspection: new Date().toISOString(),
      inspectionDetails: fullInspection.questions.map((q) => ({
        typeInspectionDetailId: q.typeInspectionDetailId,
        typeInspectionDetailAnswerId:
          q.answers[0]?.typeInspectionDetailAnswerId ?? 0,
        finalResponse: q.finalResponse ?? "",
        inspectionDetailAnswers: q.answers.map((a) => ({
          typeInspectionDetailAnswerId: a.typeInspectionDetailAnswerId,
          finalResponse: a.response,
          inspectionDetailAnswerItem: (a.selectedItems ?? []).map((item) => ({
            itemId: item.id,
            itemName: item.name,
            quantity: item.quantity,
            price: item.unitPrice,
          })),
        })),
      })),
      inspectionPhotos: [],
    };*/

    const payload = {
      typeInspectionId: fullInspection.typeInspectionId,
      customerId: fullInspection.customerId,
      employeeId: "empleado-123",
      customerName: "Cliente Prueba",
      employeeName: "Empleado QA",
      dateOfInspection: new Date().toISOString(),
      inspectionDetails: fullInspection.questions.map((q) => {
        // 🔎 Obtenemos todas las respuestas recursivas
        const flatAnswers = extractAnswerRecursiveArray(q.answers ?? []);

        return {
          typeInspectionDetailId: q.typeInspectionDetailId,
          typeInspectionDetailAnswerId:
            flatAnswers[0]?.typeInspectionDetailAnswerId ?? 0,
          finalResponse: q.finalResponse ?? "",
          inspectionDetailAnswers: flatAnswers.map((a) => ({
            typeInspectionDetailAnswerId: a.typeInspectionDetailAnswerId,
            finalResponse: a.response,
            inspectionDetailAnswerItem: (a.selectedItems ?? []).map((item) => ({
              itemId: item.id,
              itemName: item.name,
              quantity: item.quantity,
              price: item.unitPrice,
            })),
          })),
        };
      }),
      inspectionPhotos: [],
    };

    console.log("📤 Enviando payload a API:", payload);

    /*try {
      const response = await axiosInstance.post("/Inspection", payload);

      toast.success("Inspección enviada correctamente");

      useInspectionFullStore.getState().resetFullInspection();

      router.push("./");
    } catch (error) {
      toast.error("❌ Error al enviar inspección");
      console.error(error);
    }*/
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
                    className={clsx(
                      `w-full flex flex-row card lg:card-side  shadow-sm overflow-hidden cursor-pointer transition-all hover:shadow-lg mb-5  text-white `,
                      questions.every((q) => q.statusInspectionConfig)
                        ? `bg-green-800/80 hover:bg-green-800 hover:text-white/80`
                        : `bg-black/80 hover:bg-[#191917] hover:text-white/80`
                    )}
                    key={groupName}
                  >
                    <div
                      className={clsx(
                        ` w-fit flex items-center justify-center p-2`,
                        questions.every((q) => q.statusInspectionConfig)
                          ? `bg-green-800`
                          : `bg-[#191917]`
                      )}
                    >
                      {questions.every((q) => q.statusInspectionConfig) ? (
                        <FaCheckCircle className="w-[20px] h-[20px]  text-green-400 mx-auto" />
                      ) : (
                        <BsQuestionCircle className="w-[20px] h-[20px]  text-white mx-auto" />
                      )}
                    </div>
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
      <div className="text-center mt-9">
        <button
          className="btn font-normal bg-black text-white rounded-full pr-3 py-6 sm:flex border-none flex-1 w-full md:w-[300px] mx-auto text-[13px]"
          disabled={
            !fullInspection?.questions.every((q) => q.statusInspectionConfig)
          }
          onClick={() => handleFinalSubmit()}
        >
          Complete and save inspection
        </button>
      </div>
    </>
  );
};

export default GenerateStep1;
