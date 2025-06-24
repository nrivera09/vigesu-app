// 📁 src/features/inspections/inspection-configuration/api/typeInspectionApi.ts

import { axiosInstance } from "@/shared/utils/axiosInstance";

export interface GetTypeInspectionParams {
  Name?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface TypeInspectionItem {
  typeInspectionID: number;
  templateInspectionID: number;
  customerID: string;
  name: string;
  description: string;
  status: number;
}

export interface TypeInspectionResponse {
  items: TypeInspectionItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export const getTypeInspections = async (
  filters: GetTypeInspectionParams
): Promise<TypeInspectionResponse> => {
  const response = await axiosInstance.get<TypeInspectionResponse>(
    "/TypeInspection",
    {
      params: filters,
    }
  );

  return response.data;
};
