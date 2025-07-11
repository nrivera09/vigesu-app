export interface TableListProps {
  objFilter: {
    client: string;
    status: string;
    name: string;
  };
  refreshFlag?: boolean;

  setRefreshFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ExportedAnswer {
  response: string;
  color: string;
  usingItem: boolean;
  isPrintable: boolean;
  subTypeInspectionDetailAnswers: ExportedAnswer[];
}

export interface ExportedQuestion {
  typeInspectionDetailId?: number;
  templateInspectionQuestionId: number;
  question: string;
  typeQuestion: number;
  groupId: number;
  status: number;
  typeInspectionDetailAnswers: ExportedAnswer[];
}
