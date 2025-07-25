import { axiosInstance } from "@/shared/utils/axiosInstance";
import { IInspectionItem } from "../models/inspection.types";

export interface GetInspectionsResponse {
  items: IInspectionItem[];
  totalCount: number;
  pageNumber: number;
  totalPages: number;
}

export const getInspections = async ({
  PageNumber,
  PageSize,
  Name,
}: {
  PageNumber: number;
  PageSize: number;
  Name?: string;
}): Promise<GetInspectionsResponse> => {
  const { data } = await axiosInstance.get("/Inspection", {
    params: { PageNumber, PageSize, Name },
  });

  return {
    items: data.items ?? [],
    totalCount: data.totalCount ?? 0,
    pageNumber: data.pageNumber ?? 1,
    totalPages: data.totalPages ?? 1,
  };
};

export interface TemplateInspection {
  templateInspectionId: number;
  name: string;
  filePath: string;
}

export interface TemplateInspectionResponse {
  items: TemplateInspection[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
}

export const getTemplateInspections = async (
  page: number,
  name: string
): Promise<TemplateInspectionResponse> => {
  const res = await axiosInstance.get("/TemplateInspection", {
    params: {
      PageNumber: page,
      Name: name,
    },
  });
  return res.data;
};
