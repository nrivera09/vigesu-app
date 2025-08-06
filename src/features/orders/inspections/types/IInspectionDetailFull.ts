export interface IInspectionDetailAnswerItem {
  inspectionDetailAnswerItemId: number;
  itemId: string;
  itemName: string;
  quantity: number;
  price: number;
}

export interface IInspectionDetailAnswer {
  inspectionDetailAnswerId: number;
  typeInspectionDetailAnswerId: number;
  response: string;
  items: IInspectionDetailAnswerItem[];
}

export interface IInspectionDetail {
  inspectionDetailId: number;
  typeInspectionDetailId: number;
  typeInspectionDetailAnswerId: number;
  finalResponse: string;
  inspectionDetailAnswers: IInspectionDetailAnswer[];
  templateInspectionQuestionId?: number;
}

export interface IInspectionPhoto {
  inspectionPhotoId: number;
  photoUrl: string;
}

export interface IInspectionItemFull {
  inspectionId: number;
  inspectionNumber: string;
  typeInspectionId: number;
  customerId: string;
  employeeId: string;
  customerName: string;
  employeeName: string;
  dateOfInspection: string;
  inspectionDetails: IInspectionDetail[];
  inspectionPhotos: IInspectionPhoto[];
}
