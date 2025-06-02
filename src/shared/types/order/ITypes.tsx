export interface TableListProps {
  objFilter: {
    client: string;
    status: string;
    workorder: number;
    worker: string;
    creationdate: Date | undefined;
  };
}
