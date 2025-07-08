export interface IFullTypeInspection {
  typeInspectionId: number;
  name: string;
  description: string;
  customerId: string;
  templateName: string;
  templateFilePath: string;
  questions: IFullQuestion[];
  statusInspectionConfig?: false;
}

export interface IFullQuestion {
  templateInspectionQuestionId: number;
  question: string;
  typeQuestion: number;
  triggersPrefillSearch: boolean;
  allowAutoPrefill: boolean;
  status: number;
  groupId: number;
  groupName: string;
  typeInspectionDetailId: number;
  answers: IFullAnswer[];
  statusInspectionConfig?: false;
}

export interface IFullAnswer {
  typeInspectionDetailAnswerId: number;
  response: string;
  color: string;
  isPrintable: boolean;
  usingItem: boolean;
  subAnswers: IFullAnswer[];
  selectedItems?: {
    id: string;
    name: string;
    unitPrice: number;
    quantity: number;
  }[];
  parentRootId?: string; // ✅ Agrega esta línea
}
