// src/features/orders/api/workOrdersApi.ts

import { axiosInstance } from "@/shared/utils/axiosInstance";
import { WorkOrderResponse } from "../models/workOrder.types";

export const getWorkOrders = async (): Promise<WorkOrderResponse> => {
  const response = await axiosInstance.get<WorkOrderResponse>("/WorkOrder");
  return response.data;
};
