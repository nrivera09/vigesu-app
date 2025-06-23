export interface WorkOrder {
  workOrderId: number;
  workOrderNumber: string;
  customerName: string;
  employeeName: string;
  statusWorkOrder: WorkOrderStatus;
  created: string;
}

export interface WorkOrderResponse {
  items: WorkOrder[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export enum WorkOrderStatus {
  Create = 0,
  Disabled = 1,
  SyncQuickbook = 2,
}

export const WorkOrderStatusLabel: Record<WorkOrderStatus, string> = {
  [WorkOrderStatus.Create]: "Create",
  [WorkOrderStatus.Disabled]: "Disabled",
  [WorkOrderStatus.SyncQuickbook]: "Sync Quickbook",
};
