export interface TableListProps {
  objFilter: {
    client: string;
    status: string;
    workorder: string;
    worker: string;
    creationdate: Date | undefined;
  };

  refreshSignal?: boolean;
}
