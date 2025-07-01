export interface CustomerOption {
  id: string;
  name: string;
}

export interface TypeInspectionOption {
  typeInspectionId: number;
  templateInspectionId: number;
  customerId: string;
  name: string;
  description: string;
  status: number;
}
