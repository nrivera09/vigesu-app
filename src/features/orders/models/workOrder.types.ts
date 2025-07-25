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

export enum TypeQuestion {
  SingleChoice = 0, // Selección única como estamos trabajando
  MultipleChoice = 1, // Selección múltiple pero de la misma respuesta raiz, pero solo de la misma raiz, osea raiz uno y puede seleccionar sub 1 y sub2 y asi sucesivamente, PERO de la misma respuesta raiz
  TextInput = 2, // Texto libre, aqui no selecciona NADA solo ingresa su respuesta libremente
  Sign = 3,
}

export const TypeQuestionLabel: Record<TypeQuestion, string> = {
  [TypeQuestion.SingleChoice]: "Single Choice",
  [TypeQuestion.MultipleChoice]: "Multiple Choice",
  [TypeQuestion.TextInput]: "Text Input",
  [TypeQuestion.Sign]: "by Sign",
};

export enum TypeInspectionOrders {
  Create = 0, // Selección única como estamos trabajando
  PreAccepted = 1, // Selección múltiple pero de la misma respuesta raiz, pero solo de la misma raiz, osea raiz uno y puede seleccionar sub 1 y sub2 y asi sucesivamente, PERO de la misma respuesta raiz
  Accepted = 2, // Texto libre, aqui no selecciona NADA solo ingresa su respuesta libremente
  Disabled = 3,
  SyncQuickbook = 4,
}

export const TypeInspectionOrdersLabel: Record<TypeInspectionOrders, string> = {
  [TypeInspectionOrders.Create]: "Create",
  [TypeInspectionOrders.PreAccepted]: "Pre accepted",
  [TypeInspectionOrders.Accepted]: "Accepted",
  [TypeInspectionOrders.Disabled]: "Disabled",
  [TypeInspectionOrders.SyncQuickbook]: "Sync Quickbook",
};
