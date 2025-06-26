export interface TableListProps {
  objFilter: {
    client: string;
    status: string;
    name: string;
  };
}

export interface ExportedAnswer {
  response: string;
  color: string;
  usingItem: boolean;
  isPrintable: boolean;
  subTypeInspectionDetailAnswers: ExportedAnswer[];
}

export interface ExportedQuestion {
  templateInspectionQuestionId: number;
  question: string;
  typeQuestion: number;
  groupId: number;
  status: number;
  typeInspectionDetailAnswers: ExportedAnswer[];
}
