export interface IInspectionItem {
  inspectionId: number;
  inspectionNumber: string;
  customerName: string;
  employeeName: string;
  dateOfInspection: string;
  status?: number | null;
  statusInspection?: number | null;
}
