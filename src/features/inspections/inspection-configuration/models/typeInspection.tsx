// src/features/inspections/inspection-configuration/models/typeInspection.types.ts
export interface ITypeInspectionItem {
  typeInspectionId: number;
  templateInspectionId: number;
  customerId: string;
  name: string;
  description: string;
  status: number;
}

export interface GetTypeInspectionParams {
  Name?: string;
  PageNumber?: number;
  PageSize?: number;
}

export interface GetTypeInspectionResponse {
  items: ITypeInspectionItem[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export enum InspectionStatus {
  Active = 0,
  Inactive = 1,
}

export const InspectionStatusLabel: Record<InspectionStatus, string> = {
  [InspectionStatus.Active]: "Active",
  [InspectionStatus.Inactive]: "Inactive",
};
